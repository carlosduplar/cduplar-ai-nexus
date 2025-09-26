import i18n from '@/i18n';

interface MetaTranslations {
  [key: string]: {
    title: string;
    description: string;
    keywords: string;
    locale: string;
  };
}

const metaTranslations: MetaTranslations = {
  en: {
    title: "Carlos Duplar Mello - Digital Transformation Product Owner & AI Specialist",
    description: "Carlos Duplar Mello: Digital Transformation Product Owner with 15+ years experience in AI, product management, and scalable digital solutions. Google Certified GenAI Leader specializing in LLM architectures and cross-functional team leadership.",
    keywords: "Digital Transformation, Product Owner, AI Specialist, Machine Learning, Scrum, Agile, Switzerland, Product Management",
    locale: "en_US"
  },
  pt: {
    title: "Carlos Duplar Mello - Gestor de Transformação Digital e Especialista em IA",
    description: "Carlos Duplar Mello: Gestor de Produto de Transformação Digital com mais de 15 anos de experiência em IA, gestão de produtos e soluções digitais escaláveis. Líder GenAI Certificado pelo Google especializado em arquiteturas LLM e liderança de equipas multifuncionais.",
    keywords: "Transformação Digital, Product Owner, Especialista IA, Machine Learning, Scrum, Agile, Suíça, Gestão de Produtos",
    locale: "pt_BR"
  },
  fr: {
    title: "Carlos Duplar Mello - Chef de Projet Transformation Digitale et Spécialiste IA",
    description: "Carlos Duplar Mello: Chef de Projet Transformation Digitale avec plus de 15 ans d'expérience en IA, gestion de produits et solutions digitales évolutives. Leader GenAI Certifié Google spécialisé en architectures LLM et leadership d'équipes pluridisciplinaires.",
    keywords: "Transformation Digitale, Product Owner, Spécialiste IA, Machine Learning, Scrum, Agile, Suisse, Gestion de Produits",
    locale: "fr_FR"
  },
  de: {
    title: "Carlos Duplar Mello - Digital Transformation Projektmanager und KI-Spezialist",
    description: "Carlos Duplar Mello: Digital Transformation Projektmanager mit 15+ Jahren Erfahrung in KI, Produktmanagement und skalierbaren digitalen Lösungen. Google Zertifizierter GenAI Leader spezialisiert auf LLM-Architekturen und funktionsübergreifende Teamführung.",
    keywords: "Digitale Transformation, Product Owner, KI-Spezialist, Machine Learning, Scrum, Agile, Schweiz, Produktmanagement",
    locale: "de_DE"
  },
  es: {
    title: "Carlos Duplar Mello - Gestor de Transformación Digital y Especialista en IA",
    description: "Carlos Duplar Mello: Gestor de Productos de Transformación Digital con más de 15 años de experiencia en IA, gestión de productos y soluciones digitales escalables. Líder GenAI Certificado por Google especializado en arquitecturas LLM y liderazgo de equipos multifuncionales.",
    keywords: "Transformación Digital, Product Owner, Especialista IA, Machine Learning, Scrum, Agile, Suiza, Gestión de Productos",
    locale: "es_ES"
  }
};

export const updateMetaTags = (language: string = 'en') => {
  const meta = metaTranslations[language] || metaTranslations.en;

  // Update document title
  document.title = meta.title;

  // Update HTML lang attribute
  document.documentElement.lang = language;

  // Update meta description
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', meta.description);
  }

  // Update meta keywords
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) {
    keywordsMeta.setAttribute('content', meta.keywords);
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', meta.title);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', meta.description);
  }

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.setAttribute('content', meta.locale);
  }

  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', meta.title);
  }

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', meta.description);
  }
};

// Initialize meta tags on i18n language change
i18n.on('languageChanged', (lng: string) => {
  updateMetaTags(lng);
});