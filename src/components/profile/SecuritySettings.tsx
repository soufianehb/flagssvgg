
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
import { useState, useEffect } from "react";

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
  const [currentEmail, setCurrentEmail] = useState(user?.email || '');
  const [isSyncingProfile, setSyncingProfile] = useState(false);
  const [emailUpdateStatus, setEmailUpdateStatus] = useState<'idle' | 'pending' | 'confirming' | 'updating_profile'>('idle');

  const updateProfileEmail = async (newEmail: string) => {
    if (!user?.id) return;
    
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        setSyncingProfile(true);
        console.log('Updating profile email:', newEmail);
        
        const { error } = await supabase
          .from('profiles')
          .update({ email: newEmail })
          .eq('user_id', user.id);

        if (error) throw error;

        console.log('Profile email updated successfully');
        toast({
          title: t('settings.security.email.success.title'),
          description: t('settings.security.email.success.profileUpdate'),
        });
        return true;
      } catch (error: any) {
        console.error('Error updating profile email (attempt ${retryCount + 1}):', error);
        retryCount++;
        
        if (retryCount === maxRetries) {
          toast({
            variant: "destructive",
            title: t('settings.security.email.error.title'),
            description: t('settings.security.email.error.profileUpdate'),
          });
          return false;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      } finally {
        if (retryCount === maxRetries - 1) {
          setSyncingProfile(false);
        }
      }
    }
  };

  useEffect(() => {
    if (user?.email) {
      setCurrentEmail(user.email);
    }
  }, [user?.email]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change event:', event);
      
      if (event === 'EMAIL_CHANGE_CONFIRM') {
        console.log('Email change confirmed:', session?.user.email);
        setEmailUpdateStatus('updating_profile');
        
        if (session?.user.email) {
          setCurrentEmail(session.user.email);
          await updateProfileEmail(session.user.email);
        }
        
        setEmailUpdateStatus('idle');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        title: t('settings.security.password.success.title'),
        description: t('settings.security.password.success.message'),
      });
      
      passwordForm.reset();
    } catch (error: any) {
      console.error('Password update error:', error);
      toast({
        variant: "destructive",
        title: t('settings.security.password.error.title'),
        description: error.message || t('settings.security.password.error.message'),
      });
    }
  }

  async function onEmailSubmit(data: EmailFormValues) {
    try {
      setIsChangingEmail(true);
      setEmailUpdateStatus('pending');
      console.log('Starting email change process');
      
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: data.password,
      });

      if (signInError) {
        console.error('Password verification failed:', signInError);
        throw new Error(t('settings.security.email.error.invalidPassword'));
      }

      console.log('Password verified, proceeding with email update');
      setEmailUpdateStatus('confirming');

      // If password is correct, proceed with email update
      const { error: updateError } = await supabase.auth.updateUser({
        email: data.newEmail,
      });

      if (updateError) {
        console.error('Email update error:', updateError);
        throw updateError;
      }
      
      toast({
        title: t('settings.security.email.success.title'),
        description: t('settings.security.email.success.confirmation'),
      });
      
      emailForm.reset();
    } catch (error: any) {
      console.error('Email change error:', error);
      toast({
        variant: "destructive",
        title: t('settings.security.email.error.title'),
        description: error.message || t('settings.security.email.error.message'),
      });
      setEmailUpdateStatus('idle');
    } finally {
      setIsChangingEmail(false);
    }
  }

  const getEmailButtonText = () => {
    switch (emailUpdateStatus) {
      case 'pending':
        return t('settings.security.email.updating');
      case 'confirming':
        return t('settings.security.email.confirming');
      case 'updating_profile':
        return t('settings.security.email.updatingProfile');
      default:
        return t('settings.security.email.updateButton');
    }
  };

  return (
    <div className="space-y-10">
      {/* Email Change Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{t('settings.security.email.title')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('settings.security.email.description')}
          </p>
          <p className="text-sm mt-2">
            {t('settings.security.email.current')}: <span className="font-medium">{currentEmail}</span>
            {isSyncingProfile && (
              <span className="ml-2 text-muted-foreground">
                ({t('settings.security.email.synchronizing')})
              </span>
            )}
          </p>
        </div>

        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.security.email.newEmail')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder={t('settings.security.email.newEmailPlaceholder')} />
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
                  <FormLabel>{t('settings.security.email.currentPassword')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder={t('settings.security.email.passwordPlaceholder')} />
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

      {/* Password Change Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{t('settings.security.password.title')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('settings.security.password.description')}
          </p>
        </div>

        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.security.password.currentPassword')}</FormLabel>
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
                  <FormLabel>{t('settings.security.password.newPassword')}</FormLabel>
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
                  <FormLabel>{t('settings.security.password.confirmPassword')}</FormLabel>
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
                  {t('settings.security.password.updating')}
                </>
              ) : (
                t('settings.security.password.updateButton')
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
