
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
        data: {
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          company_name: profileData.company_name
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            user_id: authData.user.id,
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
          return { data: authData, error: null };
        }
      } catch (error) {
        console.error('Error in profile creation:', error);
      }
    }
    
    return { data: authData, error: null };
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.log('Logout error:', error);
        
        // If the error is session_not_found or JWT related, consider it a successful logout
        // since the session is already invalid/expired
        if (error.message === 'session_not_found' || 
            error.message.includes('JWT') || 
            error.message.includes('Session from session_id')) {
          console.log('Session already expired or invalid, considering logout successful');
          return { error: null };
        }
        throw error;
      }
      
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      // Still return success even if server logout fails, as we want to clear local state
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

      // Check if session is about to expire (within 5 minutes)
      const expiryTime = new Date(session.expires_at! * 1000);
      const now = new Date();
      const timeUntilExpiry = expiryTime.getTime() - now.getTime();

      if (timeUntilExpiry <= 300000) { // 5 minutes
        console.log("Session about to expire, refreshing...");
        try {
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) {
            console.error("Error refreshing session:", refreshError);
            await supabase.auth.signOut();
            return { data: { session: null } };
          }
          return { data: refreshData };
        } catch (refreshError) {
          console.error("Error in session refresh:", refreshError);
          await supabase.auth.signOut();
          return { data: { session: null } };
        }
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
