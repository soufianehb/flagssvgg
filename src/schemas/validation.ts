import * as z from "zod";
import { type CountryCode } from "libphonenumber-js";

// Schéma de base pour le mot de passe
export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
});

// Schéma pour la connexion
export const loginSchema = z.object({
  email: z.string().email("Format d'email invalide"),
  password: passwordSchema.shape.password,
  rememberMe: z.boolean().default(false)
});

// Schéma pour les informations personnelles
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide")
});

// Schéma pour les informations professionnelles
export const professionalInfoSchema = z.object({
  address: z.string().min(1, "L'adresse est requise"),
  zipCode: z.string().min(1, "Le code postal est requis"),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  businessPhone: z.string().optional()
}).refine(
  (data) => data.phoneNumber || data.businessPhone,
  "Au moins un numéro de téléphone est requis"
);

// Schéma pour la sécurité (inscription)
export const securitySchema = z.object({
  password: passwordSchema.shape.password,
  confirmPassword: z.string(),
  terms: z.boolean()
}).refine(
  (data) => data.password === data.confirmPassword,
  "Les mots de passe ne correspondent pas"
).refine(
  (data) => data.terms === true,
  "Vous devez accepter les conditions"
);

// Schéma complet pour l'inscription
export const signupSchema = z.object({
  personal: personalInfoSchema,
  professional: professionalInfoSchema,
  security: securitySchema
});