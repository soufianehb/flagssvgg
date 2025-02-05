import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from '@/hooks/useAuthState';
import { authService } from '@/services/auth';
import type { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthState();
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email });
      
      const { data, error } = await authService.login(email, password);

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
            variant: "destructive",
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
    metadata: Record<string, any>
  ) => {
    try {
      const { data, error } = await authService.signup(email, password, metadata);

      if (error) throw error;

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
      const { error } = await authService.logout();
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