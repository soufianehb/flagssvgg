
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { BusinessInfoSection } from "./company/BusinessInfoSection";
import { AddressSection } from "./company/AddressSection";
import { PhoneSection } from "./company/PhoneSection";

interface CompanyInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function CompanyInfoSection({ form }: CompanyInfoSectionProps) {
  return (
    <div className="space-y-6">
      <AddressSection form={form} />
      <h3 className="text-lg font-semibold text-gray-900 pt-4">Contact</h3>
      <PhoneSection form={form} />
      <BusinessInfoSection form={form} />
    </div>
  );
}
