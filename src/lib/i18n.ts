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
      subtitle: "We're glad to see you again",
      backHome: "Back to home",
      email: {
        label: "Email",
        placeholder: "Enter your email",
        invalid: "Invalid email address"
      },
      password: {
        label: "Password",
        placeholder: "Enter your password",
        requirements: {
          minLength: "Password must be at least 6 characters long",
          uppercase: "Password must contain at least one uppercase letter",
          number: "Password must contain at least one number"
        },
        strength: "Password strength:",
        forgot: "Forgot password?"
      },
      rememberMe: "Remember me",
      submit: "Sign in",
      loading: "Signing in...",
      success: "Welcome!",
      error: "Please check your credentials and try again",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      legal: {
        terms: "Terms of Service",
        privacy: "Privacy Policy"
      }
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
      subtitle: "Nous sommes ravis de vous revoir",
      backHome: "Retour à l'accueil",
      email: {
        label: "Email",
        placeholder: "Entrez votre email",
        invalid: "Adresse email invalide"
      },
      password: {
        label: "Mot de passe",
        placeholder: "Entrez votre mot de passe",
        requirements: {
          minLength: "Le mot de passe doit contenir au moins 6 caractères",
          uppercase: "Le mot de passe doit contenir au moins une majuscule",
          number: "Le mot de passe doit contenir au moins un chiffre"
        },
        strength: "Force du mot de passe :",
        forgot: "Mot de passe oublié ?"
      },
      rememberMe: "Se souvenir de moi",
      submit: "Se connecter",
      loading: "Connexion en cours...",
      success: "Bienvenue !",
      error: "Veuillez vérifier vos identifiants et réessayer",
      noAccount: "Vous n'avez pas de compte ?",
      signUp: "S'inscrire",
      legal: {
        terms: "Conditions générales d'utilisation",
        privacy: "Politique de confidentialité"
      }
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
      subtitle: "Nos alegra verte de nuevo",
      backHome: "Volver al inicio",
      email: {
        label: "Correo electrónico",
        placeholder: "Ingrese su correo electrónico",
        invalid: "Dirección de correo electrónico inválida"
      },
      password: {
        label: "Contraseña",
        placeholder: "Ingrese su contraseña",
        requirements: {
          minLength: "La contraseña debe tener al menos 6 caracteres",
          uppercase: "La contraseña debe contener al menos una mayúscula",
          number: "La contraseña debe contener al menos un número"
        },
        strength: "Fuerza de la contraseña:",
        forgot: "¿Olvidó su contraseña?"
      },
      rememberMe: "Recordarme",
      submit: "Iniciar sesión",
      loading: "Iniciando sesión...",
      success: "¡Bienvenido!",
      error: "Por favor verifique sus credenciales e intente nuevamente",
      noAccount: "¿No tiene una cuenta?",
      signUp: "Registrarse",
      legal: {
        terms: "Términos de servicio",
        privacy: "Política de privacidad"
      }
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
