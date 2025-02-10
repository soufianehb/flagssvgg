
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/contexts/TranslationContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { CompanyInfoSection } from "./sections/CompanyInfoSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
          <ContactInfoSection form={form} />
        </div>

        <Separator />
        
        <CompanyInfoSection form={form} />
      </form>
    </Form>
  );
};

export { GeneralSettings };
