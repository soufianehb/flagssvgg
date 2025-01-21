import { Form } from "@/components/ui/form";
import PersonalInfoStep from "./PersonalInfoStep";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import SecurityStep from "./SecurityStep";
import { useSignupState } from "@/hooks/useSignupState";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
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

  const validatePersonalStep = async () => {
    const isValid = await personalForm.trigger();
    if (!isValid) {
      toast({
        variant: "destructive",
        title: t?.validation?.error?.title || "Validation Error",
        description: t?.validation?.error?.description || "Please fill in all required fields"
      });
      return false;
    }
    return true;
  };

  const validateProfessionalStep = async () => {
    const isValid = await professionalForm.trigger();
    if (!isValid) {
      toast({
        variant: "destructive",
        title: t?.validation?.error?.title || "Validation Error",
        description: t?.validation?.error?.description || "Please fill in all required fields"
      });
      return false;
    }

    const formData = professionalForm.getValues();
    if (!formData.phoneNumber && !formData.businessPhone) {
      toast({
        variant: "destructive",
        title: t?.validation?.error?.title || "Validation Error",
        description: t?.validation?.phoneNumber?.required || "At least one phone number is required"
      });
      return false;
    }
    return true;
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let canProceed = false;
    
    switch (currentStep) {
      case 1:
        canProceed = await validatePersonalStep();
        break;
      case 2:
        canProceed = await validateProfessionalStep();
        break;
      default:
        canProceed = true;
    }

    if (canProceed) {
      if (currentStep === 3) {
        handleSubmit();
      } else {
        handleNextStep();
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...personalForm}>
            <form onSubmit={handleStepSubmit}>
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
            <form onSubmit={handleStepSubmit}>
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
            <form onSubmit={handleStepSubmit}>
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