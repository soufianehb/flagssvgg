import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { phoneCodes } from "@/data/phoneCodes";

interface PhoneFieldProps {
  form: UseFormReturn<any>;
  t: any;
  fieldName: "phoneNumber" | "businessPhone";
  phoneCodeField: "phoneCode" | "businessPhoneCode";
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => void;
}

export const PhoneField = ({ form, t, fieldName, phoneCodeField, handlePhoneChange }: PhoneFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t.signup.labels[fieldName]}</FormLabel>
          <FormControl>
            <div className="relative flex">
              <Select 
                value={form.getValues(phoneCodeField)}
                onValueChange={(value) => {
                  form.setValue(phoneCodeField, value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-[70px] absolute inset-y-0 left-0 flex items-center px-1 bg-gray-100 border border-r-0 border-input rounded-l-md">
                    <SelectValue>
                      {form.getValues(phoneCodeField) || "+--"}
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
                placeholder={t.signup.placeholders[fieldName]}
                onChange={(e) => {
                  field.onChange(e);
                  handlePhoneChange(e, fieldName);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};