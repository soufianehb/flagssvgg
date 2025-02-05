
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

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();

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
      const personalData = {
        firstName: data.firstName,
        lastName: data.lastName,
      };

      const professionalData = {
        address: data.address,
        zipCode: data.zipCode,
        city: data.city,
        country: data.country,
        companyName: data.companyName,
        phoneNumber: data.phoneNumber,
        businessPhone: data.businessPhone,
        phoneCode: data.phoneCode,
        businessPhoneCode: data.businessPhoneCode,
        tradeRegisterNumber: data.tradeRegisterNumber,
      };

      await signup(data.email, data.password, personalData, professionalData);
      
      toast({
        title: t.signup.messages.success.title,
        description: t.signup.messages.success.description,
      });
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
            className="w-full bg-accent hover:bg-accent/90 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t.signup.buttons.loading : t.signup.buttons.submit}
          </Button>
        </div>
      </form>
    </Form>
  );
};
