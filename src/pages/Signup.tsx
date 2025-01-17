import { useNavigate, Link } from "react-router-dom";
import { Globe, ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Form } from "@/components/ui/form";
import { useSignupState } from "@/hooks/useSignupState";
import { useSignupNavigation } from "@/hooks/useSignupNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PersonalInfoStep from "@/components/signup/PersonalInfoStep";
import ProfessionalInfoStep from "@/components/signup/ProfessionalInfoStep";
import SecurityStep from "@/components/signup/SecurityStep";
import { PersonalData, ProfessionalData, SecurityData } from "@/types/signup";

const languages: Array<{ code: 'en' | 'fr' | 'es'; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
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
      await goToStep(currentStep + 1);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'fr' | 'es') => {
    setLanguage(lang);
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
              <div className="flex justify-end mt-6">
                <Button type="submit">
                  {t.signup.buttons.next}
                </Button>
              </div>
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
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={goBack}>
                  {t.signup.buttons.previous}
                </Button>
                <Button type="submit">
                  {t.signup.buttons.next}
                </Button>
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
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={goBack}>
                  {t.signup.buttons.previous}
                </Button>
                <Button type="submit" disabled={state.ui.isLoading}>
                  {state.ui.isLoading ? t.signup.buttons.loading : t.signup.buttons.submit}
                </Button>
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
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.signup.buttons.backHome}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t.nav.language[language]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">{t.signup.title}</h1>
              <p className="mt-2 text-gray-600">
                {t.signup.steps.progress.replace('{step}', currentStep.toString()).replace('{total}', totalSteps.toString())}
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {renderCurrentStep()}

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {t.signup.buttons.login}
              </p>
              <Button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white mt-2"
              >
                <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                {t.login.submit}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;