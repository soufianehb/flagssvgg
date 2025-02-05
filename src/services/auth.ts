
import { supabase } from '@/integrations/supabase/client';
import type { PersonalData, ProfessionalData } from '@/types/signup';

export const authService = {
  login: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signup: async (
    email: string, 
    password: string, 
    personalData: PersonalData,
    professionalData: ProfessionalData
  ) => {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: personalData.firstName,
          last_name: personalData.lastName,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (authError) throw authError;

    if (!authData.user?.id) {
      throw new Error('No user ID returned from signup');
    }

    // Update the profile with professional info
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: personalData.firstName,
        last_name: personalData.lastName,
        address: professionalData.address,
        zip_code: professionalData.zipCode,
        city: professionalData.city,
        country: professionalData.country,
        company_name: professionalData.companyName,
        phone_number: professionalData.phoneNumber,
        business_phone: professionalData.businessPhone,
        phone_code: professionalData.phoneCode,
        business_phone_code: professionalData.businessPhoneCode,
        trade_register_number: professionalData.tradeRegisterNumber,
      })
      .eq('id', authData.user.id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      throw profileError;
    }

    // Sign out after registration since we want users to verify their email first
    await supabase.auth.signOut();

    return authData;
  },

  logout: async () => {
    return await supabase.auth.signOut();
  },

  getSession: async () => {
    return await supabase.auth.getSession();
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};
