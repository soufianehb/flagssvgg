
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/lib/i18n";
import { PhoneNumberField } from "./contact/PhoneNumberField";
import { WhatsAppPreferences } from "./contact/WhatsAppPreferences";

interface ContactInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Phone Numbers Section */}
        <div className="flex flex-col md:flex-row md:gap-6 gap-4">
          <PhoneNumberField
            form={form}
            type="personal"
            label={t.profile.general.fields.phoneNumber}
          />
          <PhoneNumberField
            form={form}
            type="business"
            label={t.profile.general.fields.businessPhone}
          />
        </div>

        {/* WhatsApp Preferences */}
        <WhatsAppPreferences form={form} />
      </div>
    </div>
  );
}
