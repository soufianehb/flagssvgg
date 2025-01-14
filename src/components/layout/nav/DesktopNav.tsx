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
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-[140px] items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-all duration-200 hover:bg-primary-foreground/10 group">
            <span className="group-hover:translate-y-0 transition-transform duration-200">
              {t.nav.language[language]}
            </span>
            <Globe className="h-5 w-5 transition-transform duration-200" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center"
            sideOffset={5}
            className="bg-primary border-primary-foreground/20 w-[140px] absolute transform-gpu transition-transform duration-200 origin-top-center data-[state=open]:translate-y-0 data-[state=closed]:translate-y-[-10px]"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                className="text-white hover:bg-primary-foreground/10 cursor-pointer flex items-center justify-between group/item"
                onClick={() => setLanguage(lang.code)}
              >
                <span className="group-hover/item:translate-y-0 transition-transform duration-200">
                  {lang.label}
                </span>
                {language === lang.code && (
                  <Check className="h-4 w-4 ml-2 transition-transform duration-200" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link 
        to="/login" 
        className="flex items-center gap-2 text-white transition-all duration-200 hover:text-accent group"
      >
        <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
          {t.nav.login}
        </span>
      </Link>

      <button className="flex items-center gap-2 rounded-lg bg-[#B08A38] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[0.98] group">
        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
          {t.nav.post}
        </span>
        <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
};