
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { emailFormSchema, type EmailFormValues } from "./types";
import { useEmailUpdate } from "./useEmailUpdate";

export function EmailForm() {
  const { t } = useTranslation();
  const {
    currentEmail,
    isSyncingProfile,
    isChangingEmail,
    emailUpdateStatus,
    handleEmailUpdate,
    getEmailButtonText,
  } = useEmailUpdate();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      newEmail: "",
      password: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    const success = await handleEmailUpdate(data);
    if (success) {
      form.reset();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.profile.settings.security.email.title}</h3>
        <p className="text-sm text-muted-foreground">
          {t.profile.settings.security.email.description}
        </p>
        <p className="text-sm mt-2">
          {t.profile.settings.security.email.current}: <span className="font-medium">{currentEmail}</span>
          {isSyncingProfile && (
            <span className="ml-2 text-muted-foreground">
              ({t.profile.settings.security.email.synchronizing})
            </span>
          )}
        </p>
      </div>

      {emailUpdateStatus === 'confirming' && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Confirmation Required</AlertTitle>
          <AlertDescription>
            Please check your new email address for a confirmation link. Click the link to complete the email change.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.profile.settings.security.email.newEmail}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email" 
                    placeholder={t.profile.settings.security.email.newEmailPlaceholder}
                    disabled={emailUpdateStatus === 'confirming'} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.profile.settings.security.email.currentPassword}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="password" 
                    placeholder={t.profile.settings.security.email.passwordPlaceholder}
                    disabled={emailUpdateStatus === 'confirming'} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isChangingEmail || emailUpdateStatus !== 'idle'}
            className="w-full"
          >
            {isChangingEmail && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {getEmailButtonText()}
          </Button>
        </form>
      </Form>
    </div>
  );
}
