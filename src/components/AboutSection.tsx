import { Badge } from "@/components/ui/badge";
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
  const achievements = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      stat: "79%",
      description: "Cut service response times",
      detail: "at Georg Fischer Machining Solutions"
    },
    {
      icon: <Users className="w-5 h-5" />,
      stat: "8.2M",
      description: "User base grown",
      detail: "TIM Brazil mobile app"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      stat: "5x",
      description: "User adoption increase",
      detail: "Siemens global SaaS platform"
    },
    {
      icon: <Target className="w-5 h-5" />,
      stat: "39%",
      description: "QoQ machine connection growth",
      detail: "since Q3 2023 at GFMS"
    }
  ];

  const coreStrengths = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI & Technology Leadership",
      description: "Google Certified GenAI Leader with hands-on experience in LLMs, RAG architectures, and prompt engineering. Leading AI initiatives and coaching teams on generative AI adoption."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Cross-functional Team Leadership",
      description: "15+ years managing complex stakeholder relationships across manufacturing, telecom, education, and enterprise IT, ensuring alignment between technical and business objectives."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Digital Transformation Strategy",
      description: "Proven track record of translating complex technical challenges into scalable digital products that drive measurable business impact and operational efficiency."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multilingual & Global Perspective",
      description: "Native fluency in Portuguese and English, professional working proficiency in French, German, and Spanish, enabling effective collaboration across diverse international teams."
    }
  ];

  return (
    <section id="about" className="py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award size={16} />
              About Carlos
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Bridging Technical Excellence with Strategic Vision
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Currently serving as Digital Transformation Project Manager at HEIG-VD, I deliver innovative 
              EdTech solutions aligned with HES-SO's digital transformation roadmap, advancing Swiss public education 
              through strategic technology implementation.
            </p>
          </div>

          {/* Key Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 fade-in-up">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="professional-card text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 hero-gradient rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-primary-foreground">
                    {achievement.icon}
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
              Core Strengths & Expertise
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {coreStrengths.map((strength, index) => (
                <div
                  key={index}
                  className="professional-card group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <div className="text-primary-foreground">
                        {strength.icon}
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
                Professional Journey
              </h3>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  My 15+ years of product lifecycle management across manufacturing, telecom, and enterprise IT 
                  have shaped my approach to data-driven decision making and stakeholder alignment. At GF Machining 
                  Solutions, I delivered real-time machine monitoring dashboards and SaaS migration programs that 
                  enhanced operational transparency globally.
                </p>
                <p className="leading-relaxed">
                  At Siemens, I scaled a password management SaaS to 13+ countries while building internal BI tools 
                  for user experience optimization. As a recognized AI advocate, I was selected for Microsoft 365 
                  Copilot pilots and coached global teams on prompt engineering best practices.
                </p>
                <p className="leading-relaxed">
                  Currently experimenting with self-hosted LLM stacks (Ollama, OpenWebUI, LangChain, Langfuse, Qdrant) 
                  to deepen understanding of AI product infrastructure and drive innovation in educational technology. 
                  I combine Agile methodologies with technical depth to turn complex requirements into usable, scalable products.
                </p>
              </div>
              
              {/* Tech Stack Badges */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-4">Technical Expertise:</p>
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