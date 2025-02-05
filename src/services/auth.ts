
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

    const { error: professionalError } = await supabase
      .from('professional_info')
      .insert({
        user_id: authData.user.id,
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
      });

    if (professionalError) throw professionalError;

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
