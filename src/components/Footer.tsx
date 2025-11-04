import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Bruggestraat 146/a<br />
                  8750 Wingene, België
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+32123456789" className="text-sm hover:underline">
                  +32 12 34 56 789
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Openingsuren</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Ma: 08:00 - 18:00</p>
                  <p>Di: 08:00 - 18:00</p>
                  <p>Wo: 08:00 - 13:00</p>
                  <p>Do: 08:00 - 18:00</p>
                  <p>Vr: 08:00 - 18:00</p>
                  <p>Za: 08:00 - 18:00</p>
                  <p>Zo: Gesloten</p>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Slagerij John</h3>
            <p className="text-sm leading-relaxed">
              Uw vertrouwde slager voor vers vlees en huisgemaakte specialiteiten sinds 1985. 
              Kwaliteit en service staan bij ons centraal.
            </p>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Slagerij John. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
