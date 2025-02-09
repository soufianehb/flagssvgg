
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
      ...security.en,
      ...avatar.en,
    },
    additionalInfo: {
      ...additionalInfo.en,
    }
  },
  fr: {
    title: "Paramètres du profil",
    tabs: { ...tabs.fr },
    general: {
      ...general.fr,
    },
    settings: {
      ...security.fr,
      ...avatar.fr,
    },
    additionalInfo: {
      ...additionalInfo.fr,
    }
  },
  es: {
    title: "Configuración del perfil",
    tabs: { ...tabs.es },
    general: {
      ...general.es,
    },
    settings: {
      ...security.es,
      ...avatar.es,
    },
    additionalInfo: {
      ...additionalInfo.es,
    }
  }
};
