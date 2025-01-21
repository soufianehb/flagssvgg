import { SignupState, SignupAction } from "@/types/signupState";
import { initialState } from "./signupInitialState";
import { handlePersonalData } from "./handlers/personalDataHandler";
import { handleProfessionalData } from "./handlers/professionalDataHandler";
import { handleSecurityData } from "./handlers/securityDataHandler";
import { handleUiActions } from "./handlers/uiHandler";

export { initialState };

export const signupReducer = (state: SignupState, action: SignupAction): SignupState => {
  // Gérer les actions de réinitialisation d'abord
  if (action.type === "RESET_FORM") {
    return initialState;
  }

  if (action.type === "CLEAR_STEP" && action.step) {
    return {
      ...state,
      [action.step]: initialState[action.step],
    };
  }

  // Déléguer aux gestionnaires spécifiques
  const afterPersonal = handlePersonalData(state, action);
  if (afterPersonal !== state) return afterPersonal;

  const afterProfessional = handleProfessionalData(state, action);
  if (afterProfessional !== state) return afterProfessional;

  const afterSecurity = handleSecurityData(state, action);
  if (afterSecurity !== state) return afterSecurity;

  const afterUi = handleUiActions(state, action);
  if (afterUi !== state) return afterUi;

  return state;
};