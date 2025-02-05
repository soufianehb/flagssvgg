
import type { User } from '@supabase/supabase-js';
import type { PersonalData, ProfessionalData } from '@/types/signup';

export interface AuthContextType {
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
