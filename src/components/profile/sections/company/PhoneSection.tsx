
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
  const { data: countries } = useCountryCodes();

  return (
    <div className="space-y-6">
      <FormItem>
        <FormLabel>Personal Phone</FormLabel>
        <div className="flex gap-2">
          <div className="w-[120px]">
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
                      <SelectValue placeholder="Code" />
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
                  <Input placeholder="Phone number" {...field} type="tel" />
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
        <FormLabel>Business Phone</FormLabel>
        <div className="flex gap-2">
          <div className="w-[120px]">
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
                      <SelectValue placeholder="Code" />
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
                  <Input placeholder="Business phone" {...field} type="tel" />
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
