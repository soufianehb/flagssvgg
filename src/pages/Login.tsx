import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { LogIn, User, Key, Eye, EyeOff, Twitter, Chrome, ArrowLeft, Globe } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  const handleSocialLogin = async (provider: 'google' | 'twitter') => {
    setIsLoading(true);
    try {
      console.log(`Login with ${provider}`);
      toast({
        title: "Redirection en cours",
        description: `Connexion avec ${provider} en cours...`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion sociale.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Login attempt with:", values);
      toast({
        title: t.login.success,
        description: "Bienvenue !",
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.login.error,
        description: "Veuillez vérifier vos identifiants et réessayer.",
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
          {/* Back to Home Link */}
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors mb-4"
            aria-label="Retour à l'accueil"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à l'accueil
          </Link>

          {/* Language Selector */}
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
                Bienvenue ! Nous sommes ravis de vous revoir.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4" role="group" aria-label="Options de connexion sociale">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-accent focus:outline-none"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                aria-label="Se connecter avec Google"
              >
                <Chrome className="h-5 w-5" aria-hidden="true" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-accent focus:outline-none"
                onClick={() => handleSocialLogin('twitter')}
                disabled={isLoading}
                aria-label="Se connecter avec Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
                Twitter
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500" aria-hidden="true">
                  Ou continuez avec
                </span>
              </div>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input
                            {...field}
                            id="email"
                            placeholder="votre@email.com"
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
                      <FormLabel htmlFor="password">Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
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
                            aria-label="Force du mot de passe"
                          />
                          <p className="text-xs text-gray-500" id="password-strength">
                            Force du mot de passe: {passwordStrength}%
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
                            aria-label="Se souvenir de moi"
                          />
                        </FormControl>
                        <FormLabel htmlFor="remember-me" className="text-sm font-medium leading-none cursor-pointer">
                          Se souvenir de moi
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full flex justify-center items-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  disabled={isLoading}
                  aria-label={isLoading ? "Connexion en cours..." : "Se connecter"}
                >
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  {isLoading ? (
                    <span className="animate-pulse">Connexion en cours...</span>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    Vous n'avez pas de compte ?{" "}
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    >
                      S'inscrire
                    </Link>
                  </p>
                </div>
              </form>
            </FormProvider>

            <div className="text-center space-y-2 text-sm text-gray-600">
              <p>
                <Link to="/terms" className="text-accent hover:text-accent/80 underline">
                  Conditions générales d'utilisation
                </Link>
              </p>
              <p>
                <Link to="/privacy" className="text-accent hover:text-accent/80 underline">
                  Politique de confidentialité
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

