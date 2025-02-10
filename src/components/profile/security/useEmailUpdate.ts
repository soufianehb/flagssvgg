import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/lib/i18n";
import type { EmailFormValues, EmailUpdateStatus } from "./types";
import type { AuthChangeEvent } from '@supabase/supabase-js';

export const useEmailUpdate = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [isSyncingProfile, setSyncingProfile] = useState(false);
  const [emailUpdateStatus, setEmailUpdateStatus] = useState<EmailUpdateStatus>('idle');
  const [lastEmailAttempt, setLastEmailAttempt] = useState<Date | null>(null);

  // Initialize and update current email when user changes
  useEffect(() => {
    if (user?.email) {
      setCurrentEmail(user.email);
    }
  }, [user?.email]);

  // Listen for email change confirmation
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session) => {
      console.log('Auth state change event:', event);
      
      if (event === 'EMAIL_CHANGE_CONFIRM') {
        console.log('Email change confirmed:', session?.user.email);
        setEmailUpdateStatus('updating_profile');
        
        if (session?.user.email) {
          setCurrentEmail(session.user.email);
          await handleProfileUpdate(session.user.email);
        }
        
        setEmailUpdateStatus('idle');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleProfileUpdate = async (newEmail: string) => {
    if (!user?.id) return;
    
    setSyncingProfile(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ email: newEmail })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: t.profile.settings.security.email.success.title,
        description: t.profile.settings.security.email.success.message,
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        variant: "destructive",
        title: t.profile.settings.security.email.error.title,
        description: t.profile.settings.security.email.error.message,
      });
    } finally {
      setSyncingProfile(false);
    }
  };

  const validateEmailChange = (newEmail: string): boolean => {
    if (lastEmailAttempt) {
      const timeSinceLastAttempt = new Date().getTime() - lastEmailAttempt.getTime();
      if (timeSinceLastAttempt < 60000) { // 1 minute
        toast({
          variant: "destructive",
          title: t.profile.settings.security.email.error.title,
          description: t.profile.settings.security.email.error.rateLimited,
        });
        return false;
      }
    }

    if (newEmail === currentEmail) {
      toast({
        variant: "destructive",
        title: t.profile.settings.security.email.error.title,
        description: t.profile.settings.security.email.error.sameEmail,
      });
      return false;
    }

    return true;
  };

  const verifyCurrentPassword = async (password: string): Promise<boolean> => {
    if (!currentEmail) {
      console.error('No current email available for verification');
      return false;
    }

    try {
      console.log('Attempting to verify password for email:', currentEmail);
      const { error } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: password,
      });

      if (error) {
        console.error('Password verification error:', error);
        if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: t.profile.settings.security.email.error.title,
            description: t.profile.settings.security.email.error.invalidPassword,
          });
          return false;
        }
        throw error;
      }

      console.log('Password verification successful');
      return true;
    } catch (error) {
      console.error('Password verification error:', error);
      toast({
        variant: "destructive",
        title: t.profile.settings.security.email.error.title,
        description: t.profile.settings.security.email.error.message,
      });
      return false;
    }
  };

  const handleEmailUpdate = async (data: EmailFormValues) => {
    console.log('Starting email update process');
    try {
      if (!validateEmailChange(data.newEmail)) {
        return false;
      }

      setIsChangingEmail(true);
      setEmailUpdateStatus('pending');
      setLastEmailAttempt(new Date());

      // First verify the current password
      const isPasswordValid = await verifyCurrentPassword(data.password);
      if (!isPasswordValid) {
        setEmailUpdateStatus('idle');
        return false;
      }

      // If password verification succeeds, proceed with email update
      setEmailUpdateStatus('confirming');
      console.log('Attempting to update email to:', data.newEmail);

      const { error: updateError } = await supabase.auth.updateUser({
        email: data.newEmail,
      });

      if (updateError) {
        console.error('Email update error:', updateError);
        toast({
          variant: "destructive",
          title: t.profile.settings.security.email.error.title,
          description: updateError.message || t.profile.settings.security.email.error.message,
        });
        setEmailUpdateStatus('idle');
        return false;
      }
      
      toast({
        title: t.profile.settings.security.email.success.title,
        description: t.profile.settings.security.email.success.confirmationEmail,
      });
      
      return true;
    } catch (error: any) {
      console.error('Email change error:', error);
      toast({
        variant: "destructive",
        title: t.profile.settings.security.email.error.title,
        description: error.message || t.profile.settings.security.email.error.message,
      });
      setEmailUpdateStatus('idle');
      return false;
    } finally {
      setIsChangingEmail(false);
    }
  };

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

  return {
    currentEmail,
    isSyncingProfile,
    isChangingEmail,
    emailUpdateStatus,
    handleEmailUpdate,
    getEmailButtonText,
  };
};
