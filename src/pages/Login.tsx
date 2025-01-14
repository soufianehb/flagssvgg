import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { LogIn, User, Key, Eye, EyeOff, Globe, ArrowLeft, UserPlus } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
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
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { t, language, setLanguage } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const formSchema = z.object({
    email: z.string().email(t.login.email.invalid),
    password: z
      .string()
      .min(6, t.login.password.requirements.minLength)
      .regex(/[A-Z]/, t.login.password.requirements.uppercase)
      .regex(/[0-9]/, t.login.password.requirements.number),
    rememberMe: z.boolean().default(false),
  });

  const languages = [
    { code: 'en', label: t.nav.language.en },
    { code: 'fr', label: t.nav.language.fr },
    { code: 'es', label: t.nav.language.es }
  ];

  const handleLanguageChange = (lang: 'en' | 'fr' | 'es') => {
    setLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    if (password.length >= 10) strength += 20;
    setPasswordStrength(strength);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Login attempt with:", values);
      login(values.email, values.password);
      toast({
        title: t.login.success,
        description: t.login.success,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.login.error,
        description: t.login.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" role="main">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors mb-4"
            aria-label={t.login.backHome}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.login.backHome}
          </Link>

          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <Globe className="h-4 w-4" />
                {t.nav.language[language]}
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

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900" tabIndex={0}>
                {t.login.title}
              </h1>
              <p className="mt-2 text-sm text-gray-600" tabIndex={0}>
                {t.login.subtitle}
              </p>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">{t.login.email.label}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input
                            {...field}
                            id="email"
                            placeholder={t.login.email.placeholder}
                            type="email"
                            autoComplete="email"
                            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-accent"
                            aria-required="true"
                            aria-invalid={!!form.formState.errors.email}
                            aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                          />
                        </div>
                      </FormControl>
                      <FormMessage id="email-error" role="alert" aria-live="polite" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">{t.login.password.label}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t.login.password.placeholder}
                            autoComplete="current-password"
                            className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-accent"
                            onChange={(e) => {
                              field.onChange(e);
                              calculatePasswordStrength(e.target.value);
                            }}
                            aria-required="true"
                            aria-invalid={!!form.formState.errors.password}
                            aria-describedby={form.formState.errors.password ? "password-error" : "password-strength"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Eye className="h-5 w-5" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage id="password-error" role="alert" aria-live="polite" />
                      {field.value && (
                        <div className="mt-2 space-y-1">
                          <Progress 
                            value={passwordStrength} 
                            className="h-1" 
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={passwordStrength}
                            aria-label={t.login.password.strength}
                          />
                          <p className="text-xs text-gray-500" id="password-strength">
                            {t.login.password.strength} {passwordStrength}%
                          </p>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-accent data-[state=checked]:border-accent focus:ring-2 focus:ring-accent"
                            id="remember-me"
                            aria-label={t.login.rememberMe}
                          />
                        </FormControl>
                        <FormLabel htmlFor="remember-me" className="text-sm font-medium leading-none cursor-pointer">
                          {t.login.rememberMe}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    {t.login.password.forgot}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full flex justify-center items-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  disabled={isLoading}
                  aria-label={isLoading ? t.login.loading : t.login.submit}
                >
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  {isLoading ? (
                    <span className="animate-pulse">{t.login.loading}</span>
                  ) : (
                    t.login.submit
                  )}
                </Button>

                <div className="text-center mt-4 space-y-3">
                  <p className="text-sm text-gray-600">
                    {t.login.noAccount}
                  </p>
                  <Button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="w-full flex justify-center items-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  >
                    <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t.login.signUp}
                  </Button>
                </div>
              </form>
            </FormProvider>

            <div className="text-center space-y-2 text-sm text-gray-600">
              <p>
                <Link to="/terms" className="text-accent hover:text-accent/80 underline">
                  {t.login.legal.terms}
                </Link>
              </p>
              <p>
                <Link to="/privacy" className="text-accent hover:text-accent/80 underline">
                  {t.login.legal.privacy}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
