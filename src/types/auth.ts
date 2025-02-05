import type { User } from '@supabase/supabase-js';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string, 
    password: string, 
    metadata: Record<string, any>
  ) => Promise<void>;
  logout: () => Promise<void>;
}