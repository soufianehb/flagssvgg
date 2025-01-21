import * as z from "zod";

export const createValidationSchemas = (t: any) => ({
  login: z.object({
    email: z.string().email(t?.validation?.email?.invalid || "Invalid email address"),
    password: z.string().min(1, t?.validation?.required || "Password is required"),
    rememberMe: z.boolean().default(false)
  })
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false)
});