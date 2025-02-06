import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { PersonalInfoFields } from "./form-sections/PersonalInfoFields";
import { ContactInfoFields } from "./form-sections/ContactInfoFields";
import { CompanyInfoFields } from "./form-sections/CompanyInfoFields";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { toast } from "@/components/ui/use-toast";
import { signupSchema } from "./validation/signupSchema";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      phoneNumber: "",
      businessPhone: "",
      phoneCode: "",
      businessPhoneCode: "",
      companyName: "",
      tradeRegisterNumber: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // Create the user metadata object with all fields
      const userMetadata = {
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        zip_code: data.zipCode,
        city: data.city,
        country: data.country,
        company_name: data.companyName,
        phone_number: data.phoneNumber,
        business_phone: data.businessPhone,
        phone_code: data.phoneCode,
        business_phone_code: data.businessPhoneCode,
        trade_register_number: data.tradeRegisterNumber,
      };

      await signup(data.email, data.password, userMetadata);
      
      toast({
        title: t.signup.messages.success.title,
        description: t.signup.messages.success.description,
      });

      // Redirect to dashboard or home after successful signup
      navigate("/");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm space-y-4">
          <PersonalInfoFields form={form} />
          <ContactInfoFields form={form} />
          <CompanyInfoFields form={form} />
        </div>

        <div>
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
        </div>
      </form>
    </Form>
  );
};