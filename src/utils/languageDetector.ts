/**
 * Language Detection Utility for Multilingual SEO
 * Detects user's preferred language from browser, localStorage, or URL
 */

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'pt', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Language metadata for each supported language
 */
export const LANGUAGE_METADATA: Record<SupportedLanguage, {
  name: string;
  nativeName: string;
  locale: string;
  hreflang: string;
}> = {
  en: {
    name: 'English',
    nativeName: 'English',
    locale: 'en_US',
    hreflang: 'en',
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    locale: 'fr_CH',
    hreflang: 'fr-CH',
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    locale: 'de_CH',
    hreflang: 'de-CH',
  },
  pt: {
    name: 'Portuguese (Brazilian)',
    nativeName: 'Português (Brasil)',
    locale: 'pt_BR',
    hreflang: 'pt-BR',
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    locale: 'es_ES',
    hreflang: 'es',
  },
};

/**
 * Extract language code from browser language string
 * Examples: 'en-US' -> 'en', 'fr' -> 'fr', 'pt-BR' -> 'pt'
 */
function extractLanguageCode(lang: string): string {
  return lang.toLowerCase().split('-')[0];
}

/**
 * Check if a language code is supported
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Get language from URL path
 * Examples: '/en/about' -> 'en', '/fr/' -> 'fr', '/' -> null
 */
export function getLanguageFromPath(path: string = window.location.pathname): SupportedLanguage | null {
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return null;
  }

  const firstSegment = pathSegments[0];

  return isSupportedLanguage(firstSegment) ? firstSegment : null;
}

/**
 * Get language from localStorage
 */
export function getLanguageFromStorage(): SupportedLanguage | null {
  try {
    const stored = localStorage.getItem('i18nextLng');
    if (stored && isSupportedLanguage(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return null;
}

/**
 * Get language from browser Accept-Language header via navigator
 */
export function getLanguageFromBrowser(): SupportedLanguage | null {
  try {
    // Get browser languages in order of preference
    const browserLanguages = navigator.languages || [navigator.language];

    for (const browserLang of browserLanguages) {
      const langCode = extractLanguageCode(browserLang);
      if (isSupportedLanguage(langCode)) {
        return langCode;
      }
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }
  return null;
}

/**
 * Detect user's preferred language using multiple strategies
 * Priority order:
 * 1. URL path (e.g., /fr/about)
 * 2. localStorage (user's previous selection)
 * 3. Browser language
 * 4. Default language (en)
 */
export function detectLanguage(): SupportedLanguage {
  // 1. Check URL path first (highest priority)
  const pathLang = getLanguageFromPath();
  if (pathLang) {
    return pathLang;
  }

  // 2. Check localStorage (user's previous preference)
  const storedLang = getLanguageFromStorage();
  if (storedLang) {
    return storedLang;
  }

  // 3. Check browser language
  const browserLang = getLanguageFromBrowser();
  if (browserLang) {
    return browserLang;
  }

  // 4. Fall back to default language
  return DEFAULT_LANGUAGE;
}

/**
 * Build language-specific URL
 */
export function buildLanguageUrl(
  language: SupportedLanguage,
  basePath: string = '',
  baseUrl: string = 'https://carlosmello.work'
): string {
  const cleanPath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return `${baseUrl}/${language}${cleanPath}`;
}

/**
 * Get all alternate language URLs for hreflang tags
 */
export function getAlternateLanguageUrls(
  currentPath: string = '',
  baseUrl: string = 'https://carlosmello.work'
): Array<{ lang: SupportedLanguage; hreflang: string; url: string }> {
  return SUPPORTED_LANGUAGES.map(lang => ({
    lang,
    hreflang: LANGUAGE_METADATA[lang].hreflang,
    url: buildLanguageUrl(lang, currentPath, baseUrl),
  }));
}

/**
 * Get canonical URL for current language
 */
export function getCanonicalUrl(
  language: SupportedLanguage,
  currentPath: string = '',
  baseUrl: string = 'https://carlosmello.work'
): string {
  return buildLanguageUrl(language, currentPath, baseUrl);
}

/**
 * Navigate to a specific language version
 */
export function navigateToLanguage(language: SupportedLanguage, currentPath: string = ''): void {
  const url = buildLanguageUrl(language, currentPath, window.location.origin);
  window.location.href = url;
}

/**
 * Check if we're on the root path (for redirect logic)
 */
export function isRootPath(path: string = window.location.pathname): boolean {
  return path === '/' || path === '';
}
