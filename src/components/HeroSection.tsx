import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Briefcase, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/carlos-profile.png";

const HeroSection = () => {
  const { t } = useTranslation();
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 section-gradient"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 fade-in-left">
            {/* Location and Role Tags */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium">
                <MapPin size={16} />
                {t('hero.location')}
              </div>
              <div className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                <Briefcase size={16} />
                {t('hero.role')}
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                {t('hero.title')}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.yearsExperience')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">8.2M</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.usersServed')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">79%</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.timeReduction')}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.open("https://linkedin.com/in/carlosduplar", "_blank")}
                className="hero-gradient glow-effect hover:glow-effect group text-lg px-8 py-6"
              >
                <Linkedin className="mr-2" size={20} />
                {t('hero.cta')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#contact")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
              >
                {t('navigation.contact')}
              </Button>
            </div>

            {/* Languages */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">{t('hero.languages')}</p>
              <div className="flex flex-wrap gap-2">
                {["Portuguese", "English", "French", "German", "Spanish"].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-secondary-light text-secondary text-xs font-medium rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Professional Image */}
          <div className="relative fade-in-right">
            <div className="relative">
              {/* Main image container with professional styling */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                <img
                  src={heroImage}
                  alt="Carlos Duplar Mello - Professional Portrait"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Professional badge overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-4 professional-card">
                    <h3 className="font-semibold text-foreground mb-1">
                      Carlos Duplar Mello
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t('hero.role')}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      {t('hero.availability')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 hero-gradient rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;