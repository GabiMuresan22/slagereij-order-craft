import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "roadworks-alert-dismissed";

const RoadworksAlert = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the alert was already dismissed
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
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
    <div className="bg-amber-50 dark:bg-amber-950/50 border-b-2 border-amber-400 dark:border-amber-600 relative">
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
          aria-label="Sluiten / Închide"
        >
          <X className="w-5 h-5 text-amber-700 dark:text-amber-300" />
        </button>
        
        <div className="flex items-start gap-3 pr-8">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-amber-800 dark:text-amber-200">
              {currentContent.title}
            </p>
            {currentContent.lines.map((line, index) => (
              <p key={index} className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadworksAlert;
