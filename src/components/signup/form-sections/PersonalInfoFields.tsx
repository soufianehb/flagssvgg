
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/lib/i18n";
import { useState, useRef, useEffect } from "react";

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (password.match(/[A-Z]/)) strength += 20;
  if (password.match(/[a-z]/)) strength += 20;
  if (password.match(/[0-9]/)) strength += 20;
  if (password.match(/[^A-Za-z0-9]/)) strength += 20;
  return strength;
};

const getPasswordStrengthColor = (strength: number): string => {
  if (strength <= 20) return "bg-red-500";
  if (strength <= 40) return "bg-orange-500";
  if (strength <= 60) return "bg-yellow-500";
  if (strength <= 80) return "bg-blue-500";
  return "bg-green-500";
};

export const PersonalInfoFields = ({ form }: { form: UseFormReturn<any> }) => {
  const { t } = useTranslation();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only try to focus if the ref is attached to an element
    if (firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.firstName}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t.signup.placeholders.firstName} 
                  {...field} 
                  ref={(e) => {
                    field.ref(e);
                    if (firstNameInputRef) {
                      firstNameInputRef.current = e;
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.lastName}</FormLabel>
              <FormControl>
                <Input placeholder={t.signup.placeholders.lastName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.email}</FormLabel>
            <FormControl>
              <Input type="email" placeholder={t.signup.placeholders.email} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.password}</FormLabel>
            <FormControl>
              <Input 
                type="password" 
                placeholder={t.signup.placeholders.password} 
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setPasswordStrength(calculatePasswordStrength(e.target.value));
                }}
              />
            </FormControl>
            <Progress 
              value={passwordStrength} 
              className={`h-1 mt-2 ${getPasswordStrengthColor(passwordStrength)}`}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
