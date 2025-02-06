import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import type { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      // Implement your own login logic here
      console.log('Login attempt:', { email });
      
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
      // Implement your own signup logic here
      console.log('Signup attempt:', { email, metadata });
      
      toast({
        title: "Signup Successful",
        description: "Account created successfully.",
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
      // Implement your own logout logic here
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
