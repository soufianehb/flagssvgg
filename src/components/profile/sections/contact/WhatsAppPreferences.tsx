
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "../../types/profile";
import { useTranslation } from "@/lib/i18n";

interface WhatsAppPreferencesProps {
  form: UseFormReturn<ContactFormValues>;
}

export function WhatsAppPreferences({ form }: WhatsAppPreferencesProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="allow_whatsapp_contact"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>{t.profile.general.fields.whatsappContact}</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label={t.profile.general.fields.whatsappContact}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="allow_whatsapp_business_contact"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>{t.profile.general.fields.whatsappBusinessContact}</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label={t.profile.general.fields.whatsappBusinessContact}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
