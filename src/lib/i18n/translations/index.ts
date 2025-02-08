
import { filters } from './features/filters';
import { navigation } from './features/navigation';
import { footer } from './features/footer';
import { auth } from './features/auth';
import { profile } from './features/profile';

export const translations = {
  en: {
    filters: filters.en,
    nav: navigation.en,
    footer: footer.en,
    ...auth.en,
    profile: profile.en,
  },
  fr: {
    filters: filters.fr,
    nav: navigation.fr,
    footer: footer.fr,
    ...auth.fr,
    profile: profile.fr,
  },
  es: {
    filters: filters.es,
    nav: navigation.es,
    footer: footer.es,
    ...auth.es,
    profile: profile.es,
  }
};

export type Language = 'en' | 'fr' | 'es';
