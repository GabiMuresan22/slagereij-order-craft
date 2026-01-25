import { PartyPopper, Calendar, Clock, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const AnniversaryBanner = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if banner was dismissed in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('anniversary_banner_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('anniversary_banner_dismissed', 'true');
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Event date check - hide after Feb 1, 2026
  const eventDate = new Date('2026-02-01T23:59:59');
  const now = new Date();
  if (now > eventDate || isDismissed) {
    return null;
  }

  const content = {
    nl: {
      badge: "🎉 Wij vieren feest!",
      title: "1 Jaar Slagerij John",
      subtitle: "Eén jaar hard werken, passie en kwaliteit – dankzij jullie, onze klanten.",
      paragraphs: [
        "Op 1 februari vieren we 1 jaar sinds Slager John zijn deuren opende.",
        "Het was een jaar vol lange werkdagen, inzet en opofferingen, maar vooral een jaar waarin we elke dag met hart en ziel hebben gewerkt om kwaliteit te bieden.",
        "Dankzij jullie, onze klanten, had elke inspanning een betekenis.",
        "Jullie vertrouwen, jullie keuze om telkens opnieuw voor ons te komen, is het bewijs dat wat we doen goed is en van kwaliteit.",
        "Uit de grond van ons hart: dankjewel voor jullie steun en vertrouwen gedurende dit hele jaar.",
      ],
      
      event: "Open Deur Dag",
      date: "Zondag 1 februari",
      time: "14:00 – 17:00",
      location: "Bruggestraat 146A, 8750 Zwevezele",
      cta: "Tot dan! 🍖🎈",
    },
    ro: {
      badge: "🎉 Sărbătorim!",
      title: "1 An de Slagerij John",
      subtitle: "Un an de muncă grea, pasiune și calitate – datorită vouă, clienții noștri.",
      paragraphs: [
        "Pe 1 februarie sărbătorim 1 an de când Slager John și-a deschis porțile.",
        "A fost un an plin de zile lungi de muncă, dedicare și sacrificii, dar mai ales un an în care am lucrat în fiecare zi cu inimă și suflet pentru a oferi calitate.",
        "Datorită vouă, clienții noștri, fiecare efort a avut un sens.",
        "Încrederea voastră, alegerea de a reveni de fiecare dată la noi, este dovada că ceea ce facem este bun și de calitate.",
        "Din adâncul inimii: vă mulțumim pentru sprijinul și încrederea acordate pe parcursul acestui an.",
      ],
      
      event: "Ziua Porților Deschise",
      date: "Duminică, 1 februarie",
      time: "14:00 – 17:00",
      location: "Bruggestraat 146A, 8750 Zwevezele",
      cta: "Pe curând! 🍖🎈",
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
          aria-labelledby="anniversary-heading"
        >
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-primary/10 transition-colors z-10"
            aria-label={language === 'nl' ? 'Sluiten' : 'Închide'}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="container mx-auto px-4 py-8 md:py-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full mb-4 font-semibold"
              >
                <PartyPopper className="w-5 h-5" aria-hidden="true" />
                <span>{t.badge}</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                id="anniversary-heading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4"
              >
                {t.title}
              </motion.h2>

              {/* Subtitle & Paragraphs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="space-y-3 mb-6"
              >
                <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
                  {t.subtitle}
                </p>
                {t.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Event Invitation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border mb-4"
              >
                
                <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-4">
                  {t.event}
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="font-medium">{t.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="font-medium">{t.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="font-medium">{t.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-lg md:text-xl font-semibold text-primary"
              >
                {t.cta}
              </motion.p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default AnniversaryBanner;
