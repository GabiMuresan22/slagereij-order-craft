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
      subtitle: "Een jaar geleden opende wij met volle overgave de deuren van Slagerij John. Vol passie, ambitie en liefde voor het vak.",
      message: "Wij willen u bedanken voor het vertrouwen, de trouw en alle warme ontmoetingen aan de toonbank.",
      invitation: "Om dit samen te vieren nodigen wij u uit op onze",
      event: "Open Deur Dag",
      date: "Zondag 1 februari",
      time: "10:00 – 18:00",
      location: "Markt 34, Zwevezele",
      cta: "Tot dan! 🍖🎈",
    },
    ro: {
      badge: "🎉 Sărbătorim!",
      title: "1 An de Slagerij John",
      subtitle: "Acum un an am deschis cu pasiune ușile Măcelăriei John. Cu multă dragoste și dedicare pentru meserie.",
      message: "Vă mulțumim pentru încredere, loialitate și toate momentele frumoase la tejghea.",
      invitation: "Pentru a sărbători împreună, vă invităm la",
      event: "Ziua Porților Deschise",
      date: "Duminică, 1 februarie",
      time: "10:00 – 18:00",
      location: "Markt 34, Zwevezele",
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

              {/* Subtitle & Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="space-y-3 mb-6"
              >
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.subtitle}
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.message}
                </p>
              </motion.div>

              {/* Event Invitation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border mb-4"
              >
                <p className="text-muted-foreground mb-3">{t.invitation}</p>
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
