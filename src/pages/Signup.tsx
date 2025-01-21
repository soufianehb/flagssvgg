import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Form } from "@/components/ui/form";
import { useSignupState } from "@/hooks/useSignupState";
import { useSignupNavigation } from "@/hooks/useSignupNavigation";
import PersonalInfoStep from "@/components/signup/PersonalInfoStep";
import ProfessionalInfoStep from "@/components/signup/ProfessionalInfoStep";
import SecurityStep from "@/components/signup/SecurityStep";
import { StepProgress } from "@/components/signup/StepProgress";
import { LanguageSelector } from "@/components/signup/LanguageSelector";
import { SignupHeader } from "@/components/signup/SignupHeader";
import { SignupFooter } from "@/components/signup/SignupFooter";

const languages = [
  { code: 'en' as const, label: 'English' },
  { code: 'fr' as const, label: 'Français' },
  { code: 'es' as const, label: 'Español' }
];

const totalSteps = 3;

const Signup = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  
  const {
    state,
    personalForm,
    professionalForm,
    securityForm,
    setPersonalData,
    setProfessionalData,
    setSecurityData,
    setLoading,
    setPasswordVisibility,
    setConfirmPasswordVisibility,
    setPasswordStrength,
    validateStep,
    resetForm,
  } = useSignupState(t);

  const { currentStep, goToStep, goBack } = useSignupNavigation(
    (step: number) => {
      console.log(`Navigation to step ${step}`);
    }
  );

  const handleNextStep = async () => {
    const isValid = await validateStep(
      currentStep === 1 ? 'personal' : 
      currentStep === 2 ? 'professional' : 
      'security'
    );

    if (isValid) {
      if (currentStep === 2) {
        const phoneNumber = professionalForm.getValues("phoneNumber");
        const businessPhone = professionalForm.getValues("businessPhone");
        if (!phoneNumber && !businessPhone) {
          return;
        }
      }
      await goToStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateStep('security');
    if (isValid) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        resetForm();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
  };

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
        const hasAtLeastOnePhone = professionalForm.getValues("phoneNumber") || professionalForm.getValues("businessPhone");
        
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
                  disabled={!hasAtLeastOnePhone}
                  className="flex-1 justify-center items-center bg-accent hover:bg-accent/90 text-white rounded-md px-4 py-2 disabled:opacity-50"
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignupHeader t={t} />
          
          <LanguageSelector
            currentLanguage={language}
            languages={languages}
            t={t}
            onLanguageChange={setLanguage}
          />

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <StepProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
              t={t}
            />

            {renderCurrentStep()}

            <SignupFooter
              t={t}
              onLoginClick={() => navigate('/login')}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;