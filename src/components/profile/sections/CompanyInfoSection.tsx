
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { BusinessInfoSection } from "./company/BusinessInfoSection";
import { AddressSection } from "./company/AddressSection";
import { PhoneSection } from "./company/PhoneSection";
import { AdditionalBusinessSection } from "./company/AdditionalBusinessSection";
import { useTranslation } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

interface CompanyInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function CompanyInfoSection({ form }: CompanyInfoSectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <AddressSection form={form} />
      
      <Separator className="my-8" />
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact</h3>
        <PhoneSection form={form} />
      </div>
      
      <Separator className="my-8" />
      
      <BusinessInfoSection form={form} />
      
      <Separator className="my-8" />
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t.profile.general.sections.business}
        </h3>
        <AdditionalBusinessSection form={form} />
      </div>
    </div>
  );
}

