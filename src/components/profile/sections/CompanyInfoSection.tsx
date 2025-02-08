
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
      <BusinessInfoSection form={form} />
      <AddressSection form={form} />
      <PhoneSection form={form} />
    </div>
  );
}
