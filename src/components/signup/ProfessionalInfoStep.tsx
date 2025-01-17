import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
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
                <Select 
                  defaultValue={form.getValues("country") ? phoneCodes[form.getValues("country")] : undefined}
                  onValueChange={(value) => {
                    // Mise à jour du code pays uniquement, sans affecter le pays de résidence
                    form.setValue("phoneCode", value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-[120px] absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md">
                      <SelectValue>
                        {form.getValues("country") ? phoneCodes[form.getValues("country")] : "+--"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(phoneCodes).map(([country, code]) => (
                      <SelectItem key={country} value={code}>
                        {code} ({country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  {...field}
                  type="tel"
                  className="pl-[130px]"
                  placeholder={t.signup.placeholders.phoneNumber}
                  onChange={(e) => handlePhoneChange(e, "phoneNumber")}
                />
              </div>
            </FormControl>
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
                <Select 
                  defaultValue={form.getValues("country") ? phoneCodes[form.getValues("country")] : undefined}
                  onValueChange={(value) => {
                    // Mise à jour du code pays uniquement, sans affecter le pays de résidence
                    form.setValue("businessPhoneCode", value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-[120px] absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md">
                      <SelectValue>
                        {form.getValues("country") ? phoneCodes[form.getValues("country")] : "+--"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(phoneCodes).map(([country, code]) => (
                      <SelectItem key={country} value={code}>
                        {code} ({country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  {...field}
                  type="tel"
                  className="pl-[130px]"
                  placeholder={t.signup.placeholders.businessPhone}
                  onChange={(e) => handlePhoneChange(e, "businessPhone")}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfessionalInfoStep;