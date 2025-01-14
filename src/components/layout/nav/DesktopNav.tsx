import { Link } from "react-router-dom";
import { ArrowRight, Globe, User, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = 'en' | 'fr' | 'es';

export const DesktopNav = () => {
  const { t, language, setLanguage } = useTranslation();

  const languages: Array<{ code: Language; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' }
  ];

  return (
    <div className="hidden md:flex items-center gap-6">
      {/* Language Selector Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-[140px] items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-all duration-200 hover:bg-primary-foreground/10 hover:scale-[0.98]">
          <span>{t.nav.language[language]}</span>
          <Globe className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-primary border-primary-foreground/20">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              className="text-white hover:bg-primary-foreground/10 cursor-pointer flex items-center justify-between"
              onClick={() => setLanguage(lang.code)}
            >
              {lang.label}
              {language === lang.code && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Login Link */}
      <Link 
        to="/login" 
        className="flex items-center gap-2 text-white transition-all duration-200 hover:text-accent hover:opacity-90"
      >
        <User className="h-5 w-5" />
        <span>{t.nav.login}</span>
      </Link>

      {/* Post Button */}
      <button className="flex items-center gap-2 rounded-lg bg-[#B08A38] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90 transform hover:scale-[0.98]">
        <span>{t.nav.post}</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};