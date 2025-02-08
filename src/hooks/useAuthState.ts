
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { authService } from '@/services/auth';

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const checkAndUpdateSession = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        
        if (!mounted) return;

        if (!session) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        setIsAuthenticated(true);
        setUser(session.user);
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    // Initial check
    checkAndUpdateSession();

    // Set up interval to check session every minute
    intervalId = setInterval(checkAndUpdateSession, 60000);

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setIsAuthenticated(!!session);
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      clearInterval(intervalId);
      subscription.unsubscribe();
    };
  }, []);

  return { isAuthenticated, user };
};
