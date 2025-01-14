import { useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'es';

const translations = {
  en: {
    filters: {
      title: 'Filters',
      country: {
        label: 'Country of Origin',
        placeholder: 'Select country',
      },
      sort: {
        label: 'Sort By',
        newest: 'Newest',
        oldest: 'Oldest',
        placeholder: 'Sort by',
      },
      listingId: {
        label: 'Listing ID',
        placeholder: 'Enter listing ID',
      },
      keywords: {
        label: 'Keywords',
        placeholder: 'Search keywords',
      },
    },
    nav: {
      login: 'Login',
      post: 'Post',
      search: 'Search...',
      language: {
        en: 'English',
        fr: 'Français',
        es: 'Español',
      },
    },
  },
  fr: {
    filters: {
      title: 'Filtres',
      country: {
        label: 'Pays d\'origine',
        placeholder: 'Sélectionner un pays',
      },
      sort: {
        label: 'Trier par',
        newest: 'Plus récent',
        oldest: 'Plus ancien',
        placeholder: 'Trier par',
      },
      listingId: {
        label: 'ID de l\'annonce',
        placeholder: 'Entrer l\'ID',
      },
      keywords: {
        label: 'Mots-clés',
        placeholder: 'Rechercher par mots-clés',
      },
    },
    nav: {
      login: 'Connexion',
      post: 'Publier',
      search: 'Rechercher...',
      language: {
        en: 'Anglais',
        fr: 'Français',
        es: 'Espagnol',
      },
    },
  },
  es: {
    filters: {
      title: 'Filtros',
      country: {
        label: 'País de origen',
        placeholder: 'Seleccionar país',
      },
      sort: {
        label: 'Ordenar por',
        newest: 'Más reciente',
        oldest: 'Más antiguo',
        placeholder: 'Ordenar por',
      },
      listingId: {
        label: 'ID del anuncio',
        placeholder: 'Introducir ID',
      },
      keywords: {
        label: 'Palabras clave',
        placeholder: 'Buscar por palabras clave',
      },
    },
    nav: {
      login: 'Iniciar sesión',
      post: 'Publicar',
      search: 'Buscar...',
      language: {
        en: 'Inglés',
        fr: 'Francés',
        es: 'Español',
      },
    },
  },
};

export const useTranslation = () => {
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

  return {
    t: translations[language],
    language,
    setLanguage: setLang,
  };
};