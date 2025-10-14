/**
 * LanguageRedirect Component
 * Detects user's preferred language and redirects to appropriate language URL
 * Used on the root route (/) to ensure all users land on a language-specific page
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectLanguage } from '@/utils/languageDetector';

const LanguageRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect the user's preferred language
    const detectedLanguage = detectLanguage();

    // Redirect to the detected language version
    navigate(`/${detectedLanguage}`, { replace: true });
  }, [navigate]);

  // Show nothing while redirecting
  return null;
};

export default LanguageRedirect;
