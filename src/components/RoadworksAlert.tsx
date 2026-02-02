import { useState, useEffect } from "react";
import { X, ShoppingCart, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/32466186457";

const RoadworksAlert = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  // Reset visibility when language changes
  useEffect(() => {
    setIsVisible(true);
  }, [language]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = {
    nl: {
      title: "🚧 BELANGRIJKE UPDATE: WEGENWERKEN",
      lines: [
        "Vanwege de werkzaamheden aan de straat zijn wij helaas genoodzaakt de winkel tijdelijk te sluiten.",
        "Maar wij blijven voor u klaarstaan! ⚠️ In het weekend werken wij uitsluitend op bestelling.",
        "Bestel uw vlees eenvoudig online of via WhatsApp, en wij zorgen voor de rest. Hartelijk dank voor uw steun!"
      ],
      ctaOnline: "🛒 Bestel Nu Online",
      ctaWhatsApp: "📞 Via WhatsApp Bestellen"
    },
    ro: {
      title: "🚧 ANUNȚ IMPORTANT: LUCRĂRI STRADALE",
      lines: [
        "Din cauza lucrărilor la stradă, suntem nevoiți să închidem temporar magazinul fizic.",
        "Dar rămânem la dispoziția dumneavoastră! ⚠️ În weekend lucrăm exclusiv pe bază de comandă.",
        "Comandați simplu online sau pe WhatsApp, iar noi ne ocupăm de restul. Vă mulțumim pentru susținere!"
      ],
      ctaOnline: "🛒 Comandă Acum Online",
      ctaWhatsApp: "📞 Comandă pe WhatsApp"
    }
  };

  const t = language === "ro" ? content.ro : content.nl;

  return (
    <div className="bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-primary-foreground/20 transition-colors z-10"
          aria-label={language === "nl" ? "Sluiten" : "Închide"}
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>

        <div className="text-center pr-8 pl-8 space-y-3">
          <p className="font-serif font-bold text-lg">
            {t.title}
          </p>
          {t.lines.map((line, index) => (
            <p key={index} className="text-sm leading-relaxed opacity-90">
              {line}
            </p>
          ))}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <LocalizedLink to="/order">
              <Button
                variant="secondary"
                size="sm"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" aria-hidden="true" />
                {t.ctaOnline}
              </Button>
            </LocalizedLink>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary-foreground/20 px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              {t.ctaWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadworksAlert;
