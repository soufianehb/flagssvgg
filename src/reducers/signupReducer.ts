import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";

export type SignupState = {
  personal: PersonalData;
  professional: ProfessionalData;
  security: SecurityData;
  ui: {
    isLoading: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
  };
};

export type SignupAction =
  | { type: "SET_PERSONAL_DATA"; field: keyof PersonalData; value: string }
  | { type: "SET_PROFESSIONAL_DATA"; field: keyof ProfessionalData; value: string }
  | { type: "SET_SECURITY_DATA"; field: keyof SecurityData; value: string | boolean }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_PASSWORD_VISIBILITY"; value: boolean }
  | { type: "SET_CONFIRM_PASSWORD_VISIBILITY"; value: boolean }
  | { type: "RESET_FORM" };

export const initialState: SignupState = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
  },
  professional: {
    address: "",
    zipCode: "",
    city: "",
    country: "",
    companyName: "",
    phoneNumber: "",
    businessPhone: "",
  },
  security: {
    password: "",
    confirmPassword: "",
    terms: false,
  },
  ui: {
    isLoading: false,
    showPassword: false,
    showConfirmPassword: false,
  },
};

export const signupReducer = (state: SignupState, action: SignupAction): SignupState => {
  switch (action.type) {
    case "SET_PERSONAL_DATA":
      return {
        ...state,
        personal: {
          ...state.personal,
          [action.field]: action.value,
        },
      };
    case "SET_PROFESSIONAL_DATA":
      return {
        ...state,
        professional: {
          ...state.professional,
          [action.field]: action.value,
        },
      };
    case "SET_SECURITY_DATA":
      return {
        ...state,
        security: {
          ...state.security,
          [action.field]: action.value,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.value,
        },
      };
    case "SET_PASSWORD_VISIBILITY":
      return {
        ...state,
        ui: {
          ...state.ui,
          showPassword: action.value,
        },
      };
    case "SET_CONFIRM_PASSWORD_VISIBILITY":
      return {
        ...state,
        ui: {
          ...state.ui,
          showConfirmPassword: action.value,
        },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};