
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/i18n/translations';

type TranslationContextType = {
  t: typeof translations['en'];
  language: Language;
  setLanguage: (lang: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.split('-')[0] as Language;
    const detectedLang = savedLang || (browserLang in translations ? browserLang : 'en');
    setLanguage(detectedLang);
  }, []);

  const setLang = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  const value = {
    t: translations[language],
    language,
    setLanguage: setLang,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
