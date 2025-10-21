import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Users,
  Globe,
  Award,
  Brain,
  Target,
  Lightbulb,
  BarChart3
} from "lucide-react";

const AboutSection = () => {
  const { t } = useTranslation();

  // Helper functions to translate arrays safely
  const getTranslatedAchievements = () => {
    try {
      const achievements = t('about.achievements', { returnObjects: true });
      return Array.isArray(achievements) ? achievements : [];
    } catch {
      return [];
    }
  };

  const getTranslatedCoreStrengths = () => {
    try {
      const coreStrengths = t('about.coreStrengths', { returnObjects: true });
      return Array.isArray(coreStrengths) ? coreStrengths : [];
    } catch {
      return [];
    }
  };

  const achievementIcons = [
    <TrendingUp className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <BarChart3 className="w-5 h-5" />,
    <Target className="w-5 h-5" />
  ];

  const coreStrengthIcons = [
    <Brain className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
    <Lightbulb className="w-6 h-6" />,
    <Globe className="w-6 h-6" />
  ];

  return (
    <section id="about" className="py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award size={16} />
              {t('about.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>

          {/* Key Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 fade-in-up">
            {getTranslatedAchievements().map((achievement, index) => (
              <div
                key={`achievement-${achievement.stat}-${achievement.description}`}
                className="professional-card text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 hero-gradient rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-primary-foreground">
                    {achievementIcons[index]}
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary mb-2">
                  {achievement.stat}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {achievement.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Core Strengths */}
          <div className="space-y-8 fade-in-up">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">
              {t('about.coreStrengthsTitle')}
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {getTranslatedCoreStrengths().map((strength, index) => (
                <div
                  key={`strength-${strength.title}`}
                  className="professional-card group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <div className="text-primary-foreground">
                        {coreStrengthIcons[index]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {strength.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mt-16 professional-card fade-in-up">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                {t('about.professionalJourney.title')}
              </h3>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {t('about.professionalJourney.paragraph1')}
                </p>
                <p className="leading-relaxed">
                  {t('about.professionalJourney.paragraph2')}
                </p>
                <p className="leading-relaxed">
                  {t('about.professionalJourney.paragraph3')}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-4">{t('about.technicalExpertise')}</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python", "SQL", "Azure", "GCP", "Power BI", "Databricks", 
                    "LangChain", "Ollama", "OpenAI APIs", "Agile/Scrum", "SAFe"
                  ].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary-light text-secondary hover:bg-secondary hover:text-secondary-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;