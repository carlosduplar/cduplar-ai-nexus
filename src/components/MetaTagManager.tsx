import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  generateMetaTags,
  generateHrefLangTags,
  MetaTags,
  HrefLangTag,
} from '@/utils/seoUtils';
import { SupportedLanguage } from '@/utils/languageDetector';

const MetaTagManager: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;

  // 1. Get SEO data from translation file
  const seoData = t('seo', { returnObjects: true }) as {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };

  // 2. Generate Meta Tags
  // Use window.location.pathname to ensure correct path for canonical and hreflang tags
  const currentPath = window.location.pathname.replace(/^\/[a-z]{2}\/?/, '/'); // Remove /lang/ prefix if present
  const metaTags: MetaTags = generateMetaTags(currentLanguage, seoData, currentPath);

  // 3. Generate Hreflang Tags
  const hrefLangTags: HrefLangTag[] = generateHrefLangTags(currentPath);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <link rel="canonical" href={metaTags.canonical} />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:title" content={metaTags.ogTitle} />
      <meta property="og:description" content={metaTags.ogDescription} />
      <meta property="og:image" content={metaTags.ogImage} />
      <meta property="og:url" content={metaTags.ogUrl} />
      <meta property="og:type" content={metaTags.ogType} />
      <meta property="og:locale" content={metaTags.ogLocale} />
      {metaTags.ogLocaleAlternate.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content={metaTags.twitterCard} />
      <meta name="twitter:title" content={metaTags.twitterTitle} />
      <meta name="twitter:description" content={metaTags.twitterDescription} />
      <meta name="twitter:image" content={metaTags.twitterImage} />
      {metaTags.twitterCreator && (
        <meta name="twitter:creator" content={metaTags.twitterCreator} />
      )}

      {/* Hreflang Tags for Multilingual SEO */}
      {hrefLangTags.map((tag) => (
        <link
          key={tag.hreflang}
          rel="alternate"
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}
    </Helmet>
  );
};

export default MetaTagManager;