import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es },
};

// Custom path detector for i18next to read language from URL
const pathDetector = {
  name: 'pathDetector',
  lookup() {
    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(Boolean);

    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      const supportedLngs = ['en', 'pt', 'fr', 'de', 'es'];

      if (supportedLngs.includes(firstSegment)) {
        return firstSegment;
      }
    }

    return undefined;
  }
};

// Register the custom detector
const languageDetector = new LanguageDetector();
languageDetector.addDetector(pathDetector);

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt', 'fr', 'de', 'es'],
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      // Detection order: URL path > localStorage > browser language > fallback
      // This ensures URL takes priority and prevents flash of wrong language
      order: ['pathDetector', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      // Convert browser language codes to supported languages
      convertDetectedLanguage: (lng: string) => {
        // Extract base language code (e.g., 'en-US' -> 'en', 'pt-BR' -> 'pt')
        const baseLanguage = lng.split('-')[0].toLowerCase();
        // Return base language if supported, otherwise return as-is for fallback handling
        return ['en', 'pt', 'fr', 'de', 'es'].includes(baseLanguage) ? baseLanguage : lng;
      }
    }
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;