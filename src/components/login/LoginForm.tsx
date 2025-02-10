
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogIn } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/schemas/validation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PasswordField } from "./PasswordField";
import { EmailField } from "./EmailField";
import { RememberMeField } from "./RememberMeField";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log("Login attempt started with email:", values.email);
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      console.log("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      let errorTitle = t.login.error;
      let errorMessage = t.login.errorMessage;
      
      if (error.message === 'email_not_confirmed') {
        errorTitle = t.login.emailNotConfirmed.title;
        errorMessage = t.login.emailNotConfirmed.message;
      } else if (error.message?.includes('Invalid login credentials') || 
                 error.message?.includes('invalid_credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      }
      
      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorMessage,
      });
      
      form.setValue('password', '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmailField />
        <PasswordField />
        <RememberMeField />

        <Button
          type="submit"
          className="w-full flex justify-center items-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          disabled={isLoading}
          aria-label={isLoading ? t.login.loading : t.login.submit}
        >
          <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
          {isLoading ? (
            <span className="animate-pulse">{t.login.loading}</span>
          ) : (
            t.login.submit
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
