
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      {/* Company Registration Details */}
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

      {/* Additional Business Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="vat_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.vatNumber}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.profile.additionalInfo.vatNumberHint} />
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
                  <SelectTrigger>
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

        <FormField
          control={form.control}
          name="employee_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.profile.additionalInfo.employeeCount.label}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.profile.additionalInfo.employeeCount.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="5-10">5-10</SelectItem>
                  <SelectItem value="10-20">10-20</SelectItem>
                  <SelectItem value="20-40">20-40</SelectItem>
                  <SelectItem value="40-60">40-60</SelectItem>
                  <SelectItem value="60-100">60-100</SelectItem>
                  <SelectItem value="100+">100+</SelectItem>
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

      {/* Description Fields */}
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="business_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.profile.additionalInfo.businessDescription.label}
                <span className="block text-sm text-gray-500 mt-1">
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
                <span className="block text-sm text-gray-500 mt-1">
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
