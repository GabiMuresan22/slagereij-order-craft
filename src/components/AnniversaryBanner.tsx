import { PartyPopper, Calendar, Clock, MapPin, X, Gift, CheckCircle2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LocalizedLink from "@/components/LocalizedLink";

const AnniversaryBanner = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Use a new storage key to show the banner again to everyone
  const STORAGE_KEY = 'anniversary_banner_combined_v1';

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Hide after the event date (Feb 2nd to be safe)
  const eventDate = new Date('2026-02-02T23:59:59');
  const now = new Date();
  if (now > eventDate || isDismissed) {
    return null;
  }

  const content = {
    nl: {
      badge: "🎉 Feest! 1 JAAR",
      title: "1 Jaar Slagerij John",
      subtitle: "Eén jaar hard werken, passie en kwaliteit – dankzij jullie, onze klanten.",
      // The original emotional message
      paragraphs: [
        "Op 1 februari vieren we 1 jaar sinds Slager John zijn deuren opende.",
        "Het was een jaar vol lange werkdagen, inzet en opofferingen, maar vooral een jaar waarin we elke dag met hart en ziel hebben gewerkt om kwaliteit te bieden.",
        "Dankzij jullie, onze klanten, had elke inspanning een betekenis.",
        "Jullie vertrouwen, jullie keuze om telkens opnieuw voor ons te komen, is het bewijs dat wat we doen goed is en van kwaliteit.",
        "Uit de grond van ons hart: dankjewel voor jullie steun en vertrouwen gedurende dit hele jaar.",
      ],
      // Event Details
      eventTitle: "Open Deur Dag",
      date: "Zondag 1 februari",
      time: "14:00 – 17:00",
      location: "Bruggestraat 146A, Zwevezele",
      // New Promo Section
      promoTitle: "🎁 Speciale Acties",
      promoSubtitle: "(Enkel op bestelling)",
      promos: [
        "10% Korting op COLI-menu's (geldig tot 1 feb)",
        "10% Korting bij aankoop van hetzelfde vlees vanaf 2 kg"
      ],
      ctaOnline: "BESTEL ONLINE MET KORTING",
      ctaLabel: "Tot dan! 🍖🎈"
    },
    ro: {
      badge: "🎉 Sărbătorim 1 AN!",
      title: "1 An de Slagerij John",
      subtitle: "Un an de muncă grea, pasiune și calitate – datorită vouă, clienții noștri.",
      paragraphs: [
        "Pe 1 februarie sărbătorim 1 an de când Slager John și-a deschis porțile.",
        "A fost un an plin de zile lungi de muncă, dedicare și sacrificii, dar mai ales un an în care am lucrat în fiecare zi cu inimă și suflet pentru a oferi calitate.",
        "Datorită vouă, clienții noștri, fiecare efort a avut un sens.",
        "Încrederea voastră, alegerea de a reveni de fiecare dată la noi, este dovada că ceea ce facem este bun și de calitate.",
        "Din adâncul inimii: vă mulțumim pentru sprijinul și încrederea acordate pe parcursul acestui an.",
      ],
      eventTitle: "Ziua Porților Deschise",
      date: "Duminică, 1 februarie",
      time: "14:00 – 17:00",
      location: "Bruggestraat 146A, Zwevezele",
      promoTitle: "🎁 Promoții Speciale",
      promoSubtitle: "(Doar la comandă)",
      promos: [
        "10% Reducere la meniurile COLI (până pe 1 feb)",
        "10% Reducere la cumpărarea a 2kg+ (același tip)"
      ],
      ctaOnline: "COMANDĂ ONLINE",
      ctaLabel: "Pe curând! 🍖🎈"
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b-2 border-primary/20"
        >
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="container mx-auto px-4 py-8 md:py-10">
            <div className="max-w-5xl mx-auto">
              
              {/* HEADER SECTION: Title & Message */}
              <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full mb-4 font-bold text-sm shadow-md"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>{t.badge}</span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  {t.title}
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground text-lg">{t.subtitle}</p>
                  {/* Show first 2 paragraphs always, others on desktop or if really needed */}
                  {t.paragraphs.map((p, i) => (
                     <p key={i} className={i > 2 ? "hidden md:block" : ""}>{p}</p>
                  ))}
                </div>
              </div>

              {/* INFO CARDS: Event (Left) & Promos (Right) */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                {/* 1. EVENT CARD */}
                <motion.div 
                  className="bg-card rounded-xl p-6 shadow-sm border border-border flex flex-col justify-center items-center text-center h-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {t.eventTitle}
                  </h3>
                  <div className="space-y-3 text-sm md:text-base">
                    <p className="font-semibold text-foreground">{t.date}</p>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{t.time}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{t.location}</span>
                    </div>
                  </div>
                </motion.div>

                {/* 2. PROMO CARD */}
                <motion.div 
                  className="bg-primary/5 rounded-xl p-6 shadow-sm border border-primary/20 flex flex-col justify-center h-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-serif font-bold text-primary flex items-center justify-center gap-2">
                      <Gift className="w-5 h-5" />
                      {t.promoTitle}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.promoSubtitle}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {t.promos.map((promo, i) => (
                      <li key={i} className="flex items-start gap-3 text-left">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-sm md:text-base">{promo}</span>
                      </li>
                    ))}
                  </ul>

                  <LocalizedLink to="/order" className="w-full">
                    <Button className="w-full font-bold shadow-md animate-pulse hover:animate-none">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {t.ctaOnline}
                    </Button>
                  </LocalizedLink>
                </motion.div>

              </div>

              {/* FOOTER CTA */}
              <div className="text-center">
                <p className="text-xl font-serif font-bold text-primary mb-2">
                  {t.ctaLabel}
                </p>
              </div>

            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default AnniversaryBanner;
