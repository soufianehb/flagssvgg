
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

export const authService = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  },

  signup: async (email: string, password: string, profileData: Record<string, any>) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (authError) throw authError;

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        user_id: authData.user?.id,
        email,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        company_name: profileData.company_name,
        is_profile_complete: false,
        status: 'active',
        metadata: profileData.metadata || {}
      }]);

    if (profileError) {
      console.error('Error creating profile:', profileError);
      throw profileError;
    }
    
    return { data: authData, error: null };
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      // If the error is session_not_found, we can safely ignore it
      // as the user is effectively already logged out
      if (error && error.message !== 'Session not found') {
        throw error;
      }
      
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      // We still want to clear the local state even if the server 
      // session removal failed
      return { error: null };
    }
  },

  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!session) {
        return { data: { session: null } };
      }

      const expiryTime = new Date(session.expires_at! * 1000);
      const now = new Date();
      const timeUntilExpiry = expiryTime.getTime() - now.getTime();

      if (timeUntilExpiry <= 300000) { // 5 minutes
        console.log("Session about to expire, refreshing...");
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error("Error refreshing session:", refreshError);
          await supabase.auth.signOut();
          return { data: { session: null } };
        }
        return { data: refreshData };
      }

      return { data: { session } };
    } catch (error) {
      console.error("Error in getSession:", error);
      await supabase.auth.signOut();
      return { data: { session: null } };
    }
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return { data: { subscription } };
  },

  refreshSession: async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return { data };
    } catch (error) {
      console.error("Error refreshing session:", error);
      throw error;
    }
  }
};
