import { SignupState, SignupAction } from "@/types/signupState";

export const handlePersonalData = (state: SignupState, action: SignupAction): SignupState => {
  if (action.type === "SET_PERSONAL_DATA" && action.field) {
    return {
      ...state,
      personal: {
        ...state.personal,
        [action.field]: action.value,
      },
    };
  }
  return state;
};