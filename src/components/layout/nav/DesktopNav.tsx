import { Link } from "react-router-dom";
import { ArrowRight, Globe, LogOut, User, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = 'en' | 'fr' | 'es';

export const DesktopNav = () => {
  const { t, language, setLanguage } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

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
    <div className="hidden md:flex items-center gap-6">
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-[140px] items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white hover:bg-primary-foreground/10">
            <span>{t.nav.language[language]}</span>
            <Globe className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center"
            sideOffset={5}
            className="bg-primary border-primary-foreground/20 w-[140px] animate-dropdown-in"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                className="text-white hover:bg-primary-foreground/10 cursor-pointer flex items-center justify-between"
                onClick={() => handleLanguageChange(lang.code)}
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

      {isAuthenticated ? (
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-white hover:text-accent"
        >
          <LogOut className="h-5 w-5" />
          <span>{t.nav.logout}</span>
        </button>
      ) : (
        <Link 
          to="/login" 
          className="flex items-center gap-2 text-white hover:text-accent"
        >
          <User className="h-5 w-5" />
          <span>{t.nav.login}</span>
        </Link>
      )}

      <button className="flex items-center gap-2 rounded-lg bg-[#B08A38] px-6 py-2.5 font-medium text-white hover:opacity-90">
        <span>{t.nav.post}</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};