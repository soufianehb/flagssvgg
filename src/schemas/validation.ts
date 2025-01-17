import * as z from "zod";
import { type CountryCode } from "libphonenumber-js";

export const createValidationSchemas = (t: any) => ({
  // Password schema with translations
  password: z.object({
    password: z
      .string()
      .min(6, t.validation.password.minLength)
      .regex(/[A-Z]/, t.validation.password.uppercase)
      .regex(/[0-9]/, t.validation.password.number)
  }),

  // Login schema with translations
  login: z.object({
    email: z.string().email(t.validation.email.invalid),
    password: z.string().min(1, t.validation.required),
    rememberMe: z.boolean().default(false)
  }),

  // Personal info schema with translations
  personalInfo: z.object({
    firstName: z.string().min(1, t.validation.required),
    lastName: z.string().min(1, t.validation.required),
    email: z.string().min(1, t.validation.required).email(t.validation.email.invalid)
  }),

  // Professional info schema with translations
  professionalInfo: z.object({
    address: z.string().min(1, t.validation.address.required),
    zipCode: z.string().min(1, t.validation.zipCode.required),
    city: z.string().min(1, t.validation.city.required),
    country: z.string().min(1, t.validation.country.required),
    companyName: z.string().optional(),
    phoneNumber: z.string().optional(),
    businessPhone: z.string().optional()
  }).refine(
    (data) => data.phoneNumber || data.businessPhone,
    t.validation.phoneNumber.required
  ),

  // Security schema with translations
  security: z.object({
    password: z.string()
      .min(6, t.validation.password.minLength)
      .regex(/[A-Z]/, t.validation.password.uppercase)
      .regex(/[0-9]/, t.validation.password.number),
    confirmPassword: z.string(),
    terms: z.boolean()
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: t.validation.password.match,
      path: ["confirmPassword"]
    }
  ).refine(
    (data) => data.terms === true,
    {
      message: t.validation.terms,
      path: ["terms"]
    }
  )
});

// Complete signup schema combining all parts
export const createSignupSchema = (t: any) => {
  const schemas = createValidationSchemas(t);
  return z.object({
    personal: schemas.personalInfo,
    professional: schemas.professionalInfo,
    security: schemas.security
  });
};