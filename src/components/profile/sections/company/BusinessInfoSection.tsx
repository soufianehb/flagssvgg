
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { GeneralFormValues } from "../../types/profile";

interface BusinessInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function BusinessInfoSection({ form }: BusinessInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">{t.profile.general.sections.business}</h3>
      
      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.companyName}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

