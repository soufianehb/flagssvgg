import { useState, useEffect, useCallback, memo } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/contexts/TranslationContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { WhatsAppPreferences } from "./sections/contact/WhatsAppPreferences";
import { PhoneNumberField } from "./sections/contact/PhoneNumberField";
import { z } from "zod";

const formSchema = z.object({
  phoneCode: z.string(),
  phoneNumber: z.string(),
  businessPhoneCode: z.string(),
  businessPhone: z.string(),
  allow_whatsapp_contact: z.boolean(),
  allow_whatsapp_business_contact: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const GeneralSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneCode: "",
      phoneNumber: "",
      businessPhoneCode: "",
      businessPhone: "",
      allow_whatsapp_contact: false,
      allow_whatsapp_business_contact: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Handle form submission
      console.log(data);
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <PhoneNumberField
            form={form}
            type="personal"
            label={t.profile.general.fields.phoneNumber}
          />
          <PhoneNumberField
            form={form}
            type="business"
            label={t.profile.general.fields.businessPhone}
          />
          <WhatsAppPreferences form={form} />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? t.common.saving : t.common.save}
        </Button>
      </form>
    </Form>
  );
};

export { GeneralSettings };
