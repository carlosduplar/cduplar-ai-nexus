import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  GraduationCap, 
  ExternalLink, 
  Calendar,
  Brain,
  Users,
  Code,
  BarChart3
} from "lucide-react";

const CertificationsSection = () => {
  const recentCertifications = [
    {
      title: "Machine Learning Foundations for Product Managers",
      issuer: "Duke University (Coursera)",
      date: "July 2025",
      credential: "JROSVNV9MOIM",
      category: "AI/ML",
      icon: <Brain className="w-5 h-5" />,
      skills: ["AI Literacy", "Python", "Product Management", "Machine Learning"]
    },
    {
      title: "Google Cloud Generative AI Leader",
      issuer: "Google",
      date: "2025",
      credential: "Verified",
      category: "AI Leadership",
      icon: <Award className="w-5 h-5" />,
      skills: ["GenAI", "AI Strategy", "Cloud AI", "Leadership"]
    },
    {
      title: "Introduction to Model Context Protocol",
      issuer: "Anthropic Academy",
      date: "July 2025",
      credential: "oq6tdifkv33d",
      category: "AI Development",
      icon: <Code className="w-5 h-5" />,
      skills: ["AI APIs", "MCP", "AI Integration", "Prompt Engineering"]
    },
    {
      title: "Practical Application of Gen AI for Project Managers",
      issuer: "Project Management Institute",
      date: "August 2025",
      credential: "Verified",
      category: "Project Management",
      icon: <Users className="w-5 h-5" />,
      skills: ["GenAI", "Project Management", "AI Productivity"]
    }
  ];

  const professionalCertifications = [
    {
      title: "Professional Scrum Product Owner II (PSPO II)",
      issuer: "Scrum.org",
      date: "2022",
      category: "Product Management",
      status: "Current"
    },
    {
      title: "Professional Scrum Master II (PSM II)",
      issuer: "Scrum.org", 
      date: "2022",
      category: "Agile Leadership",
      status: "Current"
    },
    {
      title: "Microsoft Data Analyst Associate",
      issuer: "Microsoft",
      date: "2023",
      category: "Data Analytics",
      status: "Current"
    },
    {
      title: "Databricks Fundamentals Accreditation",
      issuer: "Databricks",
      date: "June 2025",
      category: "Data Engineering",
      status: "Current"
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science - Computer Science",
      institution: "Pontifícia Universidade Católica do Rio de Janeiro",
      period: "1995 - 1999",
      type: "Undergraduate"
    },
    {
      degree: "Postgraduate - Internet Technologies",
      institution: "COPPE-UFRJ / IBPI",
      period: "1999 - 2000",
      type: "Postgraduate"
    },
    {
      degree: "Postgraduate - Digital Marketing Strategic Management",
      institution: "IGEC - FACHA",
      period: "2009",
      type: "Postgraduate"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI/ML": "bg-purple-100 text-purple-800 border-purple-200",
      "AI Leadership": "bg-blue-100 text-blue-800 border-blue-200",
      "AI Development": "bg-green-100 text-green-800 border-green-200",
      "Project Management": "bg-orange-100 text-orange-800 border-orange-200",
      "Product Management": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Agile Leadership": "bg-teal-100 text-teal-800 border-teal-200",
      "Data Analytics": "bg-pink-100 text-pink-800 border-pink-200",
      "Data Engineering": "bg-cyan-100 text-cyan-800 border-cyan-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <section id="certifications" className="py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap size={16} />
              Certifications & Education
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Continuous Learning & Professional Development
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Staying at the forefront of AI, product management, and digital transformation through 
              continuous learning and industry-recognized certifications.
            </p>
          </div>

          {/* Recent AI Certifications - Featured */}
          <div className="mb-16 fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Recent AI & Leadership Certifications (2025)
              </h3>
              <p className="text-muted-foreground">
                Latest certifications focusing on AI leadership and practical application
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recentCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="professional-card group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <div className="text-primary-foreground">
                        {cert.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cert.category)}`}>
                          {cert.category}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          {cert.date}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">
                        {cert.issuer}
                      </p>
                      {cert.credential && (
                        <p className="text-xs text-muted-foreground mb-3">
                          Credential ID: {cert.credential}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className="text-xs border-primary/20 text-primary"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-primary hover:bg-primary hover:text-primary-foreground group/btn"
                    >
                      View Credential
                      <ExternalLink 
                        size={14} 
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" 
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Certifications */}
          <div className="mb-16 fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Professional Certifications
              </h3>
              <p className="text-muted-foreground">
                Industry-recognized certifications in product management, agile methodologies, and data analytics
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionalCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="professional-card text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 hero-gradient rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getCategoryColor(cert.category)}`}>
                    {cert.category}
                  </div>
                  
                  <h4 className="text-sm font-semibold text-foreground mb-2 min-h-[40px] flex items-center justify-center">
                    {cert.title}
                  </h4>
                  
                  <p className="text-xs text-primary font-medium mb-1">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {cert.date}
                  </p>
                  
                  <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {cert.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Educational Background
              </h3>
              <p className="text-muted-foreground">
                Strong foundation in computer science and digital technologies
              </p>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="professional-card group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <GraduationCap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">
                            {edu.degree}
                          </h4>
                          <p className="text-primary font-medium">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {edu.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-16 professional-card text-center fade-in-up">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Commitment to Continuous Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                In the rapidly evolving field of AI and digital transformation, I believe in staying ahead 
                of the curve through continuous learning. My recent focus on AI leadership, machine learning, 
                and prompt engineering reflects my commitment to understanding and applying cutting-edge technologies 
                in practical business contexts.
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Recent Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Languages Spoken</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;