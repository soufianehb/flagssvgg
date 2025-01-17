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
import { useSignupState } from "@/hooks/useSignupState";
import { useSignupNavigation } from "@/hooks/useSignupNavigation";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
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
import { PersonalData } from "@/types/signup";

const languages: Array<{ code: 'en' | 'fr' | 'es'; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
];

const totalSteps = 3;

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
  businessPhone: z.string(),
  companyName: z.string(),
  phoneNumber: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const Signup = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      address: "",
      zipCode: "",
      city: "",
      country: "",
      businessPhone: "",
      companyName: "",
      phoneNumber: "",
    },
  });

  const {
    state,
    setPersonalData,
    setProfessionalData,
    setSecurityData,
    setLoading,
    setPasswordVisibility,
    setConfirmPasswordVisibility,
    setPasswordStrength,
    resetForm,
  } = useSignupState();

  const validatePersonalStep = () => {
    const errors: Record<string, string> = {};
    
    if (!state.personal.firstName.trim()) {
      errors.firstName = t.signup.validation.required;
    }
    if (!state.personal.lastName.trim()) {
      errors.lastName = t.signup.validation.required;
    }
    if (!state.personal.email.trim()) {
      errors.email = t.signup.validation.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.personal.email)) {
      errors.email = t.signup.validation.email;
    }

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((field) => {
        form.setError(field as any, {
          type: 'manual',
          message: errors[field],
        });
      });
      return false;
    }

    return true;
  };

  const handleNextStep = async () => {
    if (currentStep === 1 && !validatePersonalStep()) {
      toast({
        variant: "destructive",
        title: t.signup.errors.invalidFields,
        description: t.signup.errors.checkFields,
      });
      return;
    }
    await goToStep(currentStep + 1);
  };

  const handlePersonalDataChange = (field: keyof PersonalData, value: string) => {
    setPersonalData(field, value);
    form.setValue(field, value);
  };

  const handleCountryChange = (value: string) => {
    setProfessionalData("country", value);
    form.setValue("country", value);
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "businessPhone" | "phoneNumber"
  ) => {
    const value = e.target.value;
    setProfessionalData(fieldName, value);
    form.setValue(fieldName, value);
  };

  const validateProfessionalStep = () => {
    const errors: Record<string, string> = {};
    
    if (!state.professional.address.trim()) {
      errors.address = t.signup.validation.address.required;
    }
    if (!state.professional.zipCode.trim()) {
      errors.zipCode = t.signup.validation.zipCode.required;
    }
    if (!state.professional.city.trim()) {
      errors.city = t.signup.validation.city.required;
    }
    if (!state.professional.country) {
      errors.country = t.signup.validation.country.required;
    }
    if (!state.professional.companyName.trim()) {
      errors.companyName = t.signup.validation.companyName.required;
    }

    if (state.professional.phoneNumber && state.professional.country) {
      if (!isValidPhoneNumber(state.professional.phoneNumber, state.professional.country as CountryCode)) {
        errors.phoneNumber = t.signup.validation.phoneNumber.invalid;
      }
    }

    if (state.professional.businessPhone && state.professional.country) {
      if (!isValidPhoneNumber(state.professional.businessPhone, state.professional.country as CountryCode)) {
        errors.businessPhone = t.signup.validation.businessPhone.invalid;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateSecurityStep = () => {
    const errors: Record<string, string> = {};
    
    if (!state.security.password) {
      errors.password = t.signup.validation.required;
    }
    
    if (!state.security.confirmPassword) {
      errors.confirmPassword = t.signup.validation.required;
    }
    
    if (!state.security.terms) {
      errors.terms = t.signup.validation.terms;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const clearStep = (step: 'personal' | 'professional' | 'security') => {
    switch (step) {
      case 'personal':
        setPersonalData('firstName', '');
        setPersonalData('lastName', '');
        setPersonalData('email', '');
        break;
      case 'professional':
        setProfessionalData('address', '');
        setProfessionalData('zipCode', '');
        setProfessionalData('city', '');
        setProfessionalData('country', '');
        setProfessionalData('companyName', '');
        setProfessionalData('phoneNumber', '');
        setProfessionalData('businessPhone', '');
        break;
      case 'security':
        setSecurityData('password', '');
        setSecurityData('confirmPassword', '');
        setSecurityData('terms', false);
        break;
    }
  };

  const handleLanguageChange = (lang: 'en' | 'fr' | 'es') => {
    setLanguage(lang);
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
    (step: number) => {
      // Callback function when step changes
      console.log(`Step changed to ${step}`);
    }
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      resetForm();
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
      setLoading(false);
    }
  };

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoStep 
            form={form} 
            t={t} 
            data={state.personal}
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
            showPassword={state.ui.showPassword}
            showConfirmPassword={state.ui.showConfirmPassword}
            passwordStrength={state.ui.passwordStrength}
            setShowPassword={setPasswordVisibility}
            setShowConfirmPassword={setConfirmPasswordVisibility}
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
                      onClick={handleNextStep}
                      className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white"
                    >
                      {t.signup.buttons.next}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white"
                      disabled={state.ui.isLoading}
                    >
                      <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                      {state.ui.isLoading ? t.signup.buttons.loading : t.signup.buttons.submit}
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
