import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
  Github
} from "lucide-react";

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_yzuku6y', 
        'template_lu3eu8e', 
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          message: formData.message,
          to_name: 'Carlos Mello',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDescription'),
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: t('contact.form.error'),
        description: t('contact.form.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: t('contact.info.email'),
      link: "mailto:me@carlosmello.work"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('contact.info.phone'),
      value: t('contact.info.phone'),
      link: "tel:+41774903240"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: t('contact.info.location'),
      link: "#"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: t('contact.info.linkedin'),
      link: "https://linkedin.com/in/carlosduplar"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: t('contact.info.github'),
      link: "https://github.com/carlosduplar"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Mail size={16} />
              {t('contact.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 fade-in-up">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('contact.form.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('contact.form.description')}
                </p>
              </div>

              <Card className="p-6 professional-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.form.namePlaceholder')}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.form.emailPlaceholder')}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.company')}
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('contact.form.companyPlaceholder')}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full hero-gradient glow-effect hover:glow-effect group text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.submit')}
                        <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('contact.info.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('contact.info.description')}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <Card
                    key={index}
                    className="p-4 professional-card group cursor-pointer"
                    onClick={() => contact.link !== "#" && window.open(contact.link, '_blank')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <div className="text-primary-foreground">
                          {contact.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-muted-foreground">
                          {contact.label}
                        </div>
                        <div className="text-foreground font-semibold">
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Availability Features */}
              <Card className="p-6 professional-card">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  {t('contact.features.title')}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-primary-foreground">
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {t('contact.features.responseTime.title')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t('contact.features.responseTime.description')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-primary-foreground">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {t('contact.features.languages.title')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t('contact.features.languages.description')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-primary-foreground">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {t('contact.features.availability.title')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t('contact.features.availability.description')}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Schedule a Call CTA */}
          <div className="mt-16 text-center fade-in-up">
            <Card className="p-8 professional-card max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {t('contact.cta.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('contact.cta.description')}
              </p>
              <Button
                size="lg"
                className="hero-gradient glow-effect hover:glow-effect group text-lg py-6"
                onClick={() => window.open('https://calendly.com/carlosmello/30min', '_blank')} // TODO: Replace with actual Calendly link
              >
                {t('contact.cta.button')}
                <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;