
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../types/profile";
import { useTranslation } from "@/contexts/TranslationContext";
import { useNavigate } from "react-router-dom";

interface PersonalInfoSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{t.profile.general.sections.personal}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="md:col-span-1">
              <FormLabel>{t.profile.general.fields.title}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mr">Mr</SelectItem>
                  <SelectItem value="mrs">Mrs</SelectItem>
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
            <FormItem className="md:col-span-3">
              <FormLabel>{t.signup.labels.lastName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4 items-start">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t.signup.labels.email}</FormLabel>
              <FormControl>
                <Input {...field} type="email" readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="button"
          variant="default"
          className="mt-8 bg-primary hover:bg-accent"
          onClick={() => navigate('/profile/security')}
        >
          {t.profile.general.fields.modifyEmail}
        </Button>
      </div>
    </div>
  );
}
