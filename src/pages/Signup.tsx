import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useSignupNavigation } from "@/hooks/useSignupNavigation";
import { SignupContainer } from "@/components/signup/SignupContainer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const languages: { code: 'en' | 'fr' | 'es'; label: string; }[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
];

const totalSteps = 3;

const Signup = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  
  const { currentStep, goToStep, goBack } = useSignupNavigation(
    (step: number) => {
      console.log(`Navigation to step ${step}`);
    }
  );

  const handleNextStep = async () => {
    await goToStep(currentStep + 1);
  };

  const handleSubmit = async (formData: any) => {
    try {
      await signup(
        formData.personal.email,
        formData.security.password,
        formData.personal.firstName,
        formData.personal.lastName
      );
      
      toast({
        title: "Success",
        description: "Account created successfully! Please check your email for verification.",
      });
      
      navigate("/login");
    } catch (error: any) {
      console.error("Error during form submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred during signup",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <SignupContainer
          t={t}
          language={language}
          languages={languages}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onLanguageChange={setLanguage}
          onLoginClick={() => navigate('/login')}
          goBack={goBack}
          handleNextStep={handleNextStep}
          handleSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Signup;