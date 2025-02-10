
import { z } from "zod";

export const createEmailFormSchema = (errorMessages: {
  invalidEmail: string;
  passwordRequired: string;
}) => {
  return z.object({
    newEmail: z.string().email(errorMessages.invalidEmail),
    password: z.string().min(1, errorMessages.passwordRequired),
  });
};

// We'll create the schema instance in the component where we have access to translations
export type EmailFormSchema = ReturnType<typeof createEmailFormSchema>;
export type EmailFormValues = z.infer<EmailFormSchema>;
export type EmailUpdateStatus = 'idle' | 'pending' | 'confirming' | 'updating_profile';

