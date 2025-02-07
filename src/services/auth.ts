
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
    // Create the profile directly in the profiles table with pending status
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        email,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        company_name: profileData.company_name,
        is_profile_complete: false,
        status: 'pending',
        metadata: profileData.metadata || {}
      }]);

    if (profileError) {
      console.error('Error creating profile:', profileError);
      throw profileError;
    }

    // Then proceed with the signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (authError) throw authError;
    
    return { data: authData, error: null };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data };
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return {
      data: {
        subscription
      }
    };
  }
};
