
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '@/services/auth';
import { supabase } from '@/integrations/supabase/client';

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAndUpdateSession = async () => {
      const { data: { session } } = await authService.getSession();
      
      if (!session) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Check if session is expired
      const expiryTime = new Date(session.expires_at! * 1000);
      if (expiryTime < new Date()) {
        console.log("Session expired, updating state...");
        setIsAuthenticated(false);
        setUser(null);
        await supabase.auth.signOut();
        return;
      }

      setIsAuthenticated(true);
      setUser(session.user);
    };

    // Initial check
    checkAndUpdateSession();

    // Subscribe to auth changes
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

