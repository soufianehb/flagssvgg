
import { z } from "zod";

export const generalFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  phoneCode: z.string().optional(),
  businessPhone: z.string().optional(),
  businessPhoneCode: z.string().optional(),
  company_name: z.string().min(1, "Company name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zip_code: z.string().optional(),
  trade_register_number: z.string().optional(),
});

export type GeneralFormValues = z.infer<typeof generalFormSchema>;
