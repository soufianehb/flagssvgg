
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { NameModificationDialog } from "../dialogs/NameModificationDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const personalFormSchema = z.object({
  title: z.enum(["mr", "mrs"]).optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type PersonalFormValues = z.infer<typeof personalFormSchema>;

const fetchPersonalData = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('title, first_name, last_name, email')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export function PersonalInfoSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      title: undefined,
      firstName: "",
      lastName: "",
      email: user?.email || "",
    },
  });

  const { data: profileData } = useQuery({
    queryKey: ['profile-personal', user?.id],
    queryFn: () => fetchPersonalData(user?.id as string),
    enabled: !!user?.id,
    meta: {
      onSuccess: (data: any) => {
        if (data) {
          const title = data.title?.toLowerCase() as "mr" | "mrs" | undefined;
          const validTitle = title === "mr" || title === "mrs" ? title : undefined;
          
          form.reset({
            title: validTitle,
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || user?.email || "",
          });
        }
      }
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: PersonalFormValues) => {
      if (!user?.id) throw new Error("User not authenticated");

      const updateData = {
        title: data.title,
        first_name: data.firstName,
        last_name: data.lastName,
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
      queryClient.invalidateQueries({ queryKey: ['profile-personal'] });
      toast({
        title: t.profile.general.success.title,
        description: t.profile.general.success.nameUpdated,
      });
    },
    onError: (error: Error) => {
      console.error('Error updating personal info:', error);
      toast({
        variant: "destructive",
        title: t.profile.general.errors.updateFailed,
        description: error.message || t.profile.general.errors.tryAgain,
      });
    },
  });

  const handleNameUpdate = (title: "mr" | "mrs", firstName: string, lastName: string) => {
    form.setValue('title', title);
    form.setValue('firstName', firstName);
    form.setValue('lastName', lastName);
  };

  return (
    <div className="space-y-8 pb-12 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{t.profile.general.sections.personal}</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-5 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>{t.profile.general.fields.title}</FormLabel>
                    <Select 
                      value={field.value ?? ''} 
                      onValueChange={(value: "mr" | "mrs") => field.onChange(value)}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder={t.profile.general.placeholders.chooseTitle} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">{t.profile.general.titles.mr}</SelectItem>
                        <SelectItem value="mrs">{t.profile.general.titles.mrs}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>{t.signup.labels.firstName}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>{t.signup.labels.lastName}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <NameModificationDialog
                initialTitle={form.getValues('title')}
                initialFirstName={form.getValues('firstName')}
                initialLastName={form.getValues('lastName')}
                userId={user?.id || ''}
                onUpdate={handleNameUpdate}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.email}</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" readOnly className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button 
                type="button"
                className="w-full font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
                onClick={() => navigate('/profile/security')}
              >
                {t.profile.general.fields.modifyEmail}
              </Button>
            </div>
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
