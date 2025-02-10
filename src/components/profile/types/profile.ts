
import { z } from "zod";

export const generalFormSchema = z.object({
  title: z.enum(["mr", "mrs"]).optional(),
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
  trade_register_delivered_by: z.string().optional(),
  main_bank: z.string().optional(),
  export_license: z.string().optional(),
  import_license: z.string().optional(),
  vat_number: z.string().optional(),
  business_type: z.enum([
    "producer",
    "manufacturer",
    "wholesaler",
    "broker",
    "retailer",
    "group",
    "association",
    "other"
  ]).optional(),
  employee_count: z.enum([
    "1",
    "1-5",
    "5-10",
    "10-20",
    "20-40",
    "40-60",
    "60-100",
    "100+"
  ]).optional(),
  website: z.string().optional(),
  business_description: z.string().min(25, "Description must be at least 25 words"),
  capabilities_description: z.string().min(25, "Description must be at least 25 words"),
  metadata: z.object({
    questionnaire: z.object({
      hasCompanyRegistration: z.boolean().default(false),
      acceptsDocumentSharing: z.boolean().default(false),
      acceptsReferences: z.boolean().default(false),
      hasFinancialCapacity: z.boolean().default(false)
    }).default({
      hasCompanyRegistration: false,
      acceptsDocumentSharing: false,
      acceptsReferences: false,
      hasFinancialCapacity: false
    })
  }).default({
    questionnaire: {
      hasCompanyRegistration: false,
      acceptsDocumentSharing: false,
      acceptsReferences: false,
      hasFinancialCapacity: false
    }
  })
});

export type GeneralFormValues = z.infer<typeof generalFormSchema>;
