import { useReducer, useCallback, useEffect } from "react";
import { signupReducer, initialState } from "@/reducers/signupReducer";
import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { createValidationSchemas } from "@/schemas/validation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const STORAGE_KEY = "signup_form_data";

export const useSignupState = (t: any) => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(signupReducer, initialState, () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  // Création des formulaires avec react-hook-form
  const personalForm = useForm({
    resolver: zodResolver(createValidationSchemas(t).personalInfo),
    defaultValues: state.personal
  });

  const professionalForm = useForm({
    resolver: zodResolver(createValidationSchemas(t).professionalInfo),
    defaultValues: state.professional
  });

  const securityForm = useForm({
    resolver: zodResolver(createValidationSchemas(t).security),
    defaultValues: state.security
  });

  // Persistence des données
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Gestionnaires de données personnelles
  const setPersonalData = useCallback((field: keyof PersonalData, value: string) => {
    dispatch({ type: "SET_PERSONAL_DATA", field, value });
    personalForm.setValue(field, value);
  }, [personalForm]);

  // Gestionnaires de données professionnelles
  const setProfessionalData = useCallback((field: keyof ProfessionalData, value: string) => {
    dispatch({ type: "SET_PROFESSIONAL_DATA", field, value });
    professionalForm.setValue(field, value);
  }, [professionalForm]);

  // Gestionnaires de données de sécurité
  const setSecurityData = useCallback((field: keyof SecurityData, value: string | boolean) => {
    dispatch({ type: "SET_SECURITY_DATA", field, value });
    securityForm.setValue(field as any, value);
  }, [securityForm]);

  // Validation des étapes
  const validatePersonalStep = useCallback(async () => {
    const result = await personalForm.trigger();
    if (!result) {
      toast({
        title: t?.validation?.error?.title || "Error",
        description: t?.validation?.error?.description || "Please check the form for errors",
        variant: "destructive"
      });
    }
    return result;
  }, [personalForm, t, toast]);

  const validateProfessionalStep = useCallback(async () => {
    const result = await professionalForm.trigger();
    if (!result) {
      toast({
        title: t?.validation?.error?.title || "Error",
        description: t?.validation?.error?.description || "Please check the form for errors",
        variant: "destructive"
      });
    }
    return result;
  }, [professionalForm, t, toast]);

  const validateSecurityStep = useCallback(async () => {
    const result = await securityForm.trigger();
    if (!result) {
      toast({
        title: t?.validation?.error?.title || "Error",
        description: t?.validation?.error?.description || "Please check the form for errors",
        variant: "destructive"
      });
    }
    return result;
  }, [securityForm, t, toast]);

  // Gestion de l'UI
  const setLoading = useCallback((value: boolean) => {
    dispatch({ type: "SET_LOADING", value });
  }, []);

  const setPasswordVisibility = useCallback((value: boolean) => {
    dispatch({ type: "SET_PASSWORD_VISIBILITY", value });
  }, []);

  const setConfirmPasswordVisibility = useCallback((value: boolean) => {
    dispatch({ type: "SET_CONFIRM_PASSWORD_VISIBILITY", value });
  }, []);

  const setPasswordStrength = useCallback((value: number) => {
    dispatch({ type: "SET_PASSWORD_STRENGTH", value });
  }, []);

  // Réinitialisation
  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    localStorage.removeItem(STORAGE_KEY);
    personalForm.reset();
    professionalForm.reset();
    securityForm.reset();
  }, [personalForm, professionalForm, securityForm]);

  const clearStep = useCallback((step: 'personal' | 'professional' | 'security') => {
    dispatch({ type: "CLEAR_STEP", step });
    localStorage.removeItem(`${STORAGE_KEY}_${step}`);
    switch (step) {
      case 'personal':
        personalForm.reset();
        break;
      case 'professional':
        professionalForm.reset();
        break;
      case 'security':
        securityForm.reset();
        break;
    }
  }, [personalForm, professionalForm, securityForm]);

  return {
    state,
    personalForm,
    professionalForm,
    securityForm,
    setPersonalData,
    setProfessionalData,
    setSecurityData,
    setLoading,
    setPasswordVisibility,
    setConfirmPasswordVisibility,
    setPasswordStrength,
    validatePersonalStep,
    validateProfessionalStep,
    validateSecurityStep,
    resetForm,
    clearStep
  };
};