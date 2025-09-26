import {
  Brain,
  Users,
  Cog,
  BarChart3,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Lightbulb,
  Database,
  Cloud,
  Code
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ExpertiseSection = () => {
  const { t } = useTranslation();

  // Helper function to translate arrays safely
  const getTranslatedSkills = (area: string) => {
    try {
      const skills = t(`expertise.areas.${area}.skills`, { returnObjects: true });
      return Array.isArray(skills) ? skills : [];
    } catch {
      return [];
    }
  };

  const getTranslatedTechnologies = (category: string) => {
    try {
      const technologies = t(`expertise.techStack.categories.${category}.technologies`, { returnObjects: true });
      return Array.isArray(technologies) ? technologies : [];
    } catch {
      return [];
    }
  };

  const getTranslatedAchievements = () => {
    try {
      const achievements = t('expertise.achievements', { returnObjects: true });
      return Array.isArray(achievements) ? achievements : [];
    } catch {
      return [];
    }
  };

  const expertiseAreas = [
    {
      category: "Product & Strategy",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      skills: [
        "Data-Driven Prioritization",
        "Agile (Scrum, SAFe)",
        "Stakeholder Management",
        "Digital Transformation"
      ]
    },
    {
      category: "AI & Technology",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      skills: [
        "AI Agents & MCP",
        "LLM/RAG Architectures",
        "Prompt Engineering",
        "Cloud Platforms (Azure, GCP)"
      ]
    },
    {
      category: "Leadership",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      skills: [
        "Cross-functional Team Leadership",
        "Change Management",
        "Value Metrics & KPIs",
        "Risk & Compliance"
      ]
    }
  ];

  const technicalStack = [
    {
      category: "AI & ML",
      icon: <Brain className="w-6 h-6" />,
      technologies: ["OpenAI/Gemini APIs", "Ollama", "LangChain", "Qdrant", "scikit-learn", "Prompt Engineering"]
    },
    {
      category: "Data & BI",
      icon: <BarChart3 className="w-6 h-6" />,
      technologies: ["Power BI", "Python", "SQL", "Databricks", "Power Automate", "Data Visualization"]
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      technologies: ["Azure", "GCP", "Docker", "Git", "API Integration", "SaaS Platforms"]
    },
    {
      category: "Product Tools",
      icon: <Cog className="w-6 h-6" />,
      technologies: ["Jira", "Figma", "Confluence", "Scrum", "SAFe", "Design Thinking"]
    }
  ];

  return (
    <section id="expertise" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lightbulb size={16} />
              {t('expertise.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('expertise.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('expertise.subtitle')}
            </p>
          </div>

          {/* Expertise Grid with Skill Levels */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20 fade-in-up">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="professional-card group"
              >
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${area.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <div className="text-white">
                      {area.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {index === 0 ? t('expertise.areas.productStrategy.title') :
                     index === 1 ? t('expertise.areas.aiTechnology.title') :
                     t('expertise.areas.leadership.title')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {(index === 0 ? getTranslatedSkills('productStrategy') :
                    index === 1 ? getTranslatedSkills('aiTechnology') :
                    getTranslatedSkills('leadership')).map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="text-sm text-muted-foreground bg-secondary-light px-3 py-2 rounded-lg font-medium"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Stack */}
          <div className="fade-in-up">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('expertise.techStack.title')}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('expertise.techStack.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalStack.map((stack, index) => (
                <div
                  key={index}
                  className="professional-card group text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 hero-gradient rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    <div className="text-primary-foreground">
                      {stack.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    {index === 0 ? t('expertise.techStack.categories.aiMl.title') :
                     index === 1 ? t('expertise.techStack.categories.dataBi.title') :
                     index === 2 ? t('expertise.techStack.categories.cloudDevops.title') :
                     t('expertise.techStack.categories.productTools.title')}
                  </h4>

                  <div className="space-y-2">
                    {(index === 0 ? getTranslatedTechnologies('aiMl') :
                      index === 1 ? getTranslatedTechnologies('dataBi') :
                      index === 2 ? getTranslatedTechnologies('cloudDevops') :
                      getTranslatedTechnologies('productTools')).map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="text-sm text-muted-foreground bg-secondary-light px-3 py-1 rounded-full inline-block mr-1 mb-1 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements Highlight */}
          <div className="mt-20 professional-card fade-in-up">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {getTranslatedAchievements().map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{achievement.value}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  <div className="text-xs text-muted-foreground">{achievement.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;