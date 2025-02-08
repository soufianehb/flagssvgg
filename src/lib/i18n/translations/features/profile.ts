
import { tabs } from './profile/tabs';
import { general } from './profile/general';
import { settings } from './profile/settings';
import { additionalInfo } from './profile/additional-info';

export const profile = {
  en: {
    title: "Profile Settings",
    tabs: { ...tabs.en },
    general: {
      ...general.en,
    },
    ...settings.en,
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
    ...settings.fr,
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
    ...settings.es,
    additionalInfo: {
      ...additionalInfo.es,
    }
  }
};
