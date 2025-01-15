import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserPlus, Globe, ArrowLeft, LogIn } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useSignupFormData } from "@/hooks/useSignupFormData";
import { useSignupNavigation } from "@/hooks/useSignupNavigation";
import { isValidPhoneNumber } from "libphonenumber-js";
import { phoneCodes } from "@/data/phoneCodes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PersonalInfoStep from "@/components/signup/PersonalInfoStep";
import ProfessionalInfoStep from "@/components/signup/ProfessionalInfoStep";
import SecurityStep from "@/components/signup/SecurityStep";

type Language = 'en' | 'fr' | 'es';

const languages: Array<{ code: Language; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
];

const totalSteps = 3;

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
  address: z.string().min(1, "L'adresse est requise"),
  zipCode: z.string().min(1, "Le code postal est requis"),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  businessPhone: z.string().min(1, "Le téléphone professionnel est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  phoneNumber: z.string().min(1, "Le numéro de téléphone est requis"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const Signup = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    personalData,
    setPersonalData,
    professionalData,
    setProfessionalData,
    securityData,
    setSecurityData,
    validatePersonalStep,
    validateProfessionalStep,
    validateSecurityStep,
    clearStep
  } = useSignupFormData();

  const handlePersonalDataChange = (field: keyof typeof personalData, value: string) => {
    setPersonalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCurrentStepValidation = () => {
    switch (currentStep) {
      case 1:
        return validatePersonalStep();
      case 2:
        return validateProfessionalStep();
      case 3:
        return validateSecurityStep();
      default:
        return { isValid: true, errors: {} };
    }
  };

  const { currentStep, goToStep, goBack, canGoBack } = useSignupNavigation(
    getCurrentStepValidation,
    (step) => {
      if (step < currentStep) {
        clearStep(step === 1 ? 'personal' : step === 2 ? 'professional' : 'security');
      }
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...personalData,
      ...professionalData,
      ...securityData
    },
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleCountryChange = (value: string) => {
    form.setValue("country", value);
    const phoneCode = phoneCodes[value] || "";
    
    form.setValue("businessPhone", phoneCode);
    form.setValue("phoneNumber", phoneCode);

    form.clearErrors("businessPhone");
    form.clearErrors("phoneNumber");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => {
    const value = e.target.value;
    const country = form.getValues("country");
    const countryCode = phoneCodes[country] || "";
    
    if (!value.startsWith(countryCode)) {
      form.setValue(fieldName, countryCode);
      return;
    }

    form.setValue(fieldName, value);
    
    if (country && value) {
      const isValid = isValidPhoneNumber(value, country);
      if (!isValid) {
        form.setError(fieldName, {
          type: "manual",
          message: t.signup.validation[fieldName].invalid
        });
      } else {
        form.clearErrors(fieldName);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const personalValidation = validatePersonalStep();
      const professionalValidation = validateProfessionalStep();
      const securityValidation = validateSecurityStep();

      if (!personalValidation.isValid || !professionalValidation.isValid || !securityValidation.isValid) {
        throw new Error("Veuillez vérifier tous les champs");
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      clearStep('personal');
      clearStep('professional');
      clearStep('security');
      
      toast({
        title: "Compte créé avec succès !",
        description: "Vous pouvez maintenant vous connecter.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la création du compte.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoStep 
            form={form} 
            t={t} 
            data={personalData}
            onChange={handlePersonalDataChange}
          />
        );
      case 2:
        return (
          <ProfessionalInfoStep
            form={form}
            t={t}
            handleCountryChange={handleCountryChange}
            handlePhoneChange={handlePhoneChange}
          />
        );
      case 3:
        return (
          <SecurityStep
            form={form}
            t={t}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            passwordStrength={passwordStrength}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-between items-center">
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
          </div>

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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderFormStep(currentStep)}

                <div className="flex justify-between space-x-4 mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => goBack()}
                      className="w-full md:w-[400px] mx-auto flex justify-center items-center border-accent text-accent hover:bg-accent/10 hover:text-accent"
                    >
                      {t.signup.buttons.previous}
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={() => goToStep(currentStep + 1)}
                      className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white"
                    >
                      {t.signup.buttons.next}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white"
                      disabled={isLoading}
                    >
                      <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                      {isLoading ? t.signup.buttons.loading : t.signup.buttons.submit}
                    </Button>
                  )}
                </div>
              </form>
            </Form>

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
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
