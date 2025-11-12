import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/structuredData";

const Contact = () => {
  const { t } = useLanguage();

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]);

  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Contact"
        description="Neem contact op met Slagerij John in Zwevezele. Bezoek ons in de Bruggestraat 146A of bel +32 12 34 56 789. Openingstijden en routebeschrijving."
        keywords="contact, openingstijden, adres, telefoon, route, Zwevezele, Bruggestraat"
        structuredData={[breadcrumbData, getLocalBusinessSchema()]}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('contact.address.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('contact.address.street')}<br />
                      {t('contact.address.city')}<br />
                      {t('contact.address.country')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('contact.phone.title')}</h3>
                    <a 
                      href="tel:+32123456789" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +32 12 34 56 789
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('contact.email.title')}</h3>
                    <a 
                      href="mailto:info@slagereijjohn.be" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@slagereijjohn.be
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('contact.hours.title')}</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>{t('contact.hours.mon')}</p>
                      <p>{t('contact.hours.tue')}</p>
                      <p>{t('contact.hours.wed')}</p>
                      <p>{t('contact.hours.thu')}</p>
                      <p>{t('contact.hours.fri')}</p>
                      <p>{t('contact.hours.sat')}</p>
                      <p>{t('contact.hours.sun')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <Card className="border-border overflow-hidden h-[600px]">
            <CardContent className="p-0 h-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.8!2d3.277!3d51.059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c34b4c0b5e5e5f%3A0x5e5e5e5e5e5e5e5e!2sBruggestraat%20146A%2C%208750%20Zwevezele!5e0!3m2!1snl!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Slagerij John Location"
              />
              <a 
                href="https://www.google.com/maps/place/Bruggestraat+146A,+8750+Zwevezele"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">Open in Google Maps</span>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="bg-primary text-primary-foreground max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              {t('contact.cta.title')}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {t('contact.cta.desc')}
            </p>
            <a href="tel:+32123456789">
              <span className="inline-flex items-center text-xl font-semibold hover:underline">
                <Phone className="w-5 h-5 mr-2" />
                +32 12 34 56 789
              </span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
