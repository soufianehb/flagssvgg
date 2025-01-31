import * as z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  businessPhone: z.string().min(1, "Business phone is required"),
  phoneCode: z.string().min(1, "Phone code is required"),
  businessPhoneCode: z.string().min(1, "Business phone code is required"),
  tradeRegisterNumber: z.string().min(1, "Trade register number is required"),
});