import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { countries } from "@/data/countries";
import { phoneCodes } from "@/data/phoneCodes";
import { useEffect } from "react";
import { validatePhoneNumber } from "@/utils/phoneValidation";

interface ProfessionalInfoStepProps {
  form: UseFormReturn<any>;
  t: any;
  handleCountryChange: (value: string) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => void;
}

const ProfessionalInfoStep = ({ form, t, handleCountryChange, handlePhoneChange }: ProfessionalInfoStepProps) => {
  // Validate that at least one phone number is filled
  const validatePhoneNumbers = () => {
    const phoneNumber = form.getValues("phoneNumber");
    const businessPhone = form.getValues("businessPhone");
    const country = form.getValues("country");

    if (!phoneNumber && !businessPhone) {
      return false;
    }

    if (phoneNumber) {
      const validation = validatePhoneNumber(phoneNumber, country, t);
      if (!validation.isValid) return false;
    }

    if (businessPhone) {
      const validation = validatePhoneNumber(businessPhone, country, t);
      if (!validation.isValid) return false;
    }

    return true;
  };

  // Real-time validation
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "address" || name === "city" || name === "country" || name === "zipCode" || name === "companyName") {
        form.trigger(name);
      }
      
      if (name === "phoneNumber" || name === "businessPhone" || name === "country") {
        if (validatePhoneNumbers()) {
          form.clearErrors("phoneNumber");
          form.clearErrors("businessPhone");
        } else {
          const country = form.getValues("country");
          const phoneNumber = form.getValues("phoneNumber");
          const businessPhone = form.getValues("businessPhone");

          if (phoneNumber) {
            const validation = validatePhoneNumber(phoneNumber, country, t);
            if (!validation.isValid) {
              form.setError("phoneNumber", {
                type: "manual",
                message: validation.error
              });
            }
          }

          if (businessPhone) {
            const validation = validatePhoneNumber(businessPhone, country, t);
            if (!validation.isValid) {
              form.setError("businessPhone", {
                type: "manual",
                message: validation.error
              });
            }
          }

          if (!phoneNumber && !businessPhone) {
            form.setError("phoneNumber", {
              type: "manual",
              message: t.signup.validation.phoneNumber.required
            });
            form.setError("businessPhone", {
              type: "manual",
              message: t.signup.validation.businessPhone.required
            });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, t]);

  // Fonction pour gérer le changement de pays et mettre à jour les codes téléphoniques
  const handleCountrySelection = (value: string) => {
    handleCountryChange(value);
    const phoneCode = phoneCodes[value];
    if (phoneCode) {
      form.setValue("phoneCode", phoneCode);
      form.setValue("businessPhoneCode", phoneCode);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <FormField
        control={form.control}
        name="address"
        rules={{ required: t.signup.validation.address.required }}
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
          rules={{ required: t.signup.validation.city.required }}
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
        rules={{ required: t.signup.validation.country.required }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.country}</FormLabel>
            <Select onValueChange={handleCountrySelection} defaultValue={field.value}>
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
        rules={{
          validate: () => validatePhoneNumbers() || t.signup.validation.phoneNumber.required
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.phoneNumber}</FormLabel>
            <FormControl>
              <div className="relative flex">
                <Select 
                  value={form.getValues("phoneCode")}
                  onValueChange={(value) => {
                    form.setValue("phoneCode", value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-[70px] absolute inset-y-0 left-0 flex items-center px-1 bg-gray-100 border border-r-0 border-input rounded-l-md">
                      <SelectValue>
                        {form.getValues("phoneCode") || "+--"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(phoneCodes).map(([country, code]) => (
                      <SelectItem key={country} value={code}>
                        {code} {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  {...field}
                  type="tel"
                  className="pl-[80px]"
                  placeholder={t.signup.placeholders.phoneNumber}
                  onChange={(e) => handlePhoneChange(e, "phoneNumber")}
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
        rules={{
          validate: () => validatePhoneNumbers() || t.signup.validation.businessPhone.required
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.businessPhone}</FormLabel>
            <FormControl>
              <div className="relative flex">
                <Select 
                  value={form.getValues("businessPhoneCode")}
                  onValueChange={(value) => {
                    form.setValue("businessPhoneCode", value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-[70px] absolute inset-y-0 left-0 flex items-center px-1 bg-gray-100 border border-r-0 border-input rounded-l-md">
                      <SelectValue>
                        {form.getValues("businessPhoneCode") || "+--"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(phoneCodes).map(([country, code]) => (
                      <SelectItem key={country} value={code}>
                        {code} {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  {...field}
                  type="tel"
                  className="pl-[80px]"
                  placeholder={t.signup.placeholders.businessPhone}
                  onChange={(e) => handlePhoneChange(e, "businessPhone")}
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