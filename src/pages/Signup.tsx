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
import { createValidationSchemas } from "@/schemas/validation";

const languages: Array<{ code: 'en' | 'fr' | 'es'; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
];

const totalSteps = 3;

type FormValues = z.infer<ReturnType<typeof createValidationSchemas>["security"]> & {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  businessPhone: string;
  companyName: string;
  phoneNumber: string;
};

const Signup = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const schemas = createValidationSchemas(t);
  const form = useForm<FormValues>({
    resolver: zodResolver(schemas.security),
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
      errors.firstName = t?.signup?.validation?.required || "First name is required";
    }
    if (!state.personal.lastName.trim()) {
      errors.lastName = t?.signup?.validation?.required || "Last name is required";
    }
    if (!state.personal.email.trim()) {
      errors.email = t?.signup?.validation?.required || "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.personal.email)) {
      errors.email = t?.signup?.validation?.email || "Invalid email format";
    }

    if (Object.keys(errors).length > 0) {
      toast({
        variant: "destructive",
        title: t?.signup?.validation?.error?.title || "Validation Error",
        description: t?.signup?.validation?.error?.description || "Please check the form for errors"
      });
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
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

  const handleNextStep = async () => {
    let isValid = true;
    let validationErrors = {};

    if (currentStep === 1) {
      const validation = validatePersonalStep();
      isValid = validation.isValid;
      validationErrors = validation.errors;
    } else if (currentStep === 2) {
      const validation = validateProfessionalStep();
      isValid = validation.isValid;
      validationErrors = validation.errors;
    }

    if (!isValid) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        form.setError(field as any, {
          type: 'manual',
          message: message as string,
        });
      });
      
      toast({
        variant: "destructive",
        title: t.signup.validation.error.title,
        description: t.signup.validation.error.description,
      });
      return;
    }

    form.clearErrors();
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

  const { currentStep, goToStep, goBack, canGoBack } = useSignupNavigation(
    (step: number) => {
      console.log(`Step changed to ${step}`);
    }
  );

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      resetForm();
      toast({
        title: t?.signup?.messages?.success?.title || "Success",
        description: t?.signup?.messages?.success?.description || "Account created successfully"
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t?.signup?.messages?.error?.title || "Error",
        description: error instanceof Error ? error.message : t?.signup?.messages?.error?.description || "An error occurred"
      });
    } finally {
      setLoading(false);
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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <PersonalInfoStep 
                    form={form as any}
                    t={t} 
                    data={state.personal}
                    onChange={handlePersonalDataChange}
                  />
                )}
                {currentStep === 2 && (
                  <ProfessionalInfoStep
                    form={form}
                    t={t}
                    handleCountryChange={handleCountryChange}
                    handlePhoneChange={handlePhoneChange}
                  />
                )}
                {currentStep === 3 && (
                  <SecurityStep
                    form={form as any}
                    t={t}
                    showPassword={state.ui.showPassword}
                    showConfirmPassword={state.ui.showConfirmPassword}
                    passwordStrength={state.ui.passwordStrength}
                    setShowPassword={setPasswordVisibility}
                    setShowConfirmPassword={setConfirmPasswordVisibility}
                  />
                )}

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
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
