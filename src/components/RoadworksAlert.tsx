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
      title: "🇧🇪📢 Beste klanten,",
      lines: [
        "Vanaf morgen 6.03.2026 hebben wij super prijzen die u niet wilt missen:",
        "🥩 Spieringkotelet – 5,20€ / kg",
        "🥩 Varkenskotelet – 5,50 € / kg",
        "🥓 Spek – 6,50 € / kg",
        "🍖 Vakensgehakt – 6 € / kg",
        "⏳ Aanbieding geldig zolang de voorraad strekt.",
        "📍 Adres: Bruggestraat 146A, 8750 Zwevezele",
        "Wij verwelkomen u graag!"
      ],
      ctaOnline: "🛒 Bestel Nu Online",
      ctaWhatsApp: "📞 Reservaties: +32 466 18 64 57"
    },
    ro: {
      title: "🇹🇩 📢 Dragi clienți,",
      lines: [
        "Începând de mâine 6.03.2026 vă așteptăm cu super prețuri de nerefuzat:",
        "🥩 Ceafă de porc – 5,20 € / kg",
        "🥩 Cotlet de porc – 5,50 € / kg",
        "🥓 Piept de porc – 6,50 € / kg",
        "🍖 Carne tocată de porc – 6 € / kg",
        "⏳ Oferta este valabilă în limita stocului disponibil.",
        "📍 Adres: Bruggestraat 146A, 8750 Zwevezele",
        "Wij verwelkomen u graag!"
      ],
      ctaOnline: "🛒 Comandă Acum Online",
      ctaWhatsApp: "📞 Rezervări: +32 466 18 64 57"
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
