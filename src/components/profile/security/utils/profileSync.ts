
import { supabase } from "@/integrations/supabase/client";

export const updateProfileEmail = async (userId: string, newEmail: string, retryCount = 0, maxRetries = 3) => {
  try {
    console.log('Updating profile email:', { userId, newEmail });
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ email: newEmail })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile email:', error);
      throw error;
    }

    console.log('Profile email updated successfully:', data);
    return { error: null, success: true, data };
  } catch (error: any) {
    console.error(`Error updating profile email (attempt ${retryCount + 1}):`, error);
    
    if (retryCount < maxRetries - 1) {
      console.log(`Retrying profile update (attempt ${retryCount + 2} of ${maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return updateProfileEmail(userId, newEmail, retryCount + 1, maxRetries);
    }
    
    return { error, success: false, data: null };
  }
};
