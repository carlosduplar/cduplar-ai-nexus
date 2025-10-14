import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isSupportedLanguage, DEFAULT_LANGUAGE } from "@/utils/languageDetector";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const [languageReady, setLanguageReady] = useState(false);

  // Sync i18n language with URL parameter and wait for it to be ready
  useEffect(() => {
    const targetLanguage = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

    if (i18n.language === targetLanguage) {
      setLanguageReady(true);
    } else {
      i18n.changeLanguage(targetLanguage).then(() => {
        setLanguageReady(true);
      });
    }
  }, [lang, i18n]);

  // Don't render until language is properly set
  if (!languageReady) {
    return null;
  }

  return (
    <div key={i18n.language} className="min-h-screen bg-background" suppressHydrationWarning>
      <Navigation key={`nav-${i18n.language}`} />
      <HeroSection key={`hero-${i18n.language}`} />
      <main>
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
