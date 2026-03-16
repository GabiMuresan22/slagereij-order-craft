import { useState, useEffect } from "react";
import { X, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "promo_alert_cordonbleu_v1";
const PROMO_END_DATE = new Date("2026-03-22T23:59:59");

const PromoAlert = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) setIsVisible(false);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible || new Date() > PROMO_END_DATE) return null;

  const content = {
    nl: {
      title: "🇧🇪 We beginnen de week met een superactie!",
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
    <div className="bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-4 py-3">
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-primary-foreground/20 transition-colors z-10"
          aria-label={language === "nl" ? "Sluiten" : "Închide"}
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
