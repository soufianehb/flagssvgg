
import { User } from "lucide-react";
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

export const EmailField = () => {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="email">{t.login.email.label}</FormLabel>
          <FormControl>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <Input
                {...field}
                id="email"
                placeholder={t.login.email.placeholder}
                type="email"
                autoComplete="email"
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-accent"
                aria-required="true"
                aria-invalid={!!form.formState.errors.email}
                aria-describedby={form.formState.errors.email ? "email-error" : undefined}
              />
            </div>
          </FormControl>
          <FormMessage id="email-error" role="alert" aria-live="polite" />
        </FormItem>
      )}
    />
  );
};
