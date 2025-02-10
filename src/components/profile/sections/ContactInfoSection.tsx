
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: form.getValues('phoneNumber'),
          business_phone: form.getValues('businessPhone'),
          metadata: {
            ...form.getValues('metadata'),
            contactPreferences: {
              whatsappContact: form.getValues('metadata.contactPreferences.whatsappContact'),
              whatsappBusinessContact: form.getValues('metadata.contactPreferences.whatsappBusinessContact')
            }
          },
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact preferences updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating contact preferences:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update contact preferences",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.phoneNumber}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.businessPhone}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="metadata.contactPreferences.whatsappContact"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>WhatsApp Contact</FormLabel>
                <FormMessage />
                <div className="text-sm text-muted-foreground">
                  Allow contact through WhatsApp
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadata.contactPreferences.whatsappBusinessContact"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>WhatsApp Business Contact</FormLabel>
                <FormMessage />
                <div className="text-sm text-muted-foreground">
                  Allow contact through WhatsApp Business
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Button
        type="button"
        onClick={handleUpdateContactPreferences}
        disabled={isSaving}
        className="w-full mt-4 md:mt-0 font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary h-10"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Update Contact Preferences'
        )}
      </Button>
    </div>
  );
}
