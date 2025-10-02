// Consent Management Utilities for Google Consent Mode v2

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const CONSENT_STORAGE_KEY = 'cookie-consent';
const CONSENT_TIMESTAMP_KEY = 'cookie-consent-timestamp';

/**
 * Get the current consent state from localStorage
 */
export const getConsentState = (): ConsentState | null => {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentState;
  } catch {
    return null;
  }
};

/**
 * Check if user has already made a consent choice
 */
export const hasConsent = (): boolean => {
  return localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
};

/**
 * Save consent state to localStorage and update Google Consent Mode
 */
export const saveConsentState = (consent: ConsentState): void => {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
    updateGoogleConsent(consent);
  } catch (error) {
    console.error('Failed to save consent state:', error);
  }
};

/**
 * Update Google Consent Mode with user preferences
 */
export const updateGoogleConsent = (consent: ConsentState): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
      functionality_storage: consent.preferences ? 'granted' : 'denied',
      personalization_storage: consent.preferences ? 'granted' : 'denied',
    });
  }
};

/**
 * Accept all cookies
 */
export const acceptAllConsent = (): void => {
  saveConsentState({
    analytics: true,
    marketing: true,
    preferences: true,
  });
};

/**
 * Reject all cookies (except essential)
 */
export const rejectAllConsent = (): void => {
  saveConsentState({
    analytics: false,
    marketing: false,
    preferences: false,
  });
};

/**
 * Initialize consent on page load
 * If user has previously consented, apply their preferences
 */
export const initializeConsent = (): void => {
  const consent = getConsentState();
  if (consent) {
    updateGoogleConsent(consent);
  }
};

// Type augmentation for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetOrAction: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}
