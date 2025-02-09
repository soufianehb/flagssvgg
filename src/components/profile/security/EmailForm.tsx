
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

const emailFormSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required to change email"),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export function EmailForm() {
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
          title: t.profile.settings.security.email.success.title,
          description: t.profile.settings.security.email.success.message,
        });
        return true;
      } catch (error: any) {
        console.error(`Error updating profile email (attempt ${retryCount + 1}):`, error);
        retryCount++;
        
        if (retryCount === maxRetries) {
          toast({
            variant: "destructive",
            title: t.profile.settings.security.email.error.title,
            description: t.profile.settings.security.email.error.message,
          });
          return false;
        }
        
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session) => {
      console.log('Auth state change event:', event);
      
      if (event === 'EMAIL_CHANGE_CONFIRM') {
        console.log('Email change confirmed:', session?.user.email);
        setEmailUpdateStatus('updating_profile');
        
        if (session?.user.email) {
          setCurrentEmail(session.user.email);
          updateProfileEmail(session.user.email);
        }
        
        setEmailUpdateStatus('idle');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      newEmail: "",
      password: "",
    },
  });

  async function onSubmit(data: EmailFormValues) {
    try {
      setIsChangingEmail(true);
      setEmailUpdateStatus('pending');
      console.log('Starting email change process');
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: data.password,
      });

      if (signInError) {
        console.error('Password verification failed:', signInError);
        throw new Error(t.profile.settings.security.email.error.invalidPassword);
      }

      console.log('Password verified, proceeding with email update');
      setEmailUpdateStatus('confirming');

      const { error: updateError } = await supabase.auth.updateUser({
        email: data.newEmail,
      });

      if (updateError) {
        console.error('Email update error:', updateError);
        throw updateError;
      }
      
      toast({
        title: t.profile.settings.security.email.success.title,
        description: t.profile.settings.security.email.success.confirmationEmail,
      });
      
      form.reset();
    } catch (error: any) {
      console.error('Email change error:', error);
      toast({
        variant: "destructive",
        title: t.profile.settings.security.email.error.title,
        description: error.message || t.profile.settings.security.email.error.message,
      });
      setEmailUpdateStatus('idle');
    } finally {
      setIsChangingEmail(false);
    }
  }

  const getEmailButtonText = () => {
    switch (emailUpdateStatus) {
      case 'pending':
        return t.profile.settings.security.email.status.pending;
      case 'confirming':
        return t.profile.settings.security.email.status.confirming;
      case 'updating_profile':
        return t.profile.settings.security.email.status.updatingProfile;
      default:
        return t.profile.settings.security.email.updateButton;
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.profile.settings.security.email.newEmail}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder={t.profile.settings.security.email.newEmailPlaceholder} />
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
                  <Input {...field} type="password" placeholder={t.profile.settings.security.email.passwordPlaceholder} />
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
