import * as z from "zod";

export const createValidationSchemas = (t: any) => ({
  password: z.object({
    password: z
      .string()
      .min(6, t?.validation?.password?.minLength || "Password must be at least 6 characters")
      .regex(/[A-Z]/, t?.validation?.password?.uppercase || "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, t?.validation?.password?.number || "Password must contain at least one number")
  }),

  login: z.object({
    email: z.string().email(t?.validation?.email?.invalid || "Invalid email address"),
    password: z.string().min(1, t?.validation?.required || "Password is required"),
    rememberMe: z.boolean().default(false)
  }),

  personalInfo: z.object({
    firstName: z.string().min(1, t?.validation?.required || "First name is required"),
    lastName: z.string().min(1, t?.validation?.required || "Last name is required"),
    email: z.string().min(1, t?.validation?.required || "Email is required").email(t?.validation?.email?.invalid || "Invalid email address")
  }),

  professionalInfo: z.object({
    address: z.string().min(1, t?.validation?.address?.required || "Address is required"),
    zipCode: z.string().min(1, t?.validation?.zipCode?.required || "Zip code is required"),
    city: z.string().min(1, t?.validation?.city?.required || "City is required"),
    country: z.string().min(1, t?.validation?.country?.required || "Country is required"),
    companyName: z.string().optional(),
    phoneNumber: z.string().optional(),
    businessPhone: z.string().optional()
  }).refine(
    (data) => data.phoneNumber || data.businessPhone,
    t?.validation?.phoneNumber?.required || "At least one phone number is required"
  ),

  security: z.object({
    password: z.string()
      .min(6, t?.validation?.password?.minLength || "Password must be at least 6 characters")
      .regex(/[A-Z]/, t?.validation?.password?.uppercase || "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, t?.validation?.password?.number || "Password must contain at least one number"),
    confirmPassword: z.string(),
    terms: z.boolean()
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: t?.validation?.password?.match || "Passwords must match",
      path: ["confirmPassword"]
    }
  ).refine(
    (data) => data.terms === true,
    {
      message: t?.validation?.terms || "You must accept the terms and conditions",
      path: ["terms"]
    }
  )
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false)
});

export const createSignupSchema = (t: any) => {
  const schemas = createValidationSchemas(t);
  return z.object({
    personal: schemas.personalInfo,
    professional: schemas.professionalInfo,
    security: schemas.security
  });
};