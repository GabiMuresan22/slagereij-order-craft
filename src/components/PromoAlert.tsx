import { useState, useEffect } from "react";
import { X, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";

const PROMO_END_DATE = new Date("2027-03-22T23:59:59");
const MIN_DISPLAY_MS = 50 * 1000; // Show for at least 50 seconds before allowing dismiss

const PromoAlert = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [canDismiss, setCanDismiss] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanDismiss(true), MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    if (!canDismiss) return;
    setIsVisible(false);
  };

  if (!isVisible || new Date() > PROMO_END_DATE) return null;

  const content = {
    nl: {
      title: "We beginnen de week met een superactie!",
      promo: "Cordon Bleu – 3+1 GRATIS",
      validity: "De actie is geldig van 16 tot en met 22 maart, zolang de voorraad strekt.",
      cta: "Plaats je bestelling op voorhand, kom ze afhalen of laat ze bij je thuis leveren.",
      order: "Bestellen",
      phone: "+32 466 18 64 57",
      address: "Bruggestraat 146A, 8750 Zwevezele",
      orderBtn: "Bestel online",
    },
    ro: {
      title: "Începem săptămâna cu o super promoție!",
      promo: "Cordon Bleu – 3+1 GRATIS",
      validity: "Oferta este valabilă în perioada 16 – 22 martie, în limita stocului disponibil.",
      cta: "Fă comanda din timp și vino să o ridici sau ți-o livrăm direct acasă.",
      order: "Comenzi",
      phone: "+32 466 18 64 57",
      address: "Bruggestraat 146A, 8750 Zwevezele",
      orderBtn: "Comandă online",
    },
  };

  const t = language === "ro" ? content.ro : content.nl;

  return (
    <div className="bg-primary text-primary-foreground relative z-[60]">
      <div className="container mx-auto px-4 py-3">
        <button
          type="button"
          onClick={handleDismiss}
          disabled={!canDismiss}
          className={`absolute top-2 right-2 p-1.5 rounded-full z-10 transition-colors ${
            canDismiss
              ? "hover:bg-primary-foreground/20 cursor-pointer"
              : "cursor-not-allowed opacity-50"
          }`}
          aria-label={language === "nl" ? "Sluiten" : "Închide"}
          title={!canDismiss ? (language === "nl" ? "Sluit over 50 seconden" : "Se poate închide după 50 secunde") : undefined}
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>
        <div className="pr-8 pl-4 text-center sm:text-left">
          <p className="font-semibold text-sm sm:text-base">{t.title}</p>
          <p className="font-bold text-sm sm:text-base mt-0.5">{t.promo}</p>
          <p className="text-xs sm:text-sm opacity-95 mt-1">{t.validity}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
            <a
              href={`tel:${t.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium underline hover:no-underline"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {t.order}: {t.phone}
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm opacity-95">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {t.address}
            </span>
            <LocalizedLink to="/order" className="inline-flex">
              <Button
                size="sm"
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
              >
                {t.orderBtn}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoAlert;
