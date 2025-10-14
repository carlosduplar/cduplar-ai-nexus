/**
 * SEO Utilities for Multilingual Website
 * Provides helper functions for meta tags, structured data, and SEO optimization
 */

import type { SupportedLanguage } from './languageDetector';
import { LANGUAGE_METADATA, getAlternateLanguageUrls, getCanonicalUrl } from './languageDetector';

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogLocale: string;
  ogLocaleAlternate: string[];
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCreator?: string;
}

export interface HrefLangTag {
  hreflang: string;
  href: string;
}

/**
 * Generate meta tags for a specific language and page
 */
export function generateMetaTags(
  language: SupportedLanguage,
  seoData: {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
  },
  currentPath: string = '',
  baseUrl: string = 'https://carlosmello.work'
): MetaTags {
  const canonical = getCanonicalUrl(language, currentPath, baseUrl);
  const ogImage = `${baseUrl}/carlos-profile.jpg`;
  const locale = LANGUAGE_METADATA[language].locale;

  // Get alternate locales for og:locale:alternate
  const alternateLocales = Object.keys(LANGUAGE_METADATA)
    .filter(lang => lang !== language)
    .map(lang => LANGUAGE_METADATA[lang as SupportedLanguage].locale);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical,
    ogTitle: seoData.ogTitle || seoData.title,
    ogDescription: seoData.ogDescription || seoData.description,
    ogImage,
    ogUrl: canonical,
    ogType: 'profile',
    ogLocale: locale,
    ogLocaleAlternate: alternateLocales,
    twitterCard: 'summary_large_image',
    twitterTitle: seoData.twitterTitle || seoData.title,
    twitterDescription: seoData.twitterDescription || seoData.description,
    twitterImage: ogImage,
    twitterCreator: '@carlosduplar',
  };
}

/**
 * Generate hreflang tags for all language versions
 */
export function generateHrefLangTags(
  currentPath: string = '',
  baseUrl: string = 'https://carlosmello.work'
): HrefLangTag[] {
  const alternates = getAlternateLanguageUrls(currentPath, baseUrl);

  const tags: HrefLangTag[] = alternates.map(alt => ({
    hreflang: alt.hreflang,
    href: alt.url,
  }));

  // Add x-default pointing to English version
  tags.push({
    hreflang: 'x-default',
    href: `${baseUrl}/en${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`,
  });

  return tags;
}

/**
 * Person Schema.org structured data
 */
export interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email: string;
  telephone: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressCountry: string;
  };
  worksFor: {
    '@type': string;
    name: string;
    url: string;
  };
  alumniOf: {
    '@type': string;
    name: string;
  };
  knowsAbout: string[];
  sameAs: string[];
  awards?: string[];
}

/**
 * Generate Person structured data
 */
export function generatePersonSchema(language: SupportedLanguage): PersonSchema {
  const baseUrl = 'https://carlosmello.work';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Carlos Duplar Mello',
    jobTitle: 'Digital Transformation Product Owner & AI Specialist',
    description:
      'Digital Transformation Project Manager at HEIG-VD with 15+ years of product lifecycle management experience. Google Certified GenAI Leader specializing in AI-powered solutions and scalable digital products.',
    url: `${baseUrl}/${language}/`,
    image: `${baseUrl}/carlos-profile.jpg`,
    email: 'me@carlosmello.work',
    telephone: '+41774903240',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Biel/Bienne',
      addressCountry: 'CH',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'HEIG-VD',
      url: 'https://heig-vd.ch',
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'HEIG-VD',
    },
    knowsAbout: [
      'Digital Transformation',
      'Artificial Intelligence',
      'Product Management',
      'Machine Learning',
      'Scrum',
      'Agile Methodology',
      'Large Language Models',
      'GenAI',
      'IoT',
      'SaaS',
      'Power BI',
      'Python',
    ],
    sameAs: ['https://linkedin.com/in/carlosduplar', 'https://github.com/carlosduplar'],
    awards: [
      'Google Cloud Generative AI Leader',
      'Professional Scrum Product Owner II (PSPO II)',
      'Professional Scrum Master II (PSM II)',
      'Microsoft Data Analyst Associate',
    ],
  };
}

/**
 * BreadcrumbList Schema.org structured data
 */
export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  language: SupportedLanguage,
  breadcrumbs: Array<{ name: string; path: string }>,
  baseUrl: string = 'https://carlosmello.work'
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}/${language}${crumb.path}`,
    })),
  };
}

/**
 * EducationalOccupationalCredential Schema.org structured data
 */
export interface CredentialSchema {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  credentialCategory: string;
  recognizedBy: {
    '@type': string;
    name: string;
  };
  dateCreated: string;
  url?: string;
  identifier?: string;
}

/**
 * Generate EducationalOccupationalCredential structured data for certifications
 */
export function generateCredentialSchema(certification: {
  title: string;
  issuer: string;
  date: string;
  credential?: string;
  category: string;
  link?: string;
}): CredentialSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: certification.title,
    credentialCategory: certification.category,
    recognizedBy: {
      '@type': 'Organization',
      name: certification.issuer,
    },
    dateCreated: certification.date,
    url: certification.link,
    identifier: certification.credential,
  };
}

/**
 * Organization Schema.org structured data
 */
export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(org: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
  };
}

/**
 * Sanitize text for SEO (remove excessive whitespace, special characters)
 */
export function sanitizeForSEO(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[\r\n]+/g, ' ') // Replace newlines with space
    .trim();
}

/**
 * Truncate text to specific length for meta descriptions
 */
export function truncateText(text: string, maxLength: number = 160): string {
  const sanitized = sanitizeForSEO(text);
  if (sanitized.length <= maxLength) {
    return sanitized;
  }
  return sanitized.slice(0, maxLength - 3) + '...';
}

/**
 * Generate slug from text (for URLs)
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Review Schema.org structured data
 */
export interface ReviewSchema {
  '@context': string;
  '@type': string;
  author: {
    '@type': string;
    name: string;
    jobTitle?: string;
    url?: string;
  };
  reviewBody: string;
  datePublished: string;
  reviewRating?: {
    '@type': string;
    ratingValue: number;
    bestRating: number;
  };
  itemReviewed: {
    '@type': string;
    name: string;
  };
}

/**
 * Generate Review structured data for testimonials
 */
export function generateReviewSchema(testimonial: {
  name: string;
  title: string;
  company: string;
  linkedIn: string;
  date: string;
  text: string;
}): ReviewSchema {
  // Parse date to ISO format
  const parseDateToISO = (dateStr: string): string => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name,
      jobTitle: `${testimonial.title} at ${testimonial.company}`,
      url: testimonial.linkedIn,
    },
    reviewBody: testimonial.text,
    datePublished: parseDateToISO(testimonial.date),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
    },
    itemReviewed: {
      '@type': 'Person',
      name: 'Carlos Duplar Mello',
    },
  };
}
