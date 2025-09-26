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

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      category: "Product & Strategy",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      skills: [
        { name: "Data-Driven Prioritization", level: 95 },
        { name: "Agile (Scrum, SAFe)", level: 92 },
        { name: "Stakeholder Management", level: 90 },
        { name: "Digital Transformation", level: 88 }
      ]
    },
    {
      category: "AI & Technology",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      skills: [
        { name: "AI Agents & MCP", level: 88 },
        { name: "LLM/RAG Architectures", level: 85 },
        { name: "Prompt Engineering", level: 90 },
        { name: "Cloud Platforms (Azure, GCP)", level: 82 }
      ]
    },
    {
      category: "Leadership",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      skills: [
        { name: "Cross-functional Team Leadership", level: 93 },
        { name: "Change Management", level: 87 },
        { name: "Value Metrics & KPIs", level: 89 },
        { name: "Risk & Compliance", level: 85 }
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
              Core Expertise
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Skills That Drive Innovation
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A comprehensive skill set combining strategic product thinking, cutting-edge AI expertise, 
              and proven leadership capabilities built over 15+ years of delivering complex digital solutions.
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
                    {area.category}
                  </h3>
                </div>

                <div className="space-y-6">
                  {area.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-primary font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-fill"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
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
                Technical Stack & Tools
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hands-on experience with modern technologies and platforms that enable rapid prototyping, 
                scalable solutions, and data-driven insights.
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
                    {stack.category}
                  </h4>
                  
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
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
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">96.4%</div>
                <div className="text-sm text-muted-foreground">ML Model Accuracy</div>
                <div className="text-xs text-muted-foreground">Energy Forecast Model</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">13+</div>
                <div className="text-sm text-muted-foreground">Countries Scaled</div>
                <div className="text-xs text-muted-foreground">Siemens SaaS Platform</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">30+</div>
                <div className="text-sm text-muted-foreground">Team Members Trained</div>
                <div className="text-xs text-muted-foreground">GenAI & Prompt Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;