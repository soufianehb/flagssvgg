import { useReducer, useCallback, useEffect } from "react";
import { signupReducer, initialState } from "@/reducers/signupReducer";
import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

const STORAGE_KEY = "signup_form_data";

export const useSignupState = () => {
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
    const errors: Record<string, string> = {};
    
    if (!state.personal.firstName?.trim()) {
      errors.firstName = 'Le prénom est requis';
    }
    
    if (!state.personal.lastName?.trim()) {
      errors.lastName = 'Le nom est requis';
    }
    
    if (!state.personal.email?.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.personal.email)) {
      errors.email = 'Format d\'email invalide';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [state.personal]);

  const validateProfessionalStep = useCallback(() => {
    const errors: Record<string, string> = {};
    
    if (!state.professional.address?.trim()) {
      errors.address = 'L\'adresse est requise';
    }
    
    if (!state.professional.city?.trim()) {
      errors.city = 'La ville est requise';
    }
    
    if (!state.professional.country?.trim()) {
      errors.country = 'Le pays est requis';
    }

    if (state.professional.phoneNumber && state.professional.country) {
      if (!isValidPhoneNumber(state.professional.phoneNumber, state.professional.country as CountryCode)) {
        errors.phoneNumber = 'Numéro de téléphone invalide';
      }
    }

    if (state.professional.businessPhone && state.professional.country) {
      if (!isValidPhoneNumber(state.professional.businessPhone, state.professional.country as CountryCode)) {
        errors.businessPhone = 'Numéro de téléphone professionnel invalide';
      }
    }

    // Vérifier qu'au moins un numéro de téléphone est rempli
    if (!state.professional.phoneNumber?.trim() && !state.professional.businessPhone?.trim()) {
      errors.phoneNumber = 'Au moins un numéro de téléphone est requis';
      errors.businessPhone = 'Au moins un numéro de téléphone est requis';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [state.professional]);

  const validateSecurityStep = useCallback(() => {
    const errors: Record<string, string> = {};
    
    if (!state.security.password) {
      errors.password = 'Le mot de passe est requis';
    }
    
    if (state.security.password !== state.security.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!state.security.terms) {
      errors.terms = 'Vous devez accepter les conditions';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [state.security]);

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