
import { supabase } from "@/integrations/supabase/client";
import { EmailFormValues } from "../types";

export const verifyPassword = async (currentEmail: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: currentEmail,
    password,
  });
  return { error };
};

export const updateUserEmail = async (newEmail: string) => {
  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  });
  return { error };
};
