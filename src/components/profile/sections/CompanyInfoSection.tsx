
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { AddressSection } from "./company/AddressSection";
import { BusinessInfoSection } from "./company/BusinessInfoSection";
import { QuestionsSection } from "./company/QuestionsSection";
import { useTranslation } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

interface CompanyInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function CompanyInfoSection({ form }: CompanyInfoSectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">{t.profile.general.sections.address}</h3>
        <AddressSection form={form} />
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">{t.profile.general.sections.business}</h3>
        <BusinessInfoSection form={form} />
      </div>

      <Separator />
      
      <QuestionsSection form={form} />
    </div>
  );
}
