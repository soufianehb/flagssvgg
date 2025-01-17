import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";

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

export type SignupAction =
  | { type: "SET_PERSONAL_DATA"; field: keyof PersonalData; value: string }
  | { type: "SET_PROFESSIONAL_DATA"; field: keyof ProfessionalData; value: string }
  | { type: "SET_SECURITY_DATA"; field: keyof SecurityData; value: string | boolean }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_PASSWORD_VISIBILITY"; value: boolean }
  | { type: "SET_CONFIRM_PASSWORD_VISIBILITY"; value: boolean }
  | { type: "SET_PASSWORD_STRENGTH"; value: number }
  | { type: "CLEAR_STEP"; step: 'personal' | 'professional' | 'security' }
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
    phoneCode: "",
    businessPhoneCode: "",
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
    passwordStrength: 0,
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
    case "SET_PASSWORD_STRENGTH":
      return {
        ...state,
        ui: {
          ...state.ui,
          passwordStrength: action.value,
        },
      };
    case "CLEAR_STEP":
      switch (action.step) {
        case 'personal':
          return {
            ...state,
            personal: initialState.personal,
          };
        case 'professional':
          return {
            ...state,
            professional: initialState.professional,
          };
        case 'security':
          return {
            ...state,
            security: initialState.security,
          };
        default:
          return state;
      }
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};