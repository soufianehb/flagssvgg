
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PhoneNumberField } from "./contact/PhoneNumberField";
import { WhatsAppPreferences } from "./contact/WhatsAppPreferences";

interface ContactInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateContactPreferences = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      // Get the current metadata value
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('metadata')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      // Prepare the new metadata by preserving other metadata fields
      const newMetadata = {
        ...currentProfile.metadata,
        contactPreferences: {
          whatsappContact: form.getValues('metadata.contactPreferences.whatsappContact'),
          whatsappBusinessContact: form.getValues('metadata.contactPreferences.whatsappBusinessContact')
        }
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: form.getValues('phoneNumber'),
          phone_code: form.getValues('phoneCode'),
          business_phone: form.getValues('businessPhone'),
          business_phone_code: form.getValues('businessPhoneCode'),
          metadata: newMetadata,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: t.profile.general.success.title,
        description: t.profile.general.success.contactUpdated,
      });
    } catch (error: any) {
      console.error('Error updating contact preferences:', error);
      toast({
        variant: "destructive",
        title: t.profile.general.errors.contactUpdateFailed,
        description: error.message || t.profile.general.errors.tryAgain,
      });
    } finally {
      setIsSaving(false);
    }
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
      </div>

      {/* Submit Button */}
      <Button
        type="button"
        onClick={handleUpdateContactPreferences}
        disabled={isSaving}
        className="w-full mt-4 md:mt-0 font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary h-10"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.profile.general.actions.saving}
          </>
        ) : (
          t.profile.general.actions.updateContact
        )}
      </Button>
    </div>
  );
}
