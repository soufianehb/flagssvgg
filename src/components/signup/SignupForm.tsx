
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { toast } from "@/components/ui/use-toast";
import { signupSchema } from "./validation/signupSchema";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoFields } from "./form-sections/PersonalInfoFields";

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();

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
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const country = await detectUserCountry();
      
      const profileData = {
        first_name: data.firstName,
        last_name: data.lastName,
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
        <PersonalInfoFields form={form} />

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
