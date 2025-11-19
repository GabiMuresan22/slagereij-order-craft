import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/structuredData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 characters" }).max(20),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast.success("Bericht verzonden! We nemen zo snel mogelijk contact met u op.");
      form.reset();
    } catch (error: any) {
      console.error("Error sending contact form:", error);
      toast.error("Er is een fout opgetreden. Probeer het later opnieuw of bel ons direct.");
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
                      <a href="tel:+32466186457" className="text-muted-foreground hover:text-primary transition-colors text-lg">
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
                        className="text-muted-foreground hover:text-primary transition-colors"
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
                  <div>
                    <h3 className="font-semibold text-lg mb-4">{t("contact.hours.title")}</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>{t("contact.hours.mon")}</p>
                      <p>{t("contact.hours.tue")}</p>
                      <p>{t("contact.hours.wed")}</p>
                      <p>{t("contact.hours.thu")}</p>
                      <p>{t("contact.hours.fri")}</p>
                      <p>{t("contact.hours.sat")}</p>
                      <p>{t("contact.hours.sun")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Stuur ons een bericht</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naam</FormLabel>
                        <FormControl>
                          <Input placeholder="Uw naam" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="uw.email@voorbeeld.be" {...field} />
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
                        <FormLabel>Telefoon</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+32 466 18 64 57" {...field} />
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
                        <FormLabel>Bericht</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Hoe kunnen we u helpen?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Verzenden..." : "Verzenden"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Full-width Map with Dark Mode */}
        <Card className="border-border overflow-hidden max-w-6xl mx-auto mb-12">
          <CardContent className="p-0 h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.8!2d3.277!3d51.059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c34b4c0b5e5e5f%3A0x5e5e5e5e5e5e5e5e!2sBruggestraat%20146A%2C%208750%20Zwevezele!5e0!3m2!1snl!2sbe!4v1234567890&style=feature:all%7Celement:geometry%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x242f3e&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x746855&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Slagerij John Location"
            />
            <a
              href="https://www.google.com/maps/place/Bruggestraat+146A,+8750+Zwevezele"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Open in Google Maps</span>
            </a>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-primary text-primary-foreground max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4">{t("contact.cta.title")}</h2>
            <p className="text-lg opacity-90 mb-6">{t("contact.cta.desc")}</p>
            <a href="tel:+32466186457">
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
