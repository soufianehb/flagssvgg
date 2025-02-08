
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/lib/i18n";

interface CompanyInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function CompanyInfoSection({ form }: CompanyInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
      
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

      <FormField
        control={form.control}
        name="trade_register_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.tradeRegisterNumber}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <h3 className="text-lg font-semibold text-gray-900 pt-4">Company Address</h3>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.address}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.city}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.zipCode}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.country}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="businessPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.businessPhone}</FormLabel>
            <FormControl>
              <Input {...field} type="tel" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
