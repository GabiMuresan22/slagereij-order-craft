import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      title: "Beste klanten,",
      lines: [
        "Vanaf vandaag zijn de werkzaamheden in de Bruggestraat opnieuw gestart.",
        'Onze zaak blijft bereikbaar vanuit beide richtingen, ook al staan er verkeersborden met "verboden toegang".',
        "Dank u wel voor uw begrip en steun.",
        "Wij verwelkomen u graag volgens onze normale openingsuren."
      ]
    },
    ro: {
      title: "Dragi clienți,",
      lines: [
        "Începând de astăzi au fost reluate lucrările pe Bruggestraat.",
        'Locația noastră este accesibilă din ambele sensuri, chiar dacă există indicatoare rutiere de „acces interzis".',
        "Vă mulțumim pentru înțelegere și susținere.",
        "Vă așteptăm cu program normal!"
      ]
    }
  };

  const currentContent = language === "ro" ? content.ro : content.nl;

  return (
    <div className="bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-primary-foreground/20 transition-colors"
          aria-label="Sluiten / Închide"
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>
        
        <div className="text-center pr-8 pl-8 space-y-2">
          <p className="font-serif font-semibold text-lg">
            {currentContent.title}
          </p>
          {currentContent.lines.map((line, index) => (
            <p key={index} className="text-sm leading-relaxed opacity-90">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadworksAlert;
