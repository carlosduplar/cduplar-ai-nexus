import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
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

interface LearningStat {
  value: string;
  label: string;
}

const CertificationsSection = () => {
  const { t } = useTranslation();

  const recentCertifications = Object.values(t('certifications.recentCertifications', { returnObjects: true }) || []);

  const professionalCertifications = Object.values(t('certifications.professionalCertifications', { returnObjects: true }) || []);

  const education = Object.values(t('certifications.educationData', { returnObjects: true }) || []);

  const getIconComponent = (iconName: string) => {
    const icons = {
      "Brain": Brain,
      "Award": Award,
      "Code": Code,
      "Users": Users,
      "BarChart3": BarChart3
    };
    const IconComponent = icons[iconName] || Award;
    return <IconComponent className="w-6 h-6" />;
  };

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
              {t('certifications.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('certifications.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('certifications.subtitle')}
            </p>
          </div>

          {/* Recent AI Certifications - Featured */}
          <div className="mb-16 fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('certifications.recentAI.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('certifications.recentAI.subtitle')}
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
                        {getIconComponent(cert.icon)}
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
                          {t('certifications.credentialId')} {cert.credential}
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
                    {cert.link && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-primary hover:bg-primary hover:text-primary-foreground group/btn"
                        onClick={() => window.open(cert.link, '_blank')}
                      >
                        {t('certifications.viewCredential')}
                        <ExternalLink
                          size={14}
                          className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                        />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Certifications */}
          <div className="mb-16 fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('certifications.professional.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('certifications.professional.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionalCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="professional-card text-center group cursor-pointer"
                  onClick={() => cert.link && window.open(cert.link, '_blank')}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 hero-gradient rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
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

                  {cert.link && (
                    <div className="mt-3 text-xs text-primary flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Credential</span>
                      <ExternalLink size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="fade-in-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('certifications.education.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('certifications.education.subtitle')}
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
                {t('certifications.learning.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('certifications.learning.p1')}
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                {(Object.values(t('certifications.learning.stats', { returnObjects: true }) || []) as LearningStat[]).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;