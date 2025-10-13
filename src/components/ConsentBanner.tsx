import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  hasConsent,
  acceptConsent,
  rejectConsent,
  initializeConsent,
} from '@/utils/consent';

export const ConsentBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    initializeConsent();
    setShowBanner(!hasConsent());
  }, []);

  const handleAccept = () => {
    acceptConsent();
    setShowBanner(false);
  };

  const handleReject = () => {
    rejectConsent();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border shadow-lg">
      <div className="container max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 text-sm">
            <p className="font-semibold mb-1">{t('consent.title')}</p>
            <p className="text-muted-foreground">
              {t('consent.description')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="w-full sm:w-auto"
            >
              {t('consent.reject')}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="w-full sm:w-auto"
            >
              {t('consent.accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
