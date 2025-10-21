import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Building, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format, Locale } from 'date-fns';
import { useState, useEffect } from 'react';
import heigvdLogo from "@/assets/company-logos/heig-vd-logo.png";
import gfLogo from "@/assets/company-logos/gf-logo.png";
import siemensLogo from "@/assets/company-logos/siemens-logo.png";
import brqLogo from "@/assets/company-logos/brq-logo.png";
import timBrasilLogo from "@/assets/company-logos/tim-brasil-logo.png";
import infogloboLogo from "@/assets/company-logos/globo-logo.png";
import heigvdLogoWebP from "@/assets/company-logos/heig-vd-logo.webp";
import gfLogoWebP from "@/assets/company-logos/gf-logo.webp";
import siemensLogoWebP from "@/assets/company-logos/siemens-logo.webp";
import brqLogoWebP from "@/assets/company-logos/brq-logo.webp";
import timBrasilLogoWebP from "@/assets/company-logos/tim-brasil-logo.webp";
import infogloboLogoWebP from "@/assets/company-logos/globo-logo.webp";
import OptimizedImage from "@/components/OptimizedImage";

const loadLocale = async (lang: string): Promise<Locale> => {
  const localeMap: { [key: string]: { name: string, key: string } } = {
    'pt': { name: 'pt-BR', key: 'ptBR' },
    'fr': { name: 'fr', key: 'fr' },
    'de': { name: 'de', key: 'de' },
    'es': { name: 'es', key: 'es' },
    'en': { name: 'en-US', key: 'enUS' },
  };

  const { name, key } = localeMap[lang] || localeMap['en'];

  try {
    // Use a single dynamic import expression for bundler optimization
    const module = await import(`date-fns/locale/${name}`);
    return module[key];
  } catch (error) {
    // Fallback to English if the dynamic import fails
    const module = await import('date-fns/locale/en-US');
    return module.enUS;
  }
};

const ExperienceSection = () => {
  const { t, i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<Locale | null>(null);

  useEffect(() => {
    loadLocale(i18n.language).then(setCurrentLocale);
  }, [i18n.language]);

  const formatPeriod = (period: string) => {
    if (!currentLocale) return period;
    const [start, end] = period.split(' - ');

    // Parse date string "Month YYYY" format
    const parseDate = (dateStr: string) => {
      const parts = dateStr.trim().split(' ');
      if (parts.length === 2) {
        const [month, year] = parts;
        // Create date on the 1st of the month
        return new Date(`${month} 1, ${year}`);
      }
      return new Date(dateStr);
    };

    const startDate = parseDate(start);

    // Validate date before formatting
    if (isNaN(startDate.getTime())) {
      return period; // Return original if parsing fails
    }

    const formattedStart = format(startDate, 'MMM yyyy', { locale: currentLocale });

    if (end === 'Present') {
      return `${formattedStart} - ${t('experience.types.present')}`;
    }

    const endDate = parseDate(end);

    // Validate date before formatting
    if (isNaN(endDate.getTime())) {
      return `${formattedStart} - ${end}`; // Return partial formatted if end parsing fails
    }

    const formattedEnd = format(endDate, 'MMM yyyy', { locale: currentLocale });

    return `${formattedStart} - ${formattedEnd}`;
  };

  // Helper function to translate career stats safely
  const getTranslatedCareerStats = () => {
    try {
      const stats = t('experience.careerStats.stats', { returnObjects: true });
      return Array.isArray(stats) ? stats : [];
    } catch {
      return [];
    }
  };
  const logoMap: { [key: string]: string } = {
    heigvdLogo,
    gfLogo,
    siemensLogo,
    brqLogo,
    timBrasilLogo,
    infogloboLogo,
  };

  const logoWebPMap: { [key: string]: string } = {
    heigvdLogo: heigvdLogoWebP,
    gfLogo: gfLogoWebP,
    siemensLogo: siemensLogoWebP,
    brqLogo: brqLogoWebP,
    timBrasilLogo: timBrasilLogoWebP,
    infogloboLogo: infogloboLogoWebP,
  };

  const getTranslatedExperiences = () => {
    try {
      const jobs = t('experience.jobs', { returnObjects: true });
      if (Array.isArray(jobs)) {
        return jobs.map(job => ({
          ...job,
          logo: logoMap[job.logo] || infogloboLogo,
          logoWebP: logoWebPMap[job.logo] || infogloboLogoWebP,
        }));
      }
      return [];
    } catch {
      return [];
    }
  };

  const experiences = getTranslatedExperiences();

  return (
    <section id="experience" className="py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Building size={16} />
              {t('experience.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('experience.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8 fade-in-up">
            {experiences.map((exp) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className="professional-card group relative"
              >

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Company Logo & Period */}
                  <div className="flex-shrink-0">
                    <a href={exp.website} target="_blank" rel="noopener noreferrer">
                      <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 border shadow-sm">
                        <OptimizedImage
                          src={exp.logo}
                          webpSrc={exp.logoWebP}
                          alt={`${exp.company} logo`}
                          className="w-10 h-10 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </a>
                    <div className="hidden lg:block space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {formatPeriod(exp.period)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.role}
                        </h3>
                        <Badge variant="secondary" className="self-start lg:self-center">
                          {t('experience.types.fullTime')}
                        </Badge>
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {exp.company}
                      </div>
                      
                      {/* Mobile period and location */}
                      <div className="lg:hidden space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          {formatPeriod(exp.period)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      {exp.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <ArrowRight 
                            size={16} 
                            className="text-primary mt-0.5 flex-shrink-0" 
                          />
                          <span className="leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className="text-xs border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Career Stats */}
          <div className="mt-16 professional-card fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t('experience.careerStats.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('experience.careerStats.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {getTranslatedCareerStats().map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;