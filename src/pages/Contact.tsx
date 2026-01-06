import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/structuredData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

// Create schema dynamically with translations
const createContactFormSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().trim()
      .min(2, { message: t('contact.validation.nameMin') })
      .max(100, { message: t('contact.validation.nameMax') }),
    email: z.string().trim()
      .email({ message: t('contact.validation.emailInvalid') })
      .max(255, { message: t('contact.validation.emailMax') }),
    phone: z.string().trim()
      .min(10, { message: t('contact.validation.phoneMin') })
      .max(20, { message: t('contact.validation.phoneMax') }),
    message: z.string().trim()
      .min(10, { message: t('contact.validation.messageMin') })
      .max(1000, { message: t('contact.validation.messageMax') }),
    consent: z.boolean().refine((val) => val === true, {
      message: t('contact.validation.consentRequired'),
    }),
  });
};

type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const contactFormSchema = createContactFormSchema(t);

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Add consent proof with timestamp for GDPR compliance
      const payload = {
        ...data,
        consent_given: true,
        consent_timestamp: new Date().toISOString(),
      };
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: payload,
      });

      if (error) throw error;

      toast.success(t('contact.form.success'));
      form.reset();
    } catch (error) {
      // Proper error handling with type checking
      if (error instanceof Error) {
        console.error("Error sending contact form:", error.message, error);
      } else if (typeof error === 'object' && error !== null) {
        // Handle Supabase errors or other structured errors
        const errorObj = error as { message?: string; error?: string };
        console.error("Error sending contact form:", errorObj.message || errorObj.error || error);
      } else {
        console.error("Error sending contact form:", String(error));
      }
      toast.error(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <SEO
        title="Contact"
        description="Neem contact op met Slagerij John in Zwevezele. Bezoek ons in de Bruggestraat 146A, Zwevezele 8750, België of bel +32 466 18 64 57. Openingstijden en routebeschrijving."
        keywords="contact, openingstijden, adres, telefoon, route, Zwevezele, Bruggestraat"
        structuredData={[breadcrumbData, getLocalBusinessSchema()]}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Contact Information - Merged Card */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("contact.address.title")}</h3>
                    <p className="text-muted-foreground">
                      {t("contact.address.street")}
                      <br />
                      {t("contact.address.city")}
                      <br />
                      {t("contact.address.country")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("contact.phone.title")}</h3>
                      <a href="tel:+32466186457" className="text-muted-foreground hover:text-primary transition-colors text-lg min-h-[48px] inline-flex items-center">
                        +32 466 18 64 57
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("contact.email.title")}</h3>
                      <a
                        href="mailto:contact@slagerij-john.be"
                        className="text-muted-foreground hover:text-primary transition-colors min-h-[48px] inline-flex items-center"
                      >
                        contact@slagerij-john.be
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="font-semibold text-lg mb-4">{t("contact.hours.title")}</h3>
                    <div className="text-muted-foreground space-y-2.5">
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.mon")}</span>
                        <span>{t("footer.hours.time.mon")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.tue")}</span>
                        <span>{t("footer.hours.time.tue")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.wed")}</span>
                        <span>{t("footer.hours.time.wed")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.thu")}</span>
                        <span>{t("footer.hours.time.thu")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.fri")}</span>
                        <span>{t("footer.hours.time.fri")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.sat")}</span>
                        <span>{t("footer.hours.time.sat")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("footer.hours.day.sun")}</span>
                        <span>{t("footer.hours.time.sun")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">{t('contact.form.title')}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('contact.form.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder={t('contact.form.phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('contact.form.messagePlaceholder')} 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            {t('contact.form.consent')}{' '}
                            <Link to="/privacy" className="text-primary hover:underline">
                              {t('footer.privacy')}
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {t('contact.form.privacyNotice')}{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      {t('footer.privacy')}
                    </Link>
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Full-width Map with Dark Mode */}
        <Card className="border-border overflow-hidden max-w-6xl mx-auto mb-12">
          <CardContent className="p-0 h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.8!2d3.2770!3d51.0590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c351c5c5c5c5c5%3A0x1234567890abcdef!2sButcher%20John!5e0!3m2!1sen!2sbe!4v1704067200000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Slagerij John Location - Bruggestraat 146A, 8750 Zwevezele, Belgium"
              aria-label="Google Maps showing Slagerij John location at Bruggestraat 146A, 8750 Zwevezele, Belgium"
            />
            <a
              href="https://www.google.com/maps/place/Butcher+John/@51.0590,3.2770,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">{t('contact.map.open')}</span>
            </a>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-primary text-primary-foreground max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4">{t("contact.cta.title")}</h2>
            <p className="text-lg opacity-90 mb-6">{t("contact.cta.desc")}</p>
            <a href="tel:+32466186457" className="min-h-[48px] inline-flex items-center">
              <span className="inline-flex items-center text-xl font-semibold hover:underline">
                <Phone className="w-5 h-5 mr-2" />
                +32 466 18 64 57
              </span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
