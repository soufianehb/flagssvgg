import { SignupState, SignupAction } from "@/types/signupState";

export const handleUiActions = (state: SignupState, action: SignupAction): SignupState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.value },
      };
    case "SET_PASSWORD_VISIBILITY":
      return {
        ...state,
        ui: { ...state.ui, showPassword: action.value },
      };
    case "SET_CONFIRM_PASSWORD_VISIBILITY":
      return {
        ...state,
        ui: { ...state.ui, showConfirmPassword: action.value },
      };
    case "SET_PASSWORD_STRENGTH":
      return {
        ...state,
        ui: { ...state.ui, passwordStrength: action.value },
      };
    default:
      return state;
  }
};