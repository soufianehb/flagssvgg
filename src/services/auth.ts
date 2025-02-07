
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
    // First, create a pending profile
    const { error: pendingProfileError } = await supabase
      .from('pending_profiles')
      .insert([
        {
          email,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone_number: profileData.phone_number,
          phone_code: profileData.phone_code,
          business_phone: profileData.business_phone,
          business_phone_code: profileData.business_phone_code,
          company_name: profileData.company_name,
          address: profileData.address,
          city: profileData.city,
          country: profileData.country,
          zip_code: profileData.zip_code,
          trade_register_number: profileData.trade_register_number
        }
      ]);

    if (pendingProfileError) {
      console.error('Error creating pending profile:', pendingProfileError);
      throw pendingProfileError;
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
