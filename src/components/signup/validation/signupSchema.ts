import * as z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phoneNumber: z.string().optional(),
  phoneCode: z.string().optional(),
  businessPhone: z.string().optional(),
  businessPhoneCode: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  tradeRegisterNumber: z.string().optional(),
});