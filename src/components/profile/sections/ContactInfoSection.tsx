
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/lib/i18n";
import { PhoneNumberField } from "./contact/PhoneNumberField";
import { WhatsAppPreferences } from "./contact/WhatsAppPreferences";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { contactFormSchema, type ContactFormValues } from "../types/profile";

export function ContactInfoSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phoneNumber: "",
      phoneCode: "",
      businessPhone: "",
      businessPhoneCode: "",
      allow_whatsapp_contact: false,
      allow_whatsapp_business_contact: false,
    },
  });

  const { data: contactData } = useQuery({
    queryKey: ['profile-contact', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      const { data, error } = await supabase
        .from('profiles')
        .select('phone_number, phone_code, business_phone, business_phone_code, allow_whatsapp_contact, allow_whatsapp_business_contact')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    meta: {
      onSuccess: (data: any) => {
        if (data) {
          form.reset({
            phoneNumber: data.phone_number || "",
            phoneCode: data.phone_code || "",
            businessPhone: data.business_phone || "",
            businessPhoneCode: data.business_phone_code || "",
            allow_whatsapp_contact: data.allow_whatsapp_contact || false,
            allow_whatsapp_business_contact: data.allow_whatsapp_business_contact || false,
          });
        }
      }
    }
  });

  const updateContactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      if (!user?.id) throw new Error("User not authenticated");

      const updateData = {
        phone_number: data.phoneNumber,
        phone_code: data.phoneCode,
        business_phone: data.businessPhone,
        business_phone_code: data.businessPhoneCode,
        allow_whatsapp_contact: data.allow_whatsapp_contact,
        allow_whatsapp_business_contact: data.allow_whatsapp_business_contact,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

      if (error) throw error;
      return updateData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-contact'] });
      toast({
        title: t.profile.general.success.title,
        description: t.profile.general.success.contactUpdated,
      });
    },
    onError: (error: Error) => {
      console.error('Error updating contact info:', error);
      toast({
        variant: "destructive",
        title: t.profile.general.errors.contactUpdateFailed,
        description: error.message || t.profile.general.errors.tryAgain,
      });
    },
  });

  const handleUpdateContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const contactData = form.getValues();
    updateContactMutation.mutate(contactData);
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:gap-6 gap-4">
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
          </div>

          <WhatsAppPreferences form={form} />

          <Button
            type="button"
            onClick={handleUpdateContact}
            disabled={updateContactMutation.isPending}
            className="w-full font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
          >
            {updateContactMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.profile.general.actions.saving}
              </>
            ) : (
              t.profile.general.actions.updateContact
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
}
