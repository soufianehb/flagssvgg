import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PersonalData } from "@/types/signup";
import * as z from "zod";
import { useEffect } from "react";

interface PersonalInfoStepProps {
  form: UseFormReturn<any>;
  t: any;
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
}

const formSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide")
});

const PersonalInfoStep = ({ form, t, data, onChange }: PersonalInfoStepProps) => {
  // Effet pour valider les champs en temps réel
  useEffect(() => {
    const validateField = (field: keyof PersonalData) => {
      try {
        formSchema.shape[field].parse(data[field]);
        form.clearErrors(field);
      } catch (error) {
        // Ne rien faire si la validation échoue
      }
    };

    validateField('firstName');
    validateField('lastName');
    validateField('email');
  }, [data, form]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          rules={{
            required: t.signup.validation.required,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.firstName}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={data.firstName}
                  onChange={(e) => onChange('firstName', e.target.value)}
                  placeholder={t.signup.placeholders.firstName}
                  className={form.formState.errors.firstName ? "border-red-500" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          rules={{
            required: t.signup.validation.required,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.signup.labels.lastName}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={data.lastName}
                  onChange={(e) => onChange('lastName', e.target.value)}
                  placeholder={t.signup.placeholders.lastName}
                  className={form.formState.errors.lastName ? "border-red-500" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        rules={{
          required: t.signup.validation.required,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t.signup.validation.email
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.signup.labels.email}</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  {...field} 
                  value={data.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  type="email" 
                  className={`pl-10 ${form.formState.errors.email ? "border-red-500" : ""}`}
                  placeholder={t.signup.placeholders.email} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoStep;