
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { toast } from "@/components/ui/use-toast";
import { signupSchema } from "./validation/signupSchema";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type SignupFormValues = z.infer<typeof signupSchema>;

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

export const SignupForm = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(true);

  // Detect user's country based on their IP
  const detectUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_name;
    } catch (error) {
      console.error('Error detecting country:', error);
      return null;
    }
  };

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const country = await detectUserCountry();
      
      const profileData = {
        first_name: data.firstName,
        last_name: data.lastName,
        company_name: data.companyName,
        email: data.email,
        is_profile_complete: false,
        status: 'pending',
        country: country || undefined,
        metadata: {}
      };

      await signup(data.email, data.password, profileData);
      
      toast({
        title: t.signup.messages.success.title,
        description: t.signup.messages.success.description,
      });

      navigate("/login");
    } catch (error: any) {
      console.error('Signup error:', error);
      
      toast({
        variant: "destructive",
        title: t.signup.messages.error.title,
        description: error.message || t.signup.messages.error.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.firstName}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.signup.placeholders.firstName} {...field} />
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.companyName}</FormLabel>
                <FormControl>
                  <Input placeholder={t.signup.placeholders.companyName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <div className="relative">
                  <FormControl>
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder={t.signup.placeholders.password} 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setPasswordStrength(calculatePasswordStrength(e.target.value));
                      }}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  <Progress value={passwordStrength} className={`h-1 ${getPasswordStrengthColor(passwordStrength)}`} />
                  <p className="text-sm text-gray-600">
                    {t.signup.validation.password.strength} {passwordStrength}%
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.signup.buttons.loading}
            </>
          ) : (
            t.signup.buttons.submit
          )}
        </Button>
      </form>
    </Form>
  );
};
