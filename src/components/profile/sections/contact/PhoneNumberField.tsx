
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../../types/profile";
import { CountrySelect } from "@/components/filters/selects/CountrySelect";
import { useCountryCodes } from "@/hooks/useCountryCodes";

interface PhoneNumberFieldProps {
  form: UseFormReturn<GeneralFormValues>;
  type: "personal" | "business";
  label: string;
}

export function PhoneNumberField({ form, type, label }: PhoneNumberFieldProps) {
  const { data: countries } = useCountryCodes();
  const codeField = type === "personal" ? "phoneCode" : "businessPhoneCode";
  const numberField = type === "personal" ? "phoneNumber" : "businessPhone";

  return (
    <div className="flex flex-row items-end gap-2 w-full">
      <div className="w-[80px] md:w-[100px]">
        <FormField
          control={form.control}
          name={codeField}
          render={({ field }) => (
            <FormItem>
              <CountrySelect
                value={field.value}
                onValueChange={(newValue) => {
                  const selectedCountry = countries?.find(c => c.code === newValue);
                  if (selectedCountry) {
                    field.onChange(selectedCountry.dial_code);
                  }
                }}
                showLabel={false}
              />
            </FormItem>
          )}
        />
      </div>
      <div className="flex-1">
        <FormField
          control={form.control}
          name={numberField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" className="h-10 w-full min-w-[200px] md:min-w-[250px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
