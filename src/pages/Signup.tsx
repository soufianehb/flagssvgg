import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserPlus, User, Key, Eye, EyeOff, Globe, ArrowLeft, LogIn } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import { phoneCodes } from "@/data/phoneCodes";

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
  companyName: z.string().optional(),
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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const languages = [
    { code: 'en', label: t.nav.language.en },
    { code: 'fr', label: t.nav.language.fr },
    { code: 'es', label: t.nav.language.es }
  ];

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

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    if (password.length >= 12) strength += 20;
    setPasswordStrength(strength);
  };

  const handleLanguageChange = (lang: 'en' | 'fr' | 'es') => {
    setLanguage(lang);
  };

  const validatePhoneNumber = (phone: string, country: string) => {
    try {
      if (!phone) return false;
      return isValidPhoneNumber(phone, country as CountryCode);
    } catch (error) {
      return false;
    }
  };

  const handleCountryChange = (value: string) => {
    form.setValue("country", value);
    const phoneCode = phoneCodes[value] || "";
    
    const currentBusinessPhone = form.getValues("businessPhone");
    const currentPhoneNumber = form.getValues("phoneNumber");
    
    if (!currentBusinessPhone || /^\+\d{1,3}/.test(currentBusinessPhone)) {
      form.setValue("businessPhone", phoneCode + " ");
    }
    
    if (!currentPhoneNumber || /^\+\d{1,3}/.test(currentPhoneNumber)) {
      form.setValue("phoneNumber", phoneCode + " ");
    }

    const validatePhone = (phone: string) => {
      try {
        if (!phone) return false;
        return isValidPhoneNumber(phone, value as CountryCode);
      } catch (error) {
        return false;
      }
    };

    const businessPhone = form.getValues("businessPhone");
    const phoneNumber = form.getValues("phoneNumber");

    if (businessPhone && !validatePhone(businessPhone)) {
      form.setError("businessPhone", {
        type: "manual",
        message: "Numéro de téléphone invalide pour ce pays"
      });
    } else {
      form.clearErrors("businessPhone");
    }

    if (phoneNumber && !validatePhone(phoneNumber)) {
      form.setError("phoneNumber", {
        type: "manual",
        message: "Numéro de téléphone invalide pour ce pays"
      });
    } else {
      form.clearErrors("phoneNumber");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "businessPhone" | "phoneNumber") => {
    const value = e.target.value;
    form.setValue(fieldName, value);
    
    const country = form.getValues("country");
    if (country && value) {
      const isValid = validatePhoneNumber(value, country);
      if (!isValid) {
        form.setError(fieldName, {
          type: "manual",
          message: "Format de numéro invalide"
        });
      } else {
        form.clearErrors(fieldName);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Compte créé avec succès !",
        description: "Vous pouvez maintenant vous connecter.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du compte.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormStep = (step: number) => {
    const baseClasses = "space-y-6 transition-all duration-300";
    const animationClasses = "animate-fade-in";

    switch (step) {
      case 1:
        return (
          <div className={`${baseClasses} ${animationClasses}`}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.firstName}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t.signup.placeholders.firstName} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.lastName}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t.signup.placeholders.lastName} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.email}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input {...field} type="email" className="pl-10" placeholder={t.signup.placeholders.email} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className={`${baseClasses} ${animationClasses}`}>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.address}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t.signup.placeholders.address} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.zipCode}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t.signup.placeholders.zipCode} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.signup.labels.city}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t.signup.placeholders.city} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.country}</FormLabel>
                  <Select onValueChange={handleCountryChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.signup.placeholders.country} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.phoneNumber}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="tel" 
                      placeholder={t.signup.placeholders.phoneNumber}
                      onChange={(e) => handlePhoneChange(e, "phoneNumber")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.companyName}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t.signup.placeholders.companyName} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className={`${baseClasses} ${animationClasses}`}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.password}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        placeholder={t.signup.placeholders.password}
                        onChange={(e) => {
                          field.onChange(e);
                          calculatePasswordStrength(e.target.value);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  {field.value && (
                    <div className="mt-2 space-y-1">
                      <Progress value={passwordStrength} className="h-1" />
                      <p className="text-xs text-gray-500">
                        {t.signup.validation.password.strength}: {passwordStrength}%
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.signup.labels.confirmPassword}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        placeholder={t.signup.placeholders.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t.signup.labels.terms}
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'fr' | 'es')}
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
                      onClick={previousStep}
                      className="w-full md:w-[400px] mx-auto flex justify-center items-center border-accent text-accent hover:bg-accent/10 hover:text-accent"
                    >
                      {t.signup.buttons.previous}
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
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

            <div className="text-center mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                {t.signup.buttons.login}
              </p>
              <Button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full md:w-[400px] mx-auto flex justify-center items-center bg-accent hover:bg-accent/90 text-white"
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
