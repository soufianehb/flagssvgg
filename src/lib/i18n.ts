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
        placeholder: 'Choose sorting',
        newest: 'Newest First',
        oldest: 'Oldest First',
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
    footer: {
      tagline: "Your trusted partner for export and international trade",
      quickLinks: {
        title: "Quick Links",
        listings: "Listings",
        directory: "Directory",
        tools: "Tools"
      },
      contact: {
        title: "Contact",
        contactUs: "Contact Us",
        legalNotice: "Legal Notice"
      },
      newsletter: {
        title: "Newsletter",
        placeholder: "Enter your email",
        subscribe: "Subscribe"
      },
      copyright: "All rights reserved"
    },
    login: {
      title: "Welcome back",
      subtitle: "Please sign in to your account",
      email: {
        label: "Email",
        placeholder: "Enter your email"
      },
      password: {
        label: "Password",
        placeholder: "Enter your password"
      },
      submit: "Sign in",
      loading: "Signing in...",
      success: "Logged in successfully",
      error: "Invalid credentials"
    }
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
        placeholder: 'Choisir le tri',
        newest: 'Plus récents',
        oldest: 'Plus anciens',
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
    footer: {
      tagline: "Votre partenaire de confiance pour l'exportation et le commerce international",
      quickLinks: {
        title: "Liens Rapides",
        listings: "Annonces",
        directory: "Répertoire",
        tools: "Outils"
      },
      contact: {
        title: "Contact",
        contactUs: "Nous Contacter",
        legalNotice: "Mentions Légales"
      },
      newsletter: {
        title: "Newsletter",
        placeholder: "Entrez votre email",
        subscribe: "S'abonner"
      },
      copyright: "Tous droits réservés"
    },
    login: {
      title: "Bienvenue",
      subtitle: "Connectez-vous à votre compte",
      email: {
        label: "Email",
        placeholder: "Entrez votre email"
      },
      password: {
        label: "Mot de passe",
        placeholder: "Entrez votre mot de passe"
      },
      submit: "Se connecter",
      loading: "Connexion...",
      success: "Connexion réussie",
      error: "Identifiants invalides"
    }
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
        placeholder: 'Elegir orden',
        newest: 'Más recientes',
        oldest: 'Más antiguos',
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
    footer: {
      tagline: "Su socio de confianza para la exportación y el comercio internacional",
      quickLinks: {
        title: "Enlaces Rápidos",
        listings: "Anuncios",
        directory: "Directorio",
        tools: "Herramientas"
      },
      contact: {
        title: "Contacto",
        contactUs: "Contáctenos",
        legalNotice: "Aviso Legal"
      },
      newsletter: {
        title: "Newsletter",
        placeholder: "Introduzca su email",
        subscribe: "Suscribirse"
      },
      copyright: "Todos los derechos reservados"
    },
    login: {
      title: "Bienvenido de nuevo",
      subtitle: "Inicie sesión en su cuenta",
      email: {
        label: "Correo electrónico",
        placeholder: "Ingrese su correo electrónico"
      },
      password: {
        label: "Contraseña",
        placeholder: "Ingrese su contraseña"
      },
      submit: "Iniciar sesión",
      loading: "Iniciando sesión...",
      success: "Sesión iniciada correctamente",
      error: "Credenciales inválidas"
    }
  }
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
