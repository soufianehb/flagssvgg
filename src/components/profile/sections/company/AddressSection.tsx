
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { GeneralFormValues } from "../../types/profile";
import { CountrySelect } from "@/components/filters/selects/CountrySelect";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddressSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function AddressSection({ form }: AddressSectionProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateAddress = async () => {
    if (!user?.id) return;

    // Validate required fields
    const address = form.getValues('address');
    const city = form.getValues('city');
    const country = form.getValues('country');
    const zipCode = form.getValues('zip_code');

    if (!address || !city || !country || !zipCode) {
      toast({
        variant: "destructive",
        title: t.profile.general.errors.requiredFields,
        description: t.profile.general.errors.addressFieldsRequired,
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          address: form.getValues('address'),
          city: form.getValues('city'),
          country: form.getValues('country'),
          zip_code: form.getValues('zip_code'),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: t.profile.general.success.title,
        description: t.profile.general.success.addressUpdated,
      });
    } catch (error: any) {
      console.error('Error updating address:', error);
      toast({
        variant: "destructive",
        title: t.profile.general.errors.addressUpdateFailed,
        description: error.message || t.profile.general.errors.tryAgain,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.profile.general.fields.address}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
        <div className="w-full md:w-[122px]">
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.zipCode}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full md:w-[267px]">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.city}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full md:w-[267px]">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.country}</FormLabel>
                <FormControl>
                  <CountrySelect
                    value={field.value}
                    onChange={field.onChange}
                    showLabel={false}
                    isPhoneSelect={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="button"
          onClick={handleUpdateAddress}
          disabled={isSaving}
          className="w-full mt-4 md:mt-0 md:w-[342px] font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary h-10"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.profile.general.actions.saving}
            </>
          ) : (
            t.profile.general.actions.updateAddress
          )}
        </Button>
      </div>
    </div>
  );
}
