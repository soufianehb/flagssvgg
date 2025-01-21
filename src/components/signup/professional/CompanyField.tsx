import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CompanyFieldProps {
  form: UseFormReturn<any>;
  t: any;
}

export const CompanyField = ({ form, t }: CompanyFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="companyName"
      rules={{ 
        required: t?.validation?.companyName?.required || "Company name is required",
        minLength: {
          value: 2,
          message: t?.validation?.companyName?.minLength || "Company name must be at least 2 characters"
        }
      }}
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
  );
};