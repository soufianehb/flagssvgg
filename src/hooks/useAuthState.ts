
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '@/services/auth';

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = authService.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAuthenticated, user };
};
