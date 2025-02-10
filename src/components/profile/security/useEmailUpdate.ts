
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/lib/i18n";
import type { EmailFormValues, EmailUpdateStatus } from "./types";

export const useEmailUpdate = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(user?.email || '');
  const [isSyncingProfile, setSyncingProfile] = useState(false);
  const [emailUpdateStatus, setEmailUpdateStatus] = useState<EmailUpdateStatus>('idle');
  const [lastEmailAttempt, setLastEmailAttempt] = useState<Date | null>(null);

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
    if (!currentEmail) return false;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: password,
      });

      if (error) {
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

      return true;
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  };

  const handleEmailUpdate = async (data: EmailFormValues) => {
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
