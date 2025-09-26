import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, TrendingUp, Brain, Monitor, Zap } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Machine Learning Energy Forecast Model",
      description: "Developed a sophisticated ML model achieving 96.4% accuracy in energy consumption prediction for industrial manufacturing environments. The model uses time-series analysis and incorporates multiple environmental and operational variables.",
      category: "AI/ML",
      icon: <Brain className="w-6 h-6" />,
      technologies: ["Python", "scikit-learn", "Time Series Analysis", "Data Visualization"],
      achievements: [
        "96.4% prediction accuracy",
        "Real-time energy monitoring",
        "Cost optimization insights"
      ],
      link: "#",
      status: "Production",
      impact: "Enabled 15% reduction in energy costs"
    },
    {
      title: "Self-Hosted AI Tools & Infrastructure Lab",
      description: "Built and deployed a comprehensive AI infrastructure using open-source tools for experimentation with LLMs, vector databases, and conversational AI. This lab serves as a testing ground for AI product features and training.",
      category: "AI Infrastructure",
      icon: <Monitor className="w-6 h-6" />,
      technologies: ["Ollama", "OpenWebUI", "LangChain", "Langfuse", "Qdrant", "Docker"],
      achievements: [
        "Multi-model LLM support",
        "Vector database integration",
        "Conversation analytics"
      ],
      link: "#",
      status: "Active Development",
      impact: "Accelerated AI feature prototyping by 60%"
    },
    {
      title: "SBB Punctuality Analytics Dashboard",
      description: "Created an interactive Power BI dashboard analyzing Swiss railway punctuality patterns using public transportation data. The dashboard provides insights into delays, seasonal trends, and route performance.",
      category: "Data Analytics",
      icon: <TrendingUp className="w-6 h-6" />,
      technologies: ["Power BI", "Python", "API Integration", "Statistical Analysis"],
      achievements: [
        "Real-time delay tracking",
        "Seasonal pattern analysis",
        "Route optimization insights"
      ],
      link: "#",
      status: "Completed",
      impact: "Improved route planning efficiency"
    },
    {
      title: "GFMS Machine Monitor Dashboard",
      description: "Led the development of a real-time industrial machine monitoring system using OPC-UA and MTConnect protocols. The platform provides operational insights and predictive maintenance capabilities.",
      category: "IoT/Industrial",
      icon: <Zap className="w-6 h-6" />,
      technologies: ["OPC-UA", "MTConnect", "Azure IoT", "Power BI", "Real-time Analytics"],
      achievements: [
        "79% reduction in response times",
        "Real-time machine monitoring",
        "Predictive maintenance alerts"
      ],
      link: "#",
      status: "Production",
      impact: "39% QoQ machine connection growth"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Production":
        return "bg-green-100 text-green-800 border-green-200";
      case "Active Development":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
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
              Featured Projects
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              AI Projects & Digital Solutions
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Showcasing hands-on experience with machine learning, AI infrastructure, and data analytics 
              projects that demonstrate technical expertise and business impact.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 fade-in-up">
            {projects.map((project, index) => (
              <div
                key={index}
                className="professional-card group h-full flex flex-col"
              >
                {/* Project Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 hero-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <div className="text-primary-foreground">
                      {project.icon}
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
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements:</h4>
                  <div className="space-y-2">
                    {project.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Impact */}
                <div className="mb-6 p-3 bg-accent rounded-lg border border-accent/20">
                  <div className="text-sm font-medium text-accent-foreground">
                    Business Impact: {project.impact}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
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

                {/* Project Links */}
                <div className="flex gap-3 mt-auto">
                  <Button
                    size="sm"
                    className="flex-1 hero-gradient group"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    View Details
                    <ExternalLink 
                      size={16} 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Projects CTA */}
          <div className="text-center mt-16 fade-in-up">
            <div className="professional-card inline-block">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  Interested in More Technical Details?
                </h3>
                <p className="text-muted-foreground max-w-md">
                  I'm always working on new AI experiments and digital transformation projects. 
                  Let's discuss how these experiences can benefit your organization.
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
                  Let's Connect
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