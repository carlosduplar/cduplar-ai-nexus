// Simple Consent Management for Google Analytics

const CONSENT_STORAGE_KEY = 'analytics-consent';

/**
 * Check if user has already made a consent choice
 */
export const hasConsent = (): boolean => {
  return localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
};

/**
 * Update Google Consent Mode with analytics preference
 */
export const updateGoogleConsent = (analytics: boolean): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
    });
  }
};

/**
 * Accept analytics cookies
 */
export const acceptConsent = (): void => {
  localStorage.setItem(CONSENT_STORAGE_KEY, 'true');
  updateGoogleConsent(true);
};

/**
 * Reject analytics cookies
 */
export const rejectConsent = (): void => {
  localStorage.setItem(CONSENT_STORAGE_KEY, 'false');
  updateGoogleConsent(false);
};

/**
 * Initialize consent on page load
 */
export const initializeConsent = (): void => {
  const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (consent !== null) {
    updateGoogleConsent(consent === 'true');
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
