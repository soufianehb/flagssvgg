
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
    // First proceed with the signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (authError) throw authError;

    // Create the profile directly in the profiles table
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  },

  getSession: async () => {
    try {
      // First try to get the current session
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      // If no session exists, return null
      if (!session) {
        return { data: { session: null } };
      }

      // Check if session is expired or about to expire (within 60 seconds)
      const expiryTime = new Date(session.expires_at! * 1000);
      const now = new Date();
      const timeUntilExpiry = expiryTime.getTime() - now.getTime();

      if (timeUntilExpiry <= 60000) { // 60 seconds
        console.log("Session expired or about to expire, refreshing...");
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
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
    return {
      data: {
        subscription
      }
    };
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
