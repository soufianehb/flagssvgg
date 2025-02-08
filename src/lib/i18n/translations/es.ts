export const es = {
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
      strength: "Fuerza de la contraseña",
      forgot: "¿Olvidó su contraseña?",
      show: "Mostrar contraseña",
      hide: "Ocultar contraseña"
    },
    rememberMe: "Recordarme",
    submit: "Iniciar sesión",
    loading: "Iniciando sesión...",
    success: "¡Bienvenido!",
    successMessage: "Has iniciado sesión correctamente",
    error: "Error de inicio de sesión",
    errorMessage: "Correo electrónico o contraseña inválidos",
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
    buttons: {
      next: "Siguiente",
      previous: "Anterior",
      submit: "Crear cuenta",
      loading: "Creando cuenta...",
      login: "¿Ya tienes una cuenta?",
      backHome: "Volver al inicio"
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
      tradeRegisterNumber: "Número de registro mercantil",
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
      companyName: "Ingrese nombre de la empresa",
      tradeRegisterNumber: "Ingrese número de registro mercantil",
      phoneCode: "Código"
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
        required: "El nombre de la empresa es requerido",
        minLength: "El nombre de la empresa debe tener al menos 2 caracteres"
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
    messages: {
      success: {
        title: "Cuenta creada",
        description: "Su cuenta ha sido creada con éxito"
      },
      error: {
        title: "Error",
        description: "Ocurrió un error al crear su cuenta"
      }
    }
  },
  profile: {
    title: "Configuración del perfil",
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
      title: "Ficha de empresa",
      sections: {
        personal: "Información de contacto",
        business: "Información comercial",
        address: "Dirección"
      }
    },
    security: {
      title: "Configuración de seguridad",
      comingSoon: "Configuración de seguridad próximamente"
    },
    preferences: {
      title: "Preferencias",
      comingSoon: "Configuración de preferencias próximamente"
    },
    additionalInfo: {
      vatNumber: "Número de IVA",
      vatNumberHint: "(si está en Europa)",
      businessType: {
        label: "Usted es",
        placeholder: "Seleccione su tipo de negocio",
        producer: "Productor",
        manufacturer: "Fabricante",
        wholesaler: "Mayorista",
        broker: "Corredor",
        retailer: "Minorista",
        group: "Grupo",
        association: "Asociación",
        other: "Otro"
      },
      employeeCount: {
        label: "Número de empleados",
        placeholder: "Seleccione número de empleados"
      },
      website: "Sitio web",
      businessDescription: {
        label: "Descripción del negocio",
        hint: "Aproveche este espacio para describir bien su empresa, su negocio, sus mercados, etc. Esta información se compartirá con sus contactos antes de cualquier interacción."
      },
      capabilities: {
        label: "Indicaciones sobre sus capacidades",
        hint: "Aproveche este espacio para especificar, si lo desea, su facturación, garantías o cualquier indicación que pueda garantizar la seriedad de su empresa."
      }
    }
  }
};
