
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { GeneralFormValues } from "../../types/profile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountryCodes } from "@/hooks/useCountryCodes";

interface PhoneSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function PhoneSection({ form }: PhoneSectionProps) {
  const { t } = useTranslation();
  const { data: countries } = useCountryCodes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormItem>
        <FormLabel>{t.profile.general.fields.personalPhone}</FormLabel>
        <div className="flex gap-2">
          <div className="w-[90px]">
            <FormField
              control={form.control}
              name="phoneCode"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries?.map((country) => (
                      <SelectItem key={country.code} value={country.dial_code}>
                        <span className="flex items-center">
                          <img
                            src={`/flags/4x3/${country.code.toLowerCase()}.svg`}
                            alt={`${country.code} flag`}
                            className="w-4 h-3 mr-2 inline-block object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {country.dial_code}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder={t.profile.general.fields.phoneNumber} {...field} type="tel" />
                </FormControl>
              )}
            />
          </div>
        </div>
        <FormMessage>
          {form.formState.errors.phoneNumber?.message?.toString()}
        </FormMessage>
      </FormItem>

      <FormItem>
        <FormLabel>{t.profile.general.fields.businessPhone}</FormLabel>
        <div className="flex gap-2">
          <div className="w-[90px]">
            <FormField
              control={form.control}
              name="businessPhoneCode"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries?.map((country) => (
                      <SelectItem key={country.code} value={country.dial_code}>
                        <span className="flex items-center">
                          <img
                            src={`/flags/4x3/${country.code.toLowerCase()}.svg`}
                            alt={`${country.code} flag`}
                            className="w-4 h-3 mr-2 inline-block object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {country.dial_code}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="businessPhone"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder={t.profile.general.fields.businessPhone} {...field} type="tel" />
                </FormControl>
              )}
            />
          </div>
        </div>
        <FormMessage>
          {form.formState.errors.businessPhone?.message?.toString()}
        </FormMessage>
      </FormItem>
    </div>
  );
}
