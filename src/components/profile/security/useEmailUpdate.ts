
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/lib/i18n";
import type { EmailFormValues, EmailUpdateStatus } from "./types";
import { verifyPassword, updateUserEmail } from "./utils/emailValidation";
import { updateProfileEmail } from "./utils/profileSync";

export const useEmailUpdate = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(user?.email || '');
  const [isSyncingProfile, setSyncingProfile] = useState(false);
  const [emailUpdateStatus, setEmailUpdateStatus] = useState<EmailUpdateStatus>('idle');

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
          handleProfileUpdate(session.user.email);
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
    const { error, success } = await updateProfileEmail(user.id, newEmail);
    
    if (success) {
      toast({
        title: t.profile.settings.security.email.success.title,
        description: t.profile.settings.security.email.success.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: t.profile.settings.security.email.error.title,
        description: t.profile.settings.security.email.error.message,
      });
    }
    
    setSyncingProfile(false);
  };

  const handleEmailUpdate = async (data: EmailFormValues) => {
    try {
      setIsChangingEmail(true);
      setEmailUpdateStatus('pending');
      console.log('Starting email change process');
      
      const { error: signInError } = await verifyPassword(currentEmail, data.password);

      if (signInError) {
        console.error('Password verification failed:', signInError);
        throw new Error(t.profile.settings.security.email.error.invalidPassword);
      }

      console.log('Password verified, proceeding with email update');
      setEmailUpdateStatus('confirming');

      const { error: updateError } = await updateUserEmail(data.newEmail);

      if (updateError) {
        console.error('Email update error:', updateError);
        throw updateError;
      }
      
      toast({
        title: t.profile.settings.security.email.success.title,
        description: t.profile.settings.security.email.confirmationEmail,
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
