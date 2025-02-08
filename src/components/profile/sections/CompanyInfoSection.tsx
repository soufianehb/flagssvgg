
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountryCodes } from "@/hooks/useCountryCodes";
import { CountrySelect } from "@/components/filters/selects/CountrySelect";

interface CompanyInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function CompanyInfoSection({ form }: CompanyInfoSectionProps) {
  const { t } = useTranslation();
  const { data: countries } = useCountryCodes();

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

      <h3 className="text-lg font-semibold text-gray-900 pt-4">{t.profile.general.sections.address}</h3>

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
      </div>

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
