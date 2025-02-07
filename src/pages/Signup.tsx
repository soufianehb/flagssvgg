
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { SignupForm } from "@/components/signup/SignupForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = 'en' | 'fr' | 'es';

const Signup = () => {
  const { t, language, setLanguage } = useTranslation();

  const languages: Array<{ code: Language; label: string }> = [
    { code: 'en', label: t.nav.language.en },
    { code: 'fr', label: t.nav.language.fr },
    { code: 'es', label: t.nav.language.es }
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t.signup.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t.signup.subtitle}
            </p>
          </div>

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
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center justify-between"
                  >
                    {lang.label}
                    {language === lang.code && (
                      <Check className="h-4 w-4 ml-2" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <SignupForm />

          <div className="space-y-4">
            <p className="text-center text-gray-600">
              {t.signup.buttons.login}
            </p>
            <Link to="/login">
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
                variant="default"
              >
                {t.nav.login}
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="font-medium text-accent hover:text-accent/90"
            >
              {t.signup.buttons.backHome}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
