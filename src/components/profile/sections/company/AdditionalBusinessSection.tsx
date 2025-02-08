
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { GeneralFormValues } from "../../types/profile";

interface AdditionalBusinessSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function AdditionalBusinessSection({ form }: AdditionalBusinessSectionProps) {
  const { t } = useTranslation();
  const vatValue = form.watch('vat_number');

  return (
    <div className="space-y-6">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="vat_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.profile.additionalInfo.vatNumber}
                {!field.value && (
                  <span className="text-sm text-gray-500 ml-2">
                    {t.profile.additionalInfo.vatNumberHint}
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="business_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.businessType.label}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t.profile.additionalInfo.businessType.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="producer">{t.profile.additionalInfo.businessType.producer}</SelectItem>
                  <SelectItem value="manufacturer">{t.profile.additionalInfo.businessType.manufacturer}</SelectItem>
                  <SelectItem value="wholesaler">{t.profile.additionalInfo.businessType.wholesaler}</SelectItem>
                  <SelectItem value="broker">{t.profile.additionalInfo.businessType.broker}</SelectItem>
                  <SelectItem value="retailer">{t.profile.additionalInfo.businessType.retailer}</SelectItem>
                  <SelectItem value="group">{t.profile.additionalInfo.businessType.group}</SelectItem>
                  <SelectItem value="association">{t.profile.additionalInfo.businessType.association}</SelectItem>
                  <SelectItem value="other">{t.profile.additionalInfo.businessType.other}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="employee_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.employeeCount.label}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t.profile.additionalInfo.employeeCount.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="1-5">1 à 5</SelectItem>
                  <SelectItem value="5-10">5 à 10</SelectItem>
                  <SelectItem value="10-20">10 à 20</SelectItem>
                  <SelectItem value="20-40">20 à 40</SelectItem>
                  <SelectItem value="40-60">40 à 60</SelectItem>
                  <SelectItem value="60-100">60 à 100</SelectItem>
                  <SelectItem value="100+">+100</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.website}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Descriptions section - single column, two rows */}
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="business_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.profile.additionalInfo.businessDescription.label}
                <span className="block text-sm text-gray-500">
                  {t.profile.additionalInfo.businessDescription.hint}
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capabilities_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.profile.additionalInfo.capabilities.label}
                <span className="block text-sm text-gray-500">
                  {t.profile.additionalInfo.capabilities.hint}
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

