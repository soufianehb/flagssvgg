import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Menu, Search, User, LogOut, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = 'en' | 'fr' | 'es';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <div className="flex items-center gap-2 md:hidden">
        <button className="flex items-center gap-1 rounded-lg bg-[#B08A38] px-3 py-1.5 text-sm text-white transition-all duration-200 hover:opacity-90 transform hover:scale-[0.98]">
          <span>{t.nav.post}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-white transition-all duration-200 hover:bg-primary-foreground/10 hover:scale-[0.98]"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-20 border-t border-primary-foreground/20 py-4 space-y-4 bg-[#0A1836] md:hidden transition-all duration-300",
          isOpen ? "block opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-2"
        )}
      >
        <div className="flex items-center gap-2 mx-4 px-4 py-2 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10 transition-all duration-200 focus-within:border-primary-foreground/30">
          <Search className="h-5 w-5 text-white/70" />
          <input 
            type="text" 
            placeholder={t.nav.search}
            className="bg-transparent text-white placeholder-white/70 outline-none w-full"
          />
        </div>

        <div className="mx-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-all duration-200 hover:bg-primary-foreground/10">
              <span>{t.nav.language[language]}</span>
              <Globe className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary border-primary-foreground/20 w-[calc(100vw-2rem)] mx-4">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className="text-white hover:bg-primary-foreground/10 cursor-pointer flex items-center justify-between"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                  {language === lang.code && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 mx-4 py-2 text-white transition-all duration-200 hover:text-accent hover:opacity-90"
          >
            <LogOut className="h-5 w-5" />
            <span>{t.nav.logout}</span>
          </button>
        ) : (
          <Link 
            to="/login" 
            className="flex w-full items-center gap-2 px-4 mx-4 py-2 text-white transition-all duration-200 hover:text-accent hover:opacity-90"
          >
            <User className="h-5 w-5" />
            <span>{t.nav.login}</span>
          </Link>
        )}

        <button className="flex w-[calc(100%-2rem)] mx-4 items-center justify-center gap-2 rounded-lg bg-[#B08A38] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90 transform hover:scale-[0.98]">
          <span>{t.nav.post}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};