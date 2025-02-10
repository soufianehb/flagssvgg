
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export const RememberMeField = () => {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <div className="flex items-center justify-between">
      <FormField
        control={form.control}
        name="rememberMe"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent focus:ring-2 focus:ring-accent"
                id="remember-me"
                aria-label={t.login.rememberMe}
              />
            </FormControl>
            <FormLabel htmlFor="remember-me" className="text-sm font-medium leading-none cursor-pointer">
              {t.login.rememberMe}
            </FormLabel>
          </FormItem>
        )}
      />
      <Link
        to="/forgot-password"
        className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
      >
        {t.login.password.forgot}
      </Link>
    </div>
  );
};
