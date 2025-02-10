
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/contexts/TranslationContext";
import { useNavigate } from "react-router-dom";
import { NameModificationDialog } from "../dialogs/NameModificationDialog";
import { useAuth } from "@/contexts/AuthContext";

interface PersonalInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNameUpdate = (title: "mr" | "mrs", firstName: string, lastName: string) => {
    form.setValue('title', title);
    form.setValue('firstName', firstName);
    form.setValue('lastName', lastName);
  };

  return (
    <div className="space-y-8 pb-12 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{t.profile.general.sections.personal}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>{t.profile.general.fields.title}</FormLabel>
                <Select 
                  value={field.value || ''} 
                  onValueChange={(value: "mr" | "mrs") => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.profile.general.fields.title} />
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
        <div className="md:col-span-1 flex items-end">
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
        <div className="md:col-span-5">
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
        <div className="md:col-span-1 flex items-end">
          <Button 
            type="button"
            className="w-full font-open-sans transition-all duration-300 bg-accent text-white hover:bg-primary active:bg-primary/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            onClick={() => navigate('/profile/security')}
          >
            {t.profile.general.fields.modifyEmail}
          </Button>
        </div>
      </div>
    </div>
  );
}

