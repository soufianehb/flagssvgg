
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
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const emailFormSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required to change email"),
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;
type EmailFormValues = z.infer<typeof emailFormSchema>;

export function SecuritySettings() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      newEmail: "",
      password: "",
    },
  });

  async function onPasswordSubmit(data: PasswordFormValues) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Your password has been updated successfully.",
      });
      
      passwordForm.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update password. Please try again.",
      });
    }
  }

  async function onEmailSubmit(data: EmailFormValues) {
    try {
      setIsChangingEmail(true);
      
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: data.password,
      });

      if (signInError) throw new Error("Current password is incorrect");

      // If password is correct, proceed with email update
      const { error: updateError } = await supabase.auth.updateUser({
        email: data.newEmail,
      });

      if (updateError) throw updateError;
      
      toast({
        title: "Email Update Initiated",
        description: "Please check your new email address for a confirmation link.",
      });
      
      emailForm.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update email. Please try again.",
      });
    } finally {
      setIsChangingEmail(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Email Change Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Email Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your email address. A confirmation will be sent to the new address.
          </p>
        </div>

        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter new email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={emailForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Enter your current password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isChangingEmail}
              className="w-full"
            >
              {isChangingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Email...
                </>
              ) : (
                'Update Email'
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Password Change Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </div>

        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={passwordForm.formState.isSubmitting}
              className="w-full"
            >
              {passwordForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
