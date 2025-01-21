import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PersonalData } from "@/types/signup";

interface PersonalInfoStepProps {
  form: UseFormReturn<PersonalData>;
  t: any;
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
}

const PersonalInfoStep = ({ form, t, data, onChange }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.signup?.labels?.firstName || "First name"}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={data.firstName}
                  onChange={(e) => onChange('firstName', e.target.value)}
                  placeholder={t?.signup?.placeholders?.firstName || "Enter your first name"}
                />
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
              <FormLabel>{t?.signup?.labels?.lastName || "Last name"}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={data.lastName}
                  onChange={(e) => onChange('lastName', e.target.value)}
                  placeholder={t?.signup?.placeholders?.lastName || "Enter your last name"}
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t?.signup?.labels?.email || "Email"}</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  {...field} 
                  value={data.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  type="email" 
                  className="pl-10"
                  placeholder={t?.signup?.placeholders?.email || "Enter your email"} 
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