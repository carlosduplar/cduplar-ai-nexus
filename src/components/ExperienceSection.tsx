import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Building, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import heigVdLogo from "@/assets/company-logos/heig-vd-logo.png";
import gfLogo from "@/assets/company-logos/gf-logo.png";
import siemensLogo from "@/assets/company-logos/siemens-logo.png";
import brqLogo from "@/assets/company-logos/brq-logo.png";
import timLogo from "@/assets/company-logos/tim-brasil-logo.png";
import globoLogo from "@/assets/company-logos/globo-logo.png";

const ExperienceSection = () => {
  const { t } = useTranslation();
  const experiences = [
    {
      company: "HEIG-VD",
      role: "Digital Transformation Project Manager",
      period: "September 2025 - Present",
      location: "Yverdon, Vaud, Switzerland",
      type: "Full-time",
      logo: heigVdLogo,
      highlights: [
        "Defining and leading digital transformation initiatives to enhance educational technology infrastructure",
        "Developing comprehensive project roadmaps aligned with HES-SO's Schéma Directeur Numérique (SDN) framework",
        "Leading multidisciplinary teams including IT, faculty, and administrative stakeholders",
        "Managing risk assessment while ensuring adherence to Swiss public sector standards"
      ],
      skills: ["Project Management", "Digital Transformation", "Strategic Planning", "Team Leadership"]
    },
    {
      company: "Georg Fischer Machining Solutions",
      role: "Senior Product Owner",
      period: "September 2022 - July 2025",
      location: "Biel, Bern, Switzerland",
      type: "Full-time",
      logo: gfLogo,
      highlights: [
        "Cut service response & resolution times by up to 79% with global service Power BI KPI Dashboard",
        "Led Microsoft 365 Copilot pilot and trained 30+ colleagues on prompt engineering",
        "Shaped GFMS's end-customer SaaS roadmap, averaging 39% QoQ machine connection growth since Q3 2023",
        "Designed real-time machine monitoring dashboards using OPC-UA and MTConnect protocols"
      ],
      skills: ["Product Management", "AI/GenAI", "Power BI", "SaaS Migration", "IoT"]
    },
    {
      company: "Siemens",
      role: "Product Owner for Smart Infrastructure",
      period: "November 2020 - September 2022",
      location: "Lisbon, Portugal",
      type: "Full-time",
      logo: siemensLogo,
      highlights: [
        "Grew user adoption 5x for a global SaaS password-management product",
        "Engaged with Product & Solution Security Experts for security reviews and risk assessments",
        "Managed Siemens Energy carve-out project ensuring smooth and compliant transition",
        "Scaled password management SaaS to 13+ countries while building internal BI tools"
      ],
      skills: ["SaaS Scaling", "Security", "Risk Management", "Global Teams"]
    },
    {
      company: "BRQ Digital Solutions",
      role: "ERE Team Lead | Senior Application Specialist | Scrum Master",
      period: "January 2019 - November 2020",
      location: "Lisbon, Portugal",
      type: "Full-time",
      logo: brqLogo,
      highlights: [
        "Led two remote cross-functional Scrum teams for high-impact native iOS/Android app",
        "Collaborated with sales consulting on multiple RFIs and RFPs",
        "Contributed directly to two new contract wins through technical consultation",
        "Delivered solutions for TIM Brazil with focus on mobile-first approach"
      ],
      skills: ["Mobile Development", "Scrum", "Remote Teams", "Sales Support"]
    },
    {
      company: "TIM Brazil (Telecom Italia Mobile)",
      role: "Senior IT Specialist | IT Product Owner",
      period: "July 2011 - October 2018",
      location: "Rio de Janeiro, Brazil",
      type: "Full-time",
      logo: timLogo,
      highlights: [
        "Launched and scaled TIM's consumer self-service app to 8.2M total users (1.4M daily sessions)",
        "Improved app ratings from 1.5 to 4.0 stars and achieved Top 5 Utility app store ranking",
        "Spearheaded TIM's first Agile project in 2011, reducing consumer portal lead time by 67%",
        "Managed €300k annual IT budget with 3 direct reports"
      ],
      skills: ["Mobile Apps", "Agile Transformation", "Budget Management", "Team Leadership"]
    },
    {
      company: "Infoglobo",
      role: "IT Product Owner | Senior Business Analyst",
      period: "October 2009 - July 2011",
      location: "Rio de Janeiro, Brazil",
      type: "Full-time",
      logo: globoLogo,
      highlights: [
        "Enhanced SEO for all company websites and trained editorial staff, resulting in 18% increase in monthly visitors",
        "Spearheaded database unification project, collaborating with Marketing and CRM teams to streamline user data",
        "Led Agile initiative for Jornal Extra's new website, achieving 71% increase in search engine traffic in 2011",
        "Served as Solutions Architect, overseeing technical selection of new CMS and editorial platform"
      ],
      skills: ["SEO Optimization", "Database Management", "Agile Implementation", "System Architecture"]
    }
  ];

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
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="professional-card group relative"
              >

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Company Logo & Period */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 border shadow-sm">
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="hidden lg:block space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {exp.period}
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
                          {exp.type}
                        </Badge>
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {exp.company}
                      </div>
                      
                      {/* Mobile period and location */}
                      <div className="lg:hidden space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <div
                          key={highlightIndex}
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
                Career Impact Summary
              </h3>
              <p className="text-muted-foreground">
                Quantifiable results across different industries and roles
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">Major Companies</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Countries Worked</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">€300k+</div>
                <div className="text-sm text-muted-foreground">Budget Managed</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">30+</div>
                <div className="text-sm text-muted-foreground">Team Members Led</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;