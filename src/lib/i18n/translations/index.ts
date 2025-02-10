
import { filters } from './features/filters';
import { navigation } from './features/navigation';
import { footer } from './features/footer';
import { auth } from './features/auth';
import { profile } from './features/profile';
import { common } from './features/common';

export const translations = {
  en: {
    filters: filters.en,
    nav: navigation.en,
    footer: footer.en,
    ...auth.en,
    profile: profile.en,
    common: common.en,
  },
  fr: {
    filters: filters.fr,
    nav: navigation.fr,
    footer: footer.fr,
    ...auth.fr,
    profile: profile.fr,
    common: common.fr,
  },
  es: {
    filters: filters.es,
    nav: navigation.es,
    footer: footer.es,
    ...auth.es,
    profile: profile.es,
    common: common.es,
  }
};

export type Language = 'en' | 'fr' | 'es';
