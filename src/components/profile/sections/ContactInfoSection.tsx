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
import { CountrySelect } from "@/components/filters/selects/CountrySelect";
import { useCountryCodes } from "@/hooks/useCountryCodes";

interface ContactInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const { data: countries } = useCountryCodes();

  const handleUpdateContactPreferences = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: form.getValues('phoneNumber'),
          phone_code: form.getValues('phoneCode'),
          business_phone: form.getValues('businessPhone'),
          business_phone_code: form.getValues('businessPhoneCode'),
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
        <div className="flex flex-col gap-4">
          {/* Personal Phone */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-end gap-2">
              <div className="w-[120px]">
                <FormField
                  control={form.control}
                  name="phoneCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <CountrySelect
                        value={field.value}
                        onValueChange={(newValue) => {
                          const selectedCountry = countries?.find(c => c.code === newValue);
                          if (selectedCountry) {
                            field.onChange(selectedCountry.dial_code);
                          }
                        }}
                        showLabel={false}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.profile.general.fields.phoneNumber}</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" className="h-12 w-full min-w-[250px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Business Phone */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-end gap-2">
              <div className="w-[120px]">
                <FormField
                  control={form.control}
                  name="businessPhoneCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <CountrySelect
                        value={field.value}
                        onValueChange={(newValue) => {
                          const selectedCountry = countries?.find(c => c.code === newValue);
                          if (selectedCountry) {
                            field.onChange(selectedCountry.dial_code);
                          }
                        }}
                        showLabel={false}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="businessPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.profile.general.fields.businessPhone}</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" className="h-12 w-full min-w-[250px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="metadata.contactPreferences.whatsappContact"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>{t.profile.general.fields.whatsappContact}</FormLabel>
                  <FormMessage />
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
                  <FormLabel>{t.profile.general.fields.whatsappBusinessContact}</FormLabel>
                  <FormMessage />
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
