
import { z } from "zod";

export const emailFormSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required to change email"),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;

export type EmailUpdateStatus = 'idle' | 'pending' | 'confirming' | 'updating_profile';
