import { PersonalData, ProfessionalData, SecurityData } from "./signup";

export interface SignupState {
  personal: PersonalData;
  professional: ProfessionalData;
  security: SecurityData;
  ui: {
    isLoading: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    passwordStrength: number;
  };
}

export type SignupActionType = 
  | "SET_PERSONAL_DATA"
  | "SET_PROFESSIONAL_DATA"
  | "SET_SECURITY_DATA"
  | "SET_LOADING"
  | "SET_PASSWORD_VISIBILITY"
  | "SET_CONFIRM_PASSWORD_VISIBILITY"
  | "SET_PASSWORD_STRENGTH"
  | "CLEAR_STEP"
  | "RESET_FORM";

export interface SignupAction {
  type: SignupActionType;
  field?: string;
  value?: any;
  step?: 'personal' | 'professional' | 'security';
}