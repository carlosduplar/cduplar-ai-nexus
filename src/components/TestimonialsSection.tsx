import { Badge } from "@/components/ui/badge";
import { MessageSquare, Linkedin, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import testimonials from "@/data/testimonials.json";

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const getLanguageBadge = (lang: string) => {
    const langMap: { [key: string]: string } = {
      en: "EN",
      pt: "PT",
      fr: "FR",
      de: "DE",
      es: "ES"
    };
    return langMap[lang] || lang.toUpperCase();
  };

  const shouldTruncate = (text: string) => text.length > 300;

  const getTruncatedText = (text: string) => {
    if (text.length <= 300) return text;
    return text.substring(0, 300) + "...";
  };

  return (
    <section id="testimonials" className="py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquare size={16} />
              {t('testimonials.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up">
            {testimonials.map((testimonial) => {
              const isExpanded = expandedIds.includes(testimonial.id);
              const needsTruncation = shouldTruncate(testimonial.text);
              const displayText = isExpanded || !needsTruncation
                ? testimonial.text
                : getTruncatedText(testimonial.text);

              return (
                <div
                  key={testimonial.id}
                  className="professional-card group relative flex flex-col"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-primary/10">
                    <Quote size={40} />
                  </div>

                  {/* Header */}
                  <div className="mb-4 relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <a
                          href={testimonial.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <h3 className="text-lg font-bold text-foreground group-hover/link:text-primary transition-colors">
                            {testimonial.name}
                          </h3>
                          <Linkedin
                            size={18}
                            className="text-[#0A66C2] opacity-70 group-hover/link:opacity-100 transition-opacity flex-shrink-0"
                          />
                        </a>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                          {testimonial.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.company}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs ml-2 flex-shrink-0"
                      >
                        {getLanguageBadge(testimonial.language)}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-1 mb-4">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {displayText}
                    </p>
                  </div>

                  {/* Read More Button */}
                  {needsTruncation && (
                    <button
                      onClick={() => toggleExpanded(testimonial.id)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium mt-2"
                    >
                      {isExpanded ? (
                        <>
                          {t('testimonials.readLess')}
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          {t('testimonials.readMore')}
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center fade-in-up">
            <p className="text-sm text-muted-foreground">
              {t('testimonials.footer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
