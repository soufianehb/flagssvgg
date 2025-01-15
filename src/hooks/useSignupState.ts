import { useReducer, useCallback, useEffect } from "react";
import { signupReducer, initialState, SignupState } from "@/reducers/signupReducer";
import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";

const STORAGE_KEY = "signup_form_data";

export const useSignupState = () => {
  const [state, dispatch] = useReducer(signupReducer, initialState, () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 500); // Debounce de 500ms

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

  return {
    state,
    setPersonalData,
    setProfessionalData,
    setSecurityData,
    setLoading,
    setPasswordVisibility,
    setConfirmPasswordVisibility,
    setPasswordStrength,
    resetForm,
  };
};