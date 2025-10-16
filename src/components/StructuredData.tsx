import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { generatePersonSchema, PersonSchema, generateCredentialSchema, CredentialSchema, generateReviewSchema, ReviewSchema } from '@/utils/seoUtils';
import { SupportedLanguage } from '@/utils/languageDetector';
import testimonials from '@/data/testimonials.json';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credential?: string;
  category: string;
  link?: string;
}

const StructuredData: React.FC = () => {
  const { i18n, t } = useTranslation();
  // The language from i18n is guaranteed to be one of the supported languages after initialization
  const currentLanguage = i18n.language as SupportedLanguage;

  // 1. Generate Person Schema (main structured data for a personal website)
  const personSchema: PersonSchema = generatePersonSchema(currentLanguage);

  // 2. Generate Credential Schemas for certifications
  const recentCertifications: Certification[] = Object.values(t('certifications.recentCertifications', { returnObjects: true }) || []) as Certification[];
  const professionalCertifications: Certification[] = Object.values(t('certifications.professionalCertifications', { returnObjects: true }) || []) as Certification[];

  // Combine all certifications
  const allCertifications = [...recentCertifications, ...professionalCertifications];

  // Generate schemas for each certification
  const credentialSchemas: CredentialSchema[] = allCertifications.map((cert) =>
    generateCredentialSchema({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      credential: cert.credential,
      category: cert.category,
      link: cert.link,
    })
  );

  // 3. Generate Review Schemas for testimonials
  const reviewSchemas: ReviewSchema[] = testimonials.map(testimonial =>
    generateReviewSchema({
      name: testimonial.name,
      title: testimonial.title,
      company: testimonial.company,
      linkedIn: testimonial.linkedIn,
      date: testimonial.date,
      text: testimonial.text,
    })
  );

  // 4. Convert all schemas to JSON-LD strings
  const personJsonLd = JSON.stringify(personSchema, null, 2);
  const credentialJsonLds = credentialSchemas.map(schema => JSON.stringify(schema, null, 2));
  const reviewJsonLds = reviewSchemas.map(schema => JSON.stringify(schema, null, 2));

  return (
    <Helmet>
      {/* Inject JSON-LD Structured Data for Person */}
      <script type="application/ld+json">{personJsonLd}</script>

      {/* Inject JSON-LD Structured Data for each Credential */}
      {credentialJsonLds.map((jsonLd, index) => (
        <script key={`credential-${index}`} type="application/ld+json">
          {jsonLd}
        </script>
      ))}

      {/* Inject JSON-LD Structured Data for each Review/Testimonial */}
      {reviewJsonLds.map((jsonLd, index) => (
        <script key={`review-${index}`} type="application/ld+json">
          {jsonLd}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;