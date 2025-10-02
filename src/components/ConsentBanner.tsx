import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  hasConsent,
  acceptAllConsent,
  rejectAllConsent,
  saveConsentState,
  initializeConsent,
  type ConsentState,
} from '@/utils/consent';

export const ConsentBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Initialize consent on mount
    initializeConsent();

    // Show banner if user hasn't made a choice
    setShowBanner(!hasConsent());
  }, []);

  const handleAcceptAll = () => {
    acceptAllConsent();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    rejectAllConsent();
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSavePreferences = () => {
    saveConsentState(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  const togglePreference = (key: keyof ConsentState) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
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
                onClick={handleRejectAll}
                className="w-full sm:w-auto"
              >
                {t('consent.rejectAll')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCustomize}
                className="w-full sm:w-auto"
              >
                {t('consent.customize')}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                {t('consent.acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('consent.settings.title')}</DialogTitle>
            <DialogDescription>
              {t('consent.settings.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies - Always enabled */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="text-base font-semibold">
                  {t('consent.settings.essential.title')}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('consent.settings.essential.description')}
                </p>
              </div>
              <Switch checked disabled className="mt-1" />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                  {t('consent.settings.analytics.title')}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('consent.settings.analytics.description')}
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={() => togglePreference('analytics')}
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor="marketing" className="text-base font-semibold cursor-pointer">
                  {t('consent.settings.marketing.title')}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('consent.settings.marketing.description')}
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={() => togglePreference('marketing')}
                className="mt-1"
              />
            </div>

            {/* Preference Cookies */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor="preferences" className="text-base font-semibold cursor-pointer">
                  {t('consent.settings.preferences.title')}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('consent.settings.preferences.description')}
                </p>
              </div>
              <Switch
                id="preferences"
                checked={preferences.preferences}
                onCheckedChange={() => togglePreference('preferences')}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleRejectAll}
              className="w-full sm:w-auto"
            >
              {t('consent.rejectAll')}
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto"
            >
              {t('consent.savePreferences')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
