import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { LogIn, User, Key, Eye, EyeOff } from "lucide-react";
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
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
      // TODO: Implement actual login logic here
      console.log("Login attempt with:", values);
      toast({
        title: t.login.success,
        description: "Bienvenue !",
        className: "animate-fade-in",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.login.error,
        description: "Veuillez vérifier vos identifiants et réessayer.",
        className: "animate-fade-in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                {t.login.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {t.login.subtitle}
              </p>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.email.label}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                              {...field}
                              placeholder={t.login.email.placeholder}
                              type="email"
                              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-accent animate-fade-in"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 animate-fade-in" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.password.label}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder={t.login.password.placeholder}
                              className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-accent animate-fade-in"
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
                        <FormMessage className="text-red-500 animate-fade-in" />
                        {field.value && (
                          <div className="mt-2 space-y-1">
                            <Progress value={passwordStrength} className="h-1" />
                            <p className="text-xs text-gray-500">
                              Force du mot de passe: {passwordStrength}%
                            </p>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

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
                            className="transition-all duration-200"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium leading-none">
                          Se souvenir de moi
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full flex justify-center items-center transition-all duration-200 hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {isLoading ? (
                    <div className="animate-pulse">Connexion en cours...</div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Vous n'avez pas de compte ?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-accent hover:text-accent/80 transition-colors duration-200"
                    >
                      S'inscrire
                    </Link>
                  </p>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;