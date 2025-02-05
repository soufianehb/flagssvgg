
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
        
        if (error.message.includes('Email not confirmed')) {
          toast({
            variant: "destructive",
            title: "Email Not Verified",
            description: "Please check your email and click the verification link before logging in.",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid email or password. If you haven't registered yet, please sign up first.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Login Error",
            description: error.message || "An error occurred during login. Please try again.",
          });
        }
        throw error;
      }

      if (data.user) {
        console.log('Login successful:', data.user.email);
        
        if (!data.user.email_confirmed_at) {
          toast({
            variant: "warning",
            title: "Email Not Verified",
            description: "Please check your email and verify your account before logging in.",
          });
          return;
        }
        
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error caught:', error);
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: personalData.firstName,
            last_name: personalData.lastName,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (authError) throw authError;

      if (!authData.user?.id) {
        throw new Error('No user ID returned from signup');
      }

      // Insert professional info
      const { error: professionalError } = await supabase
        .from('professional_info')
        .insert({
          user_id: authData.user.id,
          address: professionalData.address,
          zip_code: professionalData.zipCode,
          city: professionalData.city,
          country: professionalData.country,
          company_name: professionalData.companyName,
          phone_number: professionalData.phoneNumber,
          business_phone: professionalData.businessPhone,
          phone_code: professionalData.phoneCode,
          business_phone_code: professionalData.businessPhoneCode,
          trade_register_number: professionalData.tradeRegisterNumber,
        });

      if (professionalError) throw professionalError;

      toast({
        title: "Signup Successful",
        description: "Please check your email to verify your account before logging in.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      if (error.message.includes('User already registered')) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: "This email is already registered. Please try logging in instead.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Signup Error",
          description: error.message || "An error occurred during signup. Please try again.",
        });
      }
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
        description: error.message || "An error occurred during logout.",
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
