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
        newest: 'Newest First',
        oldest: 'Oldest First',
        placeholder: 'Choose sorting',
      },
      listingId: {
        label: 'Listing ID',
        placeholder: 'Enter listing ID',
      },
      keywords: {
        label: 'Keywords',
        placeholder: 'Search keywords',
      },
      category: {
        label: 'Category',
        placeholder: 'Select a category',
      },
      subcategory: {
        label: 'Subcategory',
        placeholder: 'Select a subcategory',
      },
      subsubcategory: {
        label: 'Sub-subcategory',
        placeholder: 'Select a sub-subcategory',
      },
      actions: {
        clearFilters: 'Clear Filters',
      },
    },
    nav: {
      login: 'Login',
      post: 'Post',
      search: 'Search...',
      language: {
        en: 'English',
        fr: 'French',
        es: 'Spanish',
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
        newest: 'Plus récents',
        oldest: 'Plus anciens',
        placeholder: 'Choisir le tri',
      },
      listingId: {
        label: 'Numéro d\'annonce',
        placeholder: 'Entrer le numéro',
      },
      keywords: {
        label: 'Mots-clés',
        placeholder: 'Rechercher par mots-clés',
      },
      category: {
        label: 'Catégorie',
        placeholder: 'Sélectionner une catégorie',
      },
      subcategory: {
        label: 'Sous-catégorie',
        placeholder: 'Sélectionner une sous-catégorie',
      },
      subsubcategory: {
        label: 'Sous-sous-catégorie',
        placeholder: 'Sélectionner une sous-sous-catégorie',
      },
      actions: {
        clearFilters: 'Effacer les filtres',
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
        newest: 'Más recientes',
        oldest: 'Más antiguos',
        placeholder: 'Elegir orden',
      },
      listingId: {
        label: 'Número de anuncio',
        placeholder: 'Introducir número',
      },
      keywords: {
        label: 'Palabras clave',
        placeholder: 'Buscar por palabras clave',
      },
      category: {
        label: 'Categoría',
        placeholder: 'Seleccionar una categoría',
      },
      subcategory: {
        label: 'Subcategoría',
        placeholder: 'Seleccionar una subcategoría',
      },
      subsubcategory: {
        label: 'Sub-subcategoría',
        placeholder: 'Seleccionar una sub-subcategoría',
      },
      actions: {
        clearFilters: 'Limpiar filtros',
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