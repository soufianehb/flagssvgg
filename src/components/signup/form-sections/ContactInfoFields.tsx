import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CountrySelect } from "@/components/filters/selects/CountrySelect";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountryCodes } from "@/hooks/useCountryCodes";
import { useTranslation } from "@/lib/i18n";

export const ContactInfoFields = ({ form }: { form: UseFormReturn<any> }) => {
  const { t } = useTranslation();
  const { data: countries } = useCountryCodes();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.address}</FormLabel>
            <FormControl>
              <Input placeholder={t.signup.placeholders.address} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.zipCode}</FormLabel>
              <FormControl>
                <Input placeholder={t.signup.placeholders.zipCode} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.city}</FormLabel>
              <FormControl>
                <Input placeholder={t.signup.placeholders.city} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.country}</FormLabel>
            <FormControl>
              <CountrySelect
                value={field.value}
                onChange={field.onChange}
                onCountryCodeChange={(dialCode) => {
                  form.setValue("phoneCode", dialCode);
                  form.setValue("businessPhoneCode", dialCode);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormItem>
          <FormLabel>Personal Phone</FormLabel>
          <div className="flex gap-2">
            <div className="w-29">
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
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                )}
              />
            </div>
          </div>
          <FormMessage>{form.formState.errors.phoneNumber?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Business Phone</FormLabel>
          <div className="flex gap-2">
            <div className="w-29">
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
                    <Input placeholder="Business phone" {...field} />
                  </FormControl>
                )}
              />
            </div>
          </div>
          <FormMessage>{form.formState.errors.businessPhone?.message}</FormMessage>
        </FormItem>
      </div>
    </div>
  );
};