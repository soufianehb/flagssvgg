
import { useState } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export const PasswordField = () => {
  const { t } = useTranslation();
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    if (password.length >= 10) strength += 20;
    setPasswordStrength(strength);
  };

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="password">{t.login.password.label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <Input
                {...field}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t.login.password.placeholder}
                autoComplete="current-password"
                className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-accent"
                onChange={(e) => {
                  field.onChange(e);
                  calculatePasswordStrength(e.target.value);
                }}
                aria-required="true"
                aria-invalid={!!form.formState.errors.password}
                aria-describedby={form.formState.errors.password ? "password-error" : "password-strength"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={showPassword ? t.login.password.hide : t.login.password.show}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage id="password-error" role="alert" aria-live="polite" />
          {field.value && (
            <div className="mt-2 space-y-1">
              <Progress 
                value={passwordStrength} 
                className="h-1" 
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={passwordStrength}
                aria-label={t.login.password.strength}
              />
              <p className="text-xs text-gray-500" id="password-strength">
                {t.login.password.strength}: {passwordStrength}%
              </p>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};
