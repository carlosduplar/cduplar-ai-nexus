import i18n from '@/i18n';

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng: string) => {
  document.documentElement.lang = lng;
});