
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";

export const createEmailFormSchema = () => {
  const { t } = useTranslation();
  
  return z.object({
    newEmail: z.string().email(t.profile.settings.security.form.errors.invalidEmail),
    password: z.string().min(1, t.profile.settings.security.form.errors.passwordRequired),
  });
};

export const emailFormSchema = createEmailFormSchema();

export type EmailFormValues = z.infer<typeof emailFormSchema>;

export type EmailUpdateStatus = 'idle' | 'pending' | 'confirming' | 'updating_profile';

