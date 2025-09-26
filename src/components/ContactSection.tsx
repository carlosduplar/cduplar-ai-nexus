import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send,
  CheckCircle,
  Clock,
  MessageSquare
} from "lucide-react";

const ContactSection = () => {
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

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
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
      value: "me@carlosmello.work",
      link: "mailto:me@carlosmello.work"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+41 77 490 32 40",
      link: "tel:+41774903240"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Biel/Bienne, Switzerland",
      link: "#"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/carlosduplar",
      link: "https://linkedin.com/in/carlosduplar"
    }
  ];

  const availabilityFeatures = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24h Response Time",
      description: "I typically respond to messages within 24 hours"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Multiple Languages",
      description: "Available in EN, PT, FR, DE, ES"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Open to Opportunities",
      description: "Consulting, permanent roles, and partnerships"
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
              Let's Connect
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Digital Products?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Whether you're looking to implement AI solutions, scale your digital products, or lead digital 
              transformation initiatives, I'd love to discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 fade-in-up">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Send Me a Message
                </h3>
                <p className="text-muted-foreground mb-6">
                  I'm always interested in discussing new opportunities in digital transformation, 
                  AI product development, and strategic product management roles.
                </p>
              </div>

              <Card className="p-6 professional-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@company.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company/Organization
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company or organization"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project, opportunity, or how I can help..."
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
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
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
                  Contact Information
                </h3>
                <p className="text-muted-foreground mb-6">
                  Prefer direct contact? Feel free to reach out using any of the methods below.
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
                  Why Work With Me?
                </h4>
                <div className="space-y-4">
                  {availabilityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-primary-foreground">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {feature.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Call to Action */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary-soft/10 border-primary/20">
                <div className="text-center space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Ready to Get Started?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Let's schedule a call to discuss your digital transformation needs, 
                    AI strategy, or product development challenges.
                  </p>
                  <Button
                    className="hero-gradient glow-effect"
                    onClick={() => window.open("mailto:me@carlosmello.work", '_blank')}
                  >
                    Schedule a Call
                    <Phone className="ml-2" size={16} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;