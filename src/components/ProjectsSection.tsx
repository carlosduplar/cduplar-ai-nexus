import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, TrendingUp, Brain, Monitor, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectsSection = () => {
  const { t } = useTranslation();

  // Helper function to translate projects safely
  const getTranslatedProjects = () => {
    try {
      const projects = t('projects.items', { returnObjects: true });
      return Array.isArray(projects) ? projects : [];
    } catch {
      return [];
    }
  };

  const getProjectIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('machine learning') || categoryLower.includes('ai')) {
      return <Brain className="w-6 h-6" />;
    } else if (categoryLower.includes('web') || categoryLower.includes('development')) {
      return <Monitor className="w-6 h-6" />;
    } else if (categoryLower.includes('analytics') || categoryLower.includes('bi')) {
      return <TrendingUp className="w-6 h-6" />;
    } else if (categoryLower.includes('iot') || categoryLower.includes('automation')) {
      return <Zap className="w-6 h-6" />;
    } else if (categoryLower.includes('tools')) {
      return <Brain className="w-6 h-6" />;
    } else {
      return <Monitor className="w-6 h-6" />;
    }
  };

  const projectTechnologies = [
    ["Claude Code", "Gemini CLI", "AI Guardrails", "Multi-Agent Architecture", "Token Optimization Strategies"],
    ["Lovable", "Claude Code", "i18next", "React", "TypeScript", "Vite", "Tailwind CSS"],
    ["Python", "scikit-learn", "Time Series Analysis", "Data Visualization"],
    ["Ollama", "OpenWebUI", "LangChain", "Langfuse", "Qdrant", "Docker"],
    ["Power BI", "Python", "API Integration", "Statistical Analysis"],
    ["OPC-UA", "MTConnect", "Azure IoT", "Power BI", "Real-time Analytics"]
  ];

  const projectLinks = [
    "https://github.com/carlosduplar/claude-gemini-delegation",
    "https://github.com/carlosduplar/cduplar-ai-nexus",
    "https://www.loom.com/share/b279ea3dc3b849469e5336fbcaedc202?sid=78694866-4a67-4d7f-b2a3-dbc90efb4550",
    "https://myaibox.carlosmello.work",
    "https://www.loom.com/share/13c00e3264d64c948e5bcd3894979cf8?sid=2b2d4a38-ea87-439c-929c-b2a1ca4e24b2",
    "https://www.gfms.com/en-us/machines/digitalization/myrconnect/analytics.html"
  ];

  const getStatusColor = (status: string) => {
    const translatedProduction = t('projects.statuses.production');
    const translatedActiveDevelopment = t('projects.statuses.activeDevelopment');
    const translatedCompleted = t('projects.statuses.completed');

    switch (status) {
      case translatedProduction:
        return "bg-green-100 text-green-800 border-green-200";
      case translatedActiveDevelopment:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case translatedCompleted:
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain size={16} />
              {t('projects.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 fade-in-up">
            {getTranslatedProjects().map((project, index) => (
              <div
                key={`project-${project.title}`}
                className="professional-card group h-full flex flex-col"
              >
                {/* Project Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 hero-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <div className="text-primary-foreground">
                      {getProjectIcon(project.category)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Key Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">{t('projects.labels.keyAchievements')}</h4>
                  <div className="space-y-2">
                    {project.achievements.map((achievement) => (
                      <div
                        key={`achievement-${achievement}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">{t('projects.labels.technologiesUsed')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {projectTechnologies[index]?.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-primary/20 text-primary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Link */}
                {projectLinks[index] && (
                  <div className="mt-auto pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      className="w-full group/btn"
                      asChild
                    >
                      <a
                        href={projectLinks[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {projectLinks[index].includes('github.com') ? (
                          <>
                            <Github size={16} />
                            {t('projects.labels.viewOnGithub') || 'View on GitHub'}
                          </>
                        ) : (
                          <>
                            <ExternalLink size={16} />
                            {t('projects.labels.viewProject') || 'View Project'}
                          </>
                        )}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Projects CTA */}
          <div className="text-center mt-16 fade-in-up">
            <div className="professional-card inline-block">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  {t('projects.cta.title')}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {t('projects.cta.description')}
                </p>
                <Button
                  className="hero-gradient glow-effect"
                  onClick={() => {
                    const element = document.querySelector("#contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {t('projects.cta.button')}
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;