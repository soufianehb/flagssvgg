
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
        title: "Success",
        description: "Address updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating address:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update address",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  onCountryCodeChange={(dialCode) => {
                    form.setValue("phoneCode", dialCode);
                    form.setValue("businessPhoneCode", dialCode);
                  }}
                  showLabel={false}
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
        className="w-full sm:w-auto"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Update Address'
        )}
      </Button>
    </div>
  );
}
