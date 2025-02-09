
import { supabase } from "@/integrations/supabase/client";

export const updateProfileEmail = async (userId: string, newEmail: string, retryCount = 0, maxRetries = 3) => {
  try {
    console.log('Updating profile email:', newEmail);
    
    const { error } = await supabase
      .from('profiles')
      .update({ email: newEmail })
      .eq('user_id', userId);

    if (error) throw error;

    console.log('Profile email updated successfully');
    return { error: null, success: true };
  } catch (error: any) {
    console.error(`Error updating profile email (attempt ${retryCount + 1}):`, error);
    
    if (retryCount < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return updateProfileEmail(userId, newEmail, retryCount + 1, maxRetries);
    }
    
    return { error, success: false };
  }
};
