
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

  signup: async (email: string, password: string, metadata: Record<string, any>) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: window.location.origin,
      }
    });

    if (authError) throw authError;

    // Wait for the auth session to be established
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the current session to ensure we have a valid session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("No valid session after signup");
    }

    // Create profile after successful signup and session establishment
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            user_id: authData.user.id,
            email: email,
            first_name: metadata.first_name,
            last_name: metadata.last_name,
            phone_number: metadata.phone_number,
            phone_code: metadata.phone_code,
            business_phone: metadata.business_phone,
            business_phone_code: metadata.business_phone_code,
            company_name: metadata.company_name,
            address: metadata.address,
            city: metadata.city,
            country: metadata.country,
            zip_code: metadata.zip_code,
            trade_register_number: metadata.trade_register_number
          }
        ]);

      if (profileError) throw profileError;
    }

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
