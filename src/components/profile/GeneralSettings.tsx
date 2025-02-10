
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useCallback, memo } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { generalFormSchema, GeneralFormValues } from "./types/profile";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { CompanyInfoSection } from "./sections/CompanyInfoSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Memoize form sections
const MemoizedPersonalInfoSection = memo(PersonalInfoSection);
const MemoizedCompanyInfoSection = memo(CompanyInfoSection);
const MemoizedContactInfoSection = memo(ContactInfoSection);

const fetchProfileData = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export function GeneralSettings() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      company_name: "",
      address: "",
      city: "",
      country: "",
      zip_code: "",
      trade_register_number: "",
    },
  });

  // Use react-query for data fetching
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfileData(user?.id as string),
    enabled: !!user?.id,
  });

  // Update form when profile data is fetched
  useEffect(() => {
    if (profileData) {
      const title = profileData.title?.toLowerCase() as "mr" | "mrs" | undefined;
      const validTitle = title === "mr" || title === "mrs" ? title : undefined;

      form.reset({
        title: validTitle,
        firstName: profileData.first_name || "",
        lastName: profileData.last_name || "",
        email: profileData.email || user?.email || "",
        company_name: profileData.company_name || "",
        address: profileData.address || "",
        city: profileData.city || "",
        country: profileData.country || "",
        zip_code: profileData.zip_code || "",
        trade_register_number: profileData.trade_register_number || "",
      });
    }
  }, [profileData, user?.email, form]);

  // Use react-query for mutations
  const mutation = useMutation({
    mutationFn: async (data: GeneralFormValues) => {
      if (!user?.id) throw new Error("User not authenticated");

      const updateData = {
        first_name: data.firstName,
        last_name: data.lastName,
        title: data.title,
        company_name: data.company_name,
        address: data.address,
        city: data.city,
        country: data.country,
        zip_code: data.zip_code,
        trade_register_number: data.trade_register_number,
        is_profile_complete: true,
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
        description: t.profile.general.success.nameUpdated,
      });
    },
    onError: (error: Error) => {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: t.profile.general.errors.updateFailed,
        description: error.message || t.profile.general.errors.tryAgain,
      });
    },
  });

  const onSubmit = useCallback(async (data: GeneralFormValues) => {
    mutation.mutate(data);
  }, [mutation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MemoizedContactInfoSection />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <MemoizedPersonalInfoSection form={form} />
            <MemoizedCompanyInfoSection form={form} />
          </div>

          <Button 
            type="submit" 
            disabled={mutation.isPending || !form.formState.isDirty}
            className="w-full"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.profile.general.actions.saving}
              </>
            ) : (
              t.profile.general.actions.save
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
