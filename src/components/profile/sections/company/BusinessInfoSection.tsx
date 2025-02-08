
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/contexts/TranslationContext";
import { GeneralFormValues } from "../../types/profile";

interface BusinessInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function BusinessInfoSection({ form }: BusinessInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-900 pt-8">{t.profile.general.sections.business}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.companyDetails.companyName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trade_register_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.companyDetails.tradeRegisterNumber}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="trade_register_delivered_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.companyDetails.deliveredBy}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="main_bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.companyDetails.mainBank}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="export_license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.companyDetails.exportLicense}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="import_license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.companyDetails.importLicense}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
