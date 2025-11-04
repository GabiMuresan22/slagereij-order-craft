import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Contact
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kom langs in onze winkel of neem contact met ons op
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
                    <h3 className="font-semibold text-lg mb-2">Adres</h3>
                    <p className="text-muted-foreground">
                      Bruggestraat 146/a<br />
                      8750 Wingene<br />
                      België
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
                    <h3 className="font-semibold text-lg mb-2">Telefoon</h3>
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
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
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
                    <h3 className="font-semibold text-lg mb-2">Openingsuren</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Maandag: 08:00 - 18:00</p>
                      <p>Dinsdag: 08:00 - 18:00</p>
                      <p>Woensdag: 08:00 - 13:00</p>
                      <p>Donderdag: 08:00 - 18:00</p>
                      <p>Vrijdag: 08:00 - 18:00</p>
                      <p>Zaterdag: 08:00 - 18:00</p>
                      <p>Zondag: Gesloten</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <Card className="border-border overflow-hidden h-[600px]">
            <CardContent className="p-0 h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.8!2d3.277!3d51.059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c34b4c0b5e5e5f%3A0x5e5e5e5e5e5e5e5e!2sBruggestraat%20146a%2C%208750%20Wingene!5e0!3m2!1snl!2sbe!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Slagerij John Location"
              />
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="bg-primary text-primary-foreground max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              Vragen of Speciale Wensen?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Bel ons gerust of kom langs in de winkel. We helpen u graag verder met 
              advies, speciale bestellingen of vragen over bereiding.
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
