
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth';
import type { AuthContextType } from '@/types/auth';
import { User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    authService.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await authService.login(email, password);
      setIsAuthenticated(!!data.session);
      setUser(data.session?.user ?? null);
      
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: error.message || "An error occurred during login.",
      });
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    metadata: Record<string, any>
  ) => {
    try {
      const { data } = await authService.signup(email, password, metadata);
      
      toast({
        title: "Signup Successful",
        description: "Account created successfully. Please check your email for verification.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup Error",
        description: error.message || "An error occurred during signup.",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      
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
