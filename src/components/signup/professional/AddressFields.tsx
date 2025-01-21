import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/data/countries";

interface AddressFieldsProps {
  form: UseFormReturn<any>;
  t: any;
  handleCountryChange: (value: string) => void;
}

export const AddressFields = ({ form, t, handleCountryChange }: AddressFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="address"
        rules={{ required: t?.signup?.validation?.address?.required || "Address is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.address}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t.signup.placeholders.address} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="zipCode"
          rules={{ required: t?.signup?.validation?.zipCode?.required || "Zip code is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.zipCode}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.signup.placeholders.zipCode} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          rules={{ required: t?.signup?.validation?.city?.required || "City is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.city}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.signup.placeholders.city} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="country"
        rules={{ required: t?.signup?.validation?.country?.required || "Country is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.country}</FormLabel>
            <Select onValueChange={handleCountryChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.signup.placeholders.country} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};