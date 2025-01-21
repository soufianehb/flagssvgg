import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';
import type { PersonalData, ProfessionalData } from '@/types/signup';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string, 
    password: string, 
    personalData: PersonalData,
    professionalData: ProfessionalData
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred during login. Please try again.",
          });
        }
        throw error;
      }

      if (data.user) {
        console.log('Login successful:', data.user.email);
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error caught:', error);
      // Don't show another toast here since we already showed one in the error handling above
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    personalData: PersonalData,
    professionalData: ProfessionalData
  ) => {
    try {
      // 1. Create auth user which will trigger profile creation via database trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: personalData.firstName,
            last_name: personalData.lastName,
          },
        },
      });

      if (authError) throw authError;

      // 2. Insert professional info
      const { error: professionalError } = await supabase
        .from('professional_info')
        .insert({
          user_id: authData.user?.id,
          address: professionalData.address,
          zip_code: professionalData.zipCode,
          city: professionalData.city,
          country: professionalData.country,
          company_name: professionalData.companyName,
          phone_number: professionalData.phoneNumber,
          business_phone: professionalData.businessPhone,
          phone_code: professionalData.phoneCode,
          business_phone_code: professionalData.businessPhoneCode,
        });

      if (professionalError) throw professionalError;

      toast({
        title: "Success",
        description: "Successfully signed up! Please check your email for verification.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
