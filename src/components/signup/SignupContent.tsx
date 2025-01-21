import { Form } from "@/components/ui/form";
import PersonalInfoStep from "./PersonalInfoStep";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import SecurityStep from "./SecurityStep";
import { useSignupState } from "@/hooks/useSignupState";

interface SignupContentProps {
  currentStep: number;
  t: any;
  goBack: () => void;
  handleNextStep: () => void;
  handleSubmit: () => void;
}

export const SignupContent = ({ 
  currentStep, 
  t, 
  goBack, 
  handleNextStep, 
  handleSubmit 
}: SignupContentProps) => {
  const {
    state,
    personalForm,
    professionalForm,
    securityForm,
    setPersonalData,
    setProfessionalData,
    setSecurityData,
    setPasswordVisibility,
    setConfirmPasswordVisibility,
  } = useSignupState(t);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...personalForm}>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              <PersonalInfoStep
                form={personalForm}
                t={t}
                data={state.personal}
                onChange={setPersonalData}
              />
            </form>
          </Form>
        );
      case 2:
        return (
          <Form {...professionalForm}>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              <ProfessionalInfoStep
                form={professionalForm}
                t={t}
                handleCountryChange={(country) => setProfessionalData('country', country)}
                handlePhoneChange={(e, field) => setProfessionalData(field, e.target.value)}
              />
              <div className="flex gap-4 w-full md:w-[400px] mx-auto mt-6">
                <button 
                  type="button" 
                  onClick={goBack}
                  className="flex-1 justify-center items-center border border-gray-300 rounded-md px-4 py-2"
                >
                  {t.signup.buttons.previous}
                </button>
                <button 
                  type="submit"
                  className="flex-1 justify-center items-center bg-accent hover:bg-accent/90 text-white rounded-md px-4 py-2"
                >
                  {t.signup.buttons.next}
                </button>
              </div>
            </form>
          </Form>
        );
      case 3:
        return (
          <Form {...securityForm}>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <SecurityStep
                form={securityForm}
                t={t}
                showPassword={state.ui.showPassword}
                showConfirmPassword={state.ui.showConfirmPassword}
                setShowPassword={setPasswordVisibility}
                setShowConfirmPassword={setConfirmPasswordVisibility}
                passwordStrength={state.ui.passwordStrength}
              />
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={goBack}
                  className="w-full md:w-[400px] border border-gray-300 rounded-md px-4 py-2"
                >
                  {t.signup.buttons.previous}
                </button>
                <button 
                  type="submit"
                  disabled={state.ui.isLoading}
                  className="w-full md:w-[400px] bg-accent hover:bg-accent/90 text-white rounded-md px-4 py-2"
                >
                  {state.ui.isLoading ? t.signup.buttons.loading : t.signup.buttons.submit}
                </button>
              </div>
            </form>
          </Form>
        );
      default:
        return null;
    }
  };

  return renderCurrentStep();
};