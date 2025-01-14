import { Link } from "react-router-dom";
import { ArrowRight, Globe, User } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const DesktopNav = () => {
  const { t, language, setLanguage } = useTranslation();

  const handleLanguageChange = () => {
    const nextLang = language === 'en' ? 'fr' : language === 'fr' ? 'es' : 'en';
    setLanguage(nextLang);
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      {/* Language Selector */}
      <button 
        onClick={handleLanguageChange}
        className="flex w-[140px] items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-2 text-white transition-all duration-200 hover:bg-primary-foreground/10 hover:scale-[0.98]"
      >
        <span>{t.nav.language[language]}</span>
        <Globe className="h-5 w-5" />
      </button>

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