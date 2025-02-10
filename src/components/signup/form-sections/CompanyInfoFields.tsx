
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n";

export const CompanyInfoFields = ({ form }: { form: UseFormReturn<any> }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.companyName}</FormLabel>
            <FormControl>
              <Input placeholder={t.signup.placeholders.companyName} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tradeRegisterNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.tradeRegisterNumber}</FormLabel>
            <FormControl>
              <Input placeholder={t.signup.placeholders.tradeRegisterNumber} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
