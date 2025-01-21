import { SignupState, SignupAction } from "@/types/signupState";

export const handleProfessionalData = (state: SignupState, action: SignupAction): SignupState => {
  if (action.type === "SET_PROFESSIONAL_DATA" && action.field) {
    return {
      ...state,
      professional: {
        ...state.professional,
        [action.field]: action.value,
      },
    };
  }
  return state;
};