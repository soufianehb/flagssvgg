
import { tabs } from './tabs';
import { general } from './general';
import { additionalInfo } from './additional-info';
import { security } from './security';
import { avatar } from './avatar';

export const profile = {
  en: {
    title: "Profile Settings",
    tabs: { ...tabs.en },
    general: {
      ...general.en,
    },
    settings: {
      security: {
        ...security.en,
      },
      avatar: {
        ...avatar.en
      }
    },
    additionalInfo: {
      ...additionalInfo.en,
    },
    avatar: {
      ...avatar.en
    }
  },
  fr: {
    title: "Paramètres du profil",
    tabs: { ...tabs.fr },
    general: {
      ...general.fr,
    },
    settings: {
      security: {
        ...security.fr,
      },
      avatar: {
        ...avatar.fr
      }
    },
    additionalInfo: {
      ...additionalInfo.fr,
    },
    avatar: {
      ...avatar.fr
    }
  },
  es: {
    title: "Configuración del perfil",
    tabs: { ...tabs.es },
    general: {
      ...general.es,
    },
    settings: {
      security: {
        ...security.es,
      },
      avatar: {
        ...avatar.es
      }
    },
    additionalInfo: {
      ...additionalInfo.es,
    },
    avatar: {
      ...avatar.es
    }
  }
};

