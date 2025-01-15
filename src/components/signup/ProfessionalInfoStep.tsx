import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { countries } from "@/data/countries";
import { phoneCodes } from "@/data/phoneCodes";

interface ProfessionalInfoStepProps {
  form: UseFormReturn<any>;
  t: any;
  handleCountryChange: (value: string) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => void;
}

const ProfessionalInfoStep = ({ form, t, handleCountryChange, handlePhoneChange }: ProfessionalInfoStepProps) => {
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => {
    const value = e.target.value;
    const country = form.getValues("country");
    const countryCode = phoneCodes[country] || "";
    
    // Si l'utilisateur essaie de modifier le préfixe, on le remet
    if (!value.startsWith(countryCode)) {
      const numberWithoutPrefix = value.replace(/^\+\d+/, '');
      form.setValue(fieldName, `${countryCode}${numberWithoutPrefix}`);
    } else {
      form.setValue(fieldName, value);
    }
  };

  const onCountryChange = (value: string) => {
    handleCountryChange(value);
    const phoneCode = phoneCodes[value] || "";
    
    // Mise à jour automatique des préfixes téléphoniques
    const currentPhoneNumber = form.getValues("phoneNumber") || "";
    const currentBusinessPhone = form.getValues("businessPhone") || "";
    
    // Garde les numéros existants mais change le préfixe
    const phoneNumberWithoutPrefix = currentPhoneNumber.replace(/^\+\d+/, '');
    const businessPhoneWithoutPrefix = currentBusinessPhone.replace(/^\+\d+/, '');
    
    form.setValue("phoneNumber", `${phoneCode}${phoneNumberWithoutPrefix}`);
    form.setValue("businessPhone", `${phoneCode}${businessPhoneWithoutPrefix}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <FormField
        control={form.control}
        name="address"
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.country}</FormLabel>
            <Select onValueChange={onCountryChange} defaultValue={field.value}>
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

      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.companyName}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t.signup.placeholders.companyName} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.phoneNumber}</FormLabel>
            <FormControl>
              <div className="relative flex">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md">
                  {form.getValues("country") && phoneCodes[form.getValues("country")]}
                </div>
                <Input 
                  {...field}
                  type="tel"
                  className="pl-[4.5rem]"
                  placeholder={t.signup.placeholders.phoneNumber}
                  onChange={(e) => handlePhoneInput(e, "phoneNumber")}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.businessPhone}</FormLabel>
            <FormControl>
              <div className="relative flex">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md">
                  {form.getValues("country") && phoneCodes[form.getValues("country")]}
                </div>
                <Input 
                  {...field}
                  type="tel"
                  className="pl-[4.5rem]"
                  placeholder={t.signup.placeholders.businessPhone}
                  onChange={(e) => handlePhoneInput(e, "businessPhone")}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfessionalInfoStep;