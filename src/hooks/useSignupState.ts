import { useReducer, useCallback } from "react";
import { signupReducer, initialState } from "@/reducers/signupReducer";
import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";
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

  const schemas = createValidationSchemas(t);

  const personalForm = useForm({
    resolver: zodResolver(schemas.personalInfo),
    defaultValues: state.personal
  });

  const professionalForm = useForm({
    resolver: zodResolver(schemas.professionalInfo),
    defaultValues: state.professional
  });

  const securityForm = useForm({
    resolver: zodResolver(schemas.security),
    defaultValues: state.security
  });

  const setPersonalData = useCallback((field: keyof PersonalData, value: string) => {
    dispatch({ type: "SET_PERSONAL_DATA", field, value });
    personalForm.setValue(field, value);
  }, [personalForm]);

  const setProfessionalData = useCallback((field: keyof ProfessionalData, value: string) => {
    dispatch({ type: "SET_PROFESSIONAL_DATA", field, value });
    professionalForm.setValue(field, value);
  }, [professionalForm]);

  const setSecurityData = useCallback((field: keyof SecurityData, value: string | boolean) => {
    dispatch({ type: "SET_SECURITY_DATA", field, value });
    securityForm.setValue(field as any, value);
  }, [securityForm]);

  const validateStep = useCallback(async (step: 'personal' | 'professional' | 'security') => {
    let isValid = false;
    
    switch (step) {
      case 'personal':
        isValid = await personalForm.trigger();
        break;
      case 'professional':
        isValid = await professionalForm.trigger();
        break;
      case 'security':
        isValid = await securityForm.trigger();
        break;
    }

    if (!isValid) {
      toast({
        title: t?.validation?.error?.title || "Validation Error",
        description: t?.validation?.error?.description || "Please check the form for errors",
        variant: "destructive"
      });
    }

    return isValid;
  }, [personalForm, professionalForm, securityForm, t, toast]);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    localStorage.removeItem(STORAGE_KEY);
    personalForm.reset();
    professionalForm.reset();
    securityForm.reset();
  }, [personalForm, professionalForm, securityForm]);

  return {
    state,
    personalForm,
    professionalForm,
    securityForm,
    setPersonalData,
    setProfessionalData,
    setSecurityData,
    validateStep,
    resetForm
  };
};