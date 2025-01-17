import { useReducer, useCallback, useEffect } from "react";
import { signupReducer, initialState } from "@/reducers/signupReducer";
import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { createValidationSchemas } from "@/schemas/validation";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "signup_form_data";

export const useSignupState = (t: any) => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(signupReducer, initialState, () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]);

  const setPersonalData = useCallback((field: keyof PersonalData, value: string) => {
    dispatch({ type: "SET_PERSONAL_DATA", field, value });
  }, []);

  const setProfessionalData = useCallback((field: keyof ProfessionalData, value: string) => {
    dispatch({ type: "SET_PROFESSIONAL_DATA", field, value });
  }, []);

  const setSecurityData = useCallback((field: keyof SecurityData, value: string | boolean) => {
    dispatch({ type: "SET_SECURITY_DATA", field, value });
  }, []);

  const validatePersonalStep = useCallback(() => {
    const schema = createValidationSchemas(t).personalInfo;
    try {
      schema.parse(state.personal);
      return { isValid: true, errors: {} };
    } catch (error: any) {
      const errors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      return { isValid: false, errors };
    }
  }, [state.personal, t]);

  const validateProfessionalStep = useCallback(() => {
    const schema = createValidationSchemas(t).professionalInfo;
    try {
      schema.parse(state.professional);
      
      // Validation supplémentaire pour les numéros de téléphone
      if (state.professional.phoneNumber && state.professional.country) {
        if (!isValidPhoneNumber(state.professional.phoneNumber, state.professional.country as CountryCode)) {
          return {
            isValid: false,
            errors: { phoneNumber: t.validation.phoneNumber.invalid }
          };
        }
      }

      if (state.professional.businessPhone && state.professional.country) {
        if (!isValidPhoneNumber(state.professional.businessPhone, state.professional.country as CountryCode)) {
          return {
            isValid: false,
            errors: { businessPhone: t.validation.businessPhone.invalid }
          };
        }
      }

      return { isValid: true, errors: {} };
    } catch (error: any) {
      const errors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      return { isValid: false, errors };
    }
  }, [state.professional, t]);

  const validateSecurityStep = useCallback(() => {
    const schema = createValidationSchemas(t).security;
    try {
      schema.parse(state.security);
      return { isValid: true, errors: {} };
    } catch (error: any) {
      const errors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      return { isValid: false, errors };
    }
  }, [state.security, t]);

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

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const clearStep = useCallback((step: 'personal' | 'professional' | 'security') => {
    dispatch({ type: "CLEAR_STEP", step });
    localStorage.removeItem(`${STORAGE_KEY}_${step}`);
  }, []);

  return {
    state,
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