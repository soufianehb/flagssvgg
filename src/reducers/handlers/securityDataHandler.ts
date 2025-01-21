import { SignupState, SignupAction } from "@/types/signupState";

export const handleSecurityData = (state: SignupState, action: SignupAction): SignupState => {
  if (action.type === "SET_SECURITY_DATA" && action.field) {
    return {
      ...state,
      security: {
        ...state.security,
        [action.field]: action.value,
      },
    };
  }
  return state;
};