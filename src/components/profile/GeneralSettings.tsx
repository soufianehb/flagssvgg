
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const generalFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  phoneCode: z.string().optional(),
  businessPhone: z.string().optional(),
  businessPhoneCode: z.string().optional(),
  company_name: z.string().min(1, "Company name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zip_code: z.string().optional(),
  trade_register_number: z.string().optional(),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

export function GeneralSettings() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phoneNumber: "",
      phoneCode: "",
      businessPhone: "",
      businessPhoneCode: "",
      company_name: "",
      address: "",
      city: "",
      country: "",
      zip_code: "",
      trade_register_number: "",
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user?.email) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          form.reset({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || user.email || "",
            phoneNumber: data.phone_number || "",
            phoneCode: data.phone_code || "",
            businessPhone: data.business_phone || "",
            businessPhoneCode: data.business_phone_code || "",
            company_name: data.company_name || "",
            address: data.address || "",
            city: data.city || "",
            country: data.country || "",
            zip_code: data.zip_code || "",
            trade_register_number: data.trade_register_number || "",
          });
          setProfileData(data);
        } else {
          toast({
            title: "Profile not found",
            description: "Please complete your profile information.",
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, form, toast]);

  async function onSubmit(data: GeneralFormValues) {
    try {
      setLoading(true);
      
      if (!user?.email) {
        throw new Error("User not authenticated");
      }

      const updateData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        phone_code: data.phoneCode,
        business_phone: data.businessPhone,
        business_phone_code: data.businessPhoneCode,
        company_name: data.company_name,
        address: data.address,
        city: data.city,
        country: data.country,
        zip_code: data.zip_code,
        trade_register_number: data.trade_register_number,
        is_profile_complete: true,
        updated_at: new Date().toISOString(),
        status: 'active',
      };

      let response;
      
      if (profileData?.id) {
        // Update existing profile
        response = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', profileData.id);
      } else {
        // Insert new profile
        response = await supabase
          .from('profiles')
          .insert({
            ...updateData,
            email: user.email,
            user_id: user.id,
          });
      }

      if (response.error) throw response.error;
      
      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.firstName}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.lastName}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.email}</FormLabel>
              <FormControl>
                <Input {...field} type="email" readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.companyName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.address}</FormLabel>
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.signup.labels.country}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="trade_register_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.tradeRegisterNumber}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </Form>
  );
}
