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
        search: 'Search'
      },
    },
    nav: {
      login: 'Login',
      logout: 'Logout',
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
    },
    signup: {
      title: "Create an account",
      subtitle: "Join our community",
      steps: {
        step1: "Personal Information",
        step2: "Contact Details",
        step3: "Security",
        progress: "Step {step} of {total}"
      },
      labels: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        address: "Address",
        zipCode: "Zip code",
        city: "City",
        country: "Country",
        phoneNumber: "Phone number",
        businessPhone: "Business phone",
        companyName: "Company name",
        terms: "I accept the terms of service and privacy policy"
      },
      placeholders: {
        firstName: "Enter your first name",
        lastName: "Enter your last name",
        email: "Enter your email",
        password: "Enter your password",
        confirmPassword: "Confirm your password",
        address: "Enter your address",
        zipCode: "Enter zip code",
        city: "Enter city",
        country: "Select your country",
        phoneNumber: "Enter phone number",
        businessPhone: "Enter business phone",
        companyName: "Enter company name"
      },
      validation: {
        required: "This field is required",
        firstName: "First name must be at least 2 characters long",
        lastName: "Last name must be at least 2 characters long",
        email: "Invalid email address",
        password: {
          length: "Password must be at least 8 characters long",
          minLength: "Password must be at least 8 characters long",
          uppercase: "Password must contain at least one uppercase letter",
          number: "Password must contain at least one number",
          strength: "Password strength:"
        },
        confirmPassword: "Passwords do not match",
        terms: "You must accept the terms and conditions",
        phoneNumber: {
          invalid: "Invalid phone number format",
          countryMismatch: "Invalid phone number for this country",
          required: "Phone number is required"
        },
        address: {
          required: "Address is required"
        },
        zipCode: {
          required: "Zip code is required"
        },
        city: {
          required: "City is required"
        },
        country: {
          required: "Country is required"
        },
        companyName: {
          required: "Company name is required"
        },
        businessPhone: {
          required: "Business phone is required",
          invalid: "Invalid phone number format",
          countryMismatch: "Invalid phone number for this country"
        },
        error: {
          title: "Validation Error",
          description: "Please fix the errors before continuing"
        }
      }
    },
    profile: {
      title: "Profile Settings",
      tabs: {
        general: "General",
        security: "Security",
        preferences: "Preferences",
        listings: {
          title: "My Listings",
          empty: "You haven't published any listings yet",
          status: {
            active: "Active",
            pending: "Pending",
            expired: "Expired"
          },
          filters: {
            all: "All Listings",
            active: "Active",
            pending: "Pending",
            expired: "Expired",
            search: "Search in your listings..."
          },
          sort: {
            newest: "Newest First",
            oldest: "Oldest First",
            mostViewed: "Most Viewed"
          },
          actions: {
            edit: "Edit",
            delete: "Delete",
            deactivate: "Deactivate",
            activate: "Activate"
          }
        }
      },
      general: {
        title: "General Information",
        comingSoon: "General settings coming soon"
      },
      security: {
        title: "Security Settings",
        comingSoon: "Security settings coming soon"
      },
      preferences: {
        title: "Preferences",
        comingSoon: "Preference settings coming soon"
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
        search: 'Rechercher'
      },
    },
    nav: {
      login: 'Connexion',
      logout: 'Déconnexion',
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
    },
    signup: {
      title: "Créer un compte",
      subtitle: "Rejoignez notre communauté",
      steps: {
        step1: "Informations personnelles",
        step2: "Coordonnées",
        step3: "Sécurité",
        progress: "Étape {step} sur {total}"
      },
      labels: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        address: "Adresse",
        zipCode: "Code postal",
        city: "Ville",
        country: "Pays",
        phoneNumber: "Numéro de téléphone",
        businessPhone: "Téléphone professionnel",
        companyName: "Nom de l'entreprise",
        terms: "J'accepte les conditions d'utilisation et la politique de confidentialité"
      },
      placeholders: {
        firstName: "Entrez votre prénom",
        lastName: "Entrez votre nom",
        email: "Entrez votre email",
        password: "Entrez votre mot de passe",
        confirmPassword: "Confirmez votre mot de passe",
        address: "Entrez votre adresse",
        zipCode: "Entrez le code postal",
        city: "Entrez la ville",
        country: "Sélectionnez votre pays",
        phoneNumber: "Entrez numéro de téléphone",
        businessPhone: "Entrez téléphone professionnel",
        companyName: "Entrez le nom de l'entreprise"
      },
      validation: {
        required: "Ce champ est requis",
        firstName: "Le prénom doit contenir au moins 2 caractères",
        lastName: "Le nom doit contenir au moins 2 caractères",
        email: "Adresse email invalide",
        password: {
          length: "Le mot de passe doit contenir au moins 8 caractères",
          minLength: "Le mot de passe doit contenir au moins 8 caractères",
          uppercase: "Le mot de passe doit contenir au moins une majuscule",
          number: "Le mot de passe doit contenir au moins un chiffre",
          strength: "Force du mot de passe :"
        },
        confirmPassword: "Les mots de passe ne correspondent pas",
        terms: "Vous devez accepter les conditions",
        phoneNumber: {
          invalid: "Format de numéro invalide",
          countryMismatch: "Numéro de téléphone invalide pour ce pays",
          required: "Le numéro de téléphone est requis"
        },
        address: {
          required: "L'adresse est requise"
        },
        zipCode: {
          required: "Le code postal est requis"
        },
        city: {
          required: "La ville est requise"
        },
        country: {
          required: "Le pays est requis"
        },
        companyName: {
          required: "Le nom de l'entreprise est requis"
        },
        businessPhone: {
          required: "Le téléphone professionnel est requis",
          invalid: "Format de numéro invalide",
          countryMismatch: "Numéro de téléphone invalide pour ce pays"
        },
        error: {
          title: "Erreur de validation",
          description: "Veuillez corriger les erreurs avant de continuer"
        }
      },
    },
    profile: {
      title: "Paramètres du profil",
      tabs: {
        general: "Général",
        security: "Sécurité",
        preferences: "Préférences",
        listings: {
          title: "Mes Annonces",
          empty: "Vous n'avez pas encore publié d'annonces",
          status: {
            active: "Active",
            pending: "En attente",
            expired: "Expirée"
          },
          filters: {
            all: "Toutes les annonces",
            active: "Actives",
            pending: "En attente",
            expired: "Expirées",
            search: "Rechercher dans vos annonces..."
          },
          sort: {
            newest: "Plus récentes",
            oldest: "Plus anciennes",
            mostViewed: "Plus vues"
          },
          actions: {
            edit: "Modifier",
            delete: "Supprimer",
            deactivate: "Désactiver",
            activate: "Activer"
          }
        }
      },
      general: {
        title: "Informations générales",
        comingSoon: "Paramètres généraux à venir"
      },
      security: {
        title: "Paramètres de sécurité",
        comingSoon: "Paramètres de sécurité à venir"
      },
      preferences: {
        title: "Préférences",
        comingSoon: "Paramètres des préférences à venir"
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
        search: 'Buscar'
      },
    },
    nav: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
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
    },
    signup: {
      title: "Crear una cuenta",
      subtitle: "Únete a nuestra comunidad",
      steps: {
        step1: "Información personal",
        step2: "Datos de contacto",
        step3: "Seguridad",
        progress: "Paso {step} de {total}"
      },
      labels: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar contraseña",
        address: "Dirección",
        zipCode: "Código postal",
        city: "Ciudad",
        country: "País",
        phoneNumber: "Número de teléfono",
        businessPhone: "Teléfono profesional",
        companyName: "Nombre de la empresa",
        terms: "Acepto los términos de servicio y la política de privacidad"
      },
      placeholders: {
        firstName: "Ingrese su nombre",
        lastName: "Ingrese su apellido",
        email: "Ingrese su correo electrónico",
        password: "Ingrese su contraseña",
        confirmPassword: "Confirme su contraseña",
        address: "Ingrese su dirección",
        zipCode: "Ingrese código postal",
        city: "Ingrese ciudad",
        country: "Seleccione su país",
        phoneNumber: "Ingrese número de teléfono",
        businessPhone: "Ingrese teléfono profesional",
        companyName: "Ingrese nombre de la empresa"
      },
      validation: {
        required: "Este campo es requerido",
        firstName: "El nombre debe tener al menos 2 caracteres",
        lastName: "El apellido debe tener al menos 2 caracteres",
        email: "Dirección de correo electrónico inválida",
        password: {
          length: "La contraseña debe tener al menos 8 caracteres",
          minLength: "La contraseña debe tener al menos 8 caracteres",
          uppercase: "La contraseña debe contener al menos una mayúscula",
          number: "La contraseña debe contener al menos un número",
          strength: "Fuerza de la contraseña:"
        },
        confirmPassword: "Las contraseñas no coinciden",
        terms: "Debe aceptar los términos y condiciones",
        phoneNumber: {
          invalid: "Formato de número inválido",
          countryMismatch: "Número de teléfono inválido para este país",
          required: "El número de teléfono es requerido"
        },
        address: {
          required: "La dirección es requerida"
        },
        zipCode: {
          required: "El código postal es requerido"
        },
        city: {
          required: "La ciudad es requerida"
        },
        country: {
          required: "El país es requerido"
        },
        companyName: {
          required: "El nombre de la empresa es requerido"
        },
        businessPhone: {
          required: "El teléfono profesional es requerido",
          invalid: "Formato de número inválido",
          countryMismatch: "Número de teléfono inválido para este país"
        },
        error: {
          title: "Error de validación",
          description: "Por favor, corrija los errores antes de continuar"
        }
      },
    },
    profile: {
      title: "Ajustes de perfil",
      tabs: {
        general: "General",
        security: "Seguridad",
        preferences: "Preferencias",
        listings: {
          title: "Mis Anuncios",
          empty: "Aún no has publicado ningún anuncio",
          status: {
            active: "Activo",
            pending: "Pendiente",
            expired: "Expirado"
          },
          filters: {
            all: "Todos los anuncios",
            active: "Activos",
            pending: "Pendientes",
            expired: "Expirados",
            search: "Buscar en tus anuncios..."
          },
          sort: {
            newest: "Más recientes",
            oldest: "Más antiguos",
            mostViewed: "Más vistos"
          },
          actions: {
            edit: "Editar",
            delete: "Eliminar",
            deactivate: "Desactivar",
            activate: "Activar"
          }
        }
      },
      general: {
        title: "Información general",
        comingSoon: "Configuración general próximamente"
      },
      security: {
        title: "Configuración de seguridad",
        comingSoon: "Configuración de seguridad próximamente"
      },
      preferences: {
        title: "Preferencias",
        comingSoon: "Configuración de preferencias próximamente"
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
