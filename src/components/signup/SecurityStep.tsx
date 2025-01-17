import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Key, Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { securitySchema } from "@/schemas/validation";
import * as z from "zod";

interface SecurityStepProps {
  form: UseFormReturn<z.infer<typeof securitySchema>>;
  t: any;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  passwordStrength?: number;
}

const SecurityStep = ({ 
  form, 
  t, 
  showPassword, 
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  passwordStrength = 0
}: SecurityStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.password}</FormLabel>
            <FormControl>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  placeholder={t.signup.placeholders.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.confirmPassword}</FormLabel>
            <FormControl>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  placeholder={t.signup.placeholders.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {t.signup.labels.terms}
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SecurityStep;