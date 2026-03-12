import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";

const Accessibility = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ro' ? 'ro-RO' : 'nl-BE';
  const currentDate = new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const breadcrumbLabel = language === 'ro' ? 'Accesibilitate' : 'Toegankelijkheid';
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: breadcrumbLabel, url: "/accessibility" },
  ]);

  const seoDescription = language === 'ro'
    ? 'Declarație de accesibilitate pentru site-ul Slagerij John. Ne străduim să facem site-ul accesibil pentru toți.'
    : 'Toegankelijkheidsverklaring voor de website van Slagerij John. Wij streven ernaar onze website toegankelijk te maken voor iedereen.';

  return (
    <>
      <SEO
        title={t('accessibilityPage.title')}
        description={seoDescription}
        structuredData={breadcrumbData}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('accessibilityPage.heading')}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {t('accessibilityPage.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('accessibilityPage.updated')}: {currentDate}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Onze Inzet voor Toegankelijkheid
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Slagerij John streeft ernaar om onze website toegankelijk te maken voor alle gebruikers, 
              inclusief mensen met beperkingen. Wij geloven dat iedereen het recht heeft om onze diensten 
              en producten gemakkelijk te kunnen gebruiken.
            </p>
          </section>

          {/* Standards */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Toegankelijkheidsnormen
            </h2>
            <p className="text-muted-foreground mb-4">
              Deze website streeft ernaar te voldoen aan de{" "}
              <a 
                href="https://www.w3.org/WAI/WCAG21/quickref/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
                <ExternalLink className="w-3 h-3" />
              </a>
              {" "}niveau AA. Deze richtlijnen helpen om webinhoud toegankelijker te maken voor mensen 
              met een breed scala aan beperkingen.
            </p>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Toegankelijkheidsfuncties
            </h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Toetsenbordnavigatie</h3>
                <p className="text-muted-foreground">
                  Alle functionaliteiten zijn toegankelijk via het toetsenbord. 
                  Gebruik Tab om door elementen te navigeren en Enter om acties uit te voeren.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Skip Link</h3>
                <p className="text-muted-foreground">
                  Een "Skip to content" link is beschikbaar aan het begin van elke pagina 
                  voor toetsenbordgebruikers om direct naar de hoofdinhoud te springen.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ ARIA Labels</h3>
                <p className="text-muted-foreground">
                  Uitgebreide ARIA-labels en -attributen ondersteunen schermlezers om 
                  de inhoud correct te interpreteren en voor te lezen.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Alt-teksten voor Afbeeldingen</h3>
                <p className="text-muted-foreground">
                  Alle informatieve afbeeldingen bevatten beschrijvende alt-teksten. 
                  Decoratieve afbeeldingen zijn verborgen voor schermlezers.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Semantische HTML</h3>
                <p className="text-muted-foreground">
                  Gebruik van semantische HTML-elementen (main, nav, section, footer) 
                  voor betere structuur en navigatie.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Focus Indicatoren</h3>
                <p className="text-muted-foreground">
                  Duidelijke visuele focus-indicatoren zijn aanwezig voor alle 
                  interactieve elementen bij toetsenbordnavigatie.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Responsief Ontwerp</h3>
                <p className="text-muted-foreground">
                  De website past zich aan verschillende schermformaten en apparaten aan, 
                  inclusief mobiele telefoons, tablets en desktops.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">✓ Tweetalig</h3>
                <p className="text-muted-foreground">
                  De website is beschikbaar in het Nederlands en Roemeens, 
                  met correcte taalattributen voor schermlezers.
                </p>
              </div>
            </div>
          </section>

          {/* Known Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Bekende Beperkingen
            </h2>
            <p className="text-muted-foreground mb-4">
              Ondanks onze inspanningen zijn er mogelijk nog enkele toegankelijkheidsproblemen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Sommige PDF-documenten zijn mogelijk niet volledig toegankelijk</li>
              <li>Bepaalde externe inhoud kan toegankelijkheidsproblemen bevatten</li>
              <li>We blijven werken aan het verbeteren van kleurcontrasten op alle pagina's</li>
            </ul>
          </section>

          {/* Testing */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Testen en Evaluatie
            </h2>
            <p className="text-muted-foreground mb-4">
              Deze website wordt regelmatig getest met:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Toetsenbordnavigatie testing</li>
              <li>Schermlezer compatibiliteit (NVDA, JAWS, VoiceOver)</li>
              <li>Geautomatiseerde toegankelijkheidstools (Lighthouse, WAVE, axe)</li>
              <li>Handmatige code reviews</li>
              <li>Gebruikerstesten met mensen met verschillende beperkingen</li>
            </ul>
          </section>

          {/* Feedback */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Feedback en Contact
            </h2>
            <p className="text-muted-foreground mb-6">
              Heeft u problemen met de toegankelijkheid van onze website of heeft u suggesties 
              voor verbetering? Wij horen graag van u!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">E-mail</p>
                  <a 
                    href="mailto:info@slagerij-john.be" 
                    className="text-primary hover:underline"
                  >
                    info@slagerij-john.be
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Telefoon</p>
                  <a 
                    href="tel:+32476123456" 
                    className="text-primary hover:underline"
                  >
                    +32 476 12 34 56
                  </a>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Wij streven ernaar om binnen 5 werkdagen te reageren op 
              toegankelijkheidsgerelateerde vragen.
            </p>
          </section>

          {/* Continuous Improvement */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Continue Verbetering
            </h2>
            <p className="text-muted-foreground">
              Toegankelijkheid is een voortdurend proces. Wij blijven onze website 
              monitoren en verbeteren om ervoor te zorgen dat deze toegankelijk blijft 
              voor alle gebruikers. Deze toegankelijkheidsverklaring wordt regelmatig 
              bijgewerkt om nieuwe verbeteringen en wijzigingen te weerspiegelen.
            </p>
          </section>

          {/* Legal */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              Wettelijk Kader
            </h2>
            <p className="text-muted-foreground">
              Deze toegankelijkheidsverklaring is opgesteld in overeenstemming met de 
              Europese richtlijn (EU) 2016/2102 betreffende de toegankelijkheid van 
              websites en mobiele applicaties van overheidsinstanties en best practices 
              voor toegankelijkheid van commerciële websites.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Accessibility;
