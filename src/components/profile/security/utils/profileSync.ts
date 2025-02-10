
import { supabase } from "@/integrations/supabase/client";

const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRIES = 3;

export const updateProfileEmail = async (userId: string, newEmail: string, retryCount = 0) => {
  try {
    console.log('Updating profile email:', { userId, newEmail, retryAttempt: retryCount + 1 });
    
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
    
    if (retryCount < MAX_RETRIES - 1) {
      // Exponential backoff: 1s, 2s, 4s
      const delayMs = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`Retrying profile update in ${delayMs}ms (attempt ${retryCount + 2} of ${MAX_RETRIES})...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return updateProfileEmail(userId, newEmail, retryCount + 1);
    }
    
    return { error, success: false, data: null };
  }
};
