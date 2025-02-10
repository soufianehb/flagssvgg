
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/lib/i18n";
import { PhoneNumberField } from "./contact/PhoneNumberField";
import { WhatsAppPreferences } from "./contact/WhatsAppPreferences";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ContactInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updateContactMutation = useMutation({
    mutationFn: async (data: Partial<GeneralFormValues>) => {
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
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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
    e.preventDefault(); // Prevent form submission and scroll
    e.stopPropagation(); // Stop event bubbling
    
    const contactData = {
      phoneNumber: form.getValues('phoneNumber'),
      phoneCode: form.getValues('phoneCode'),
      businessPhone: form.getValues('businessPhone'),
      businessPhoneCode: form.getValues('businessPhoneCode'),
      allow_whatsapp_contact: form.getValues('allow_whatsapp_contact'),
      allow_whatsapp_business_contact: form.getValues('allow_whatsapp_business_contact'),
    };
    updateContactMutation.mutate(contactData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Phone Numbers Section */}
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

        {/* WhatsApp Preferences */}
        <WhatsAppPreferences form={form} />

        {/* Update Contact Button */}
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
  );
}
