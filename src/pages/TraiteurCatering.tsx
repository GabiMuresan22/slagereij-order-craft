import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Phone, FileText, MessageSquare, PartyPopper, Utensils, Users } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { Card, CardContent } from "@/components/ui/card";

// Images
import cateringBbqNight from "@/assets/catering-bbq-night.webp";
import cateringChefServing from "@/assets/catering-chef-serving.webp";
import cateringPartySpread from "@/assets/catering-party-spread.webp";
import cateringCharcuterie from "@/assets/catering-charcuterie.webp";
import cateringMiciGrill from "@/assets/catering-mici-grill.webp";
import cateringSalads from "@/assets/catering-salads.webp";

export default function TraiteurCatering() {
  const { t, language } = useLanguage();
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('nav.home'), url: '/' },
    { name: 'Traiteur & Catering', url: '/traiteur-catering' }
  ]);

  // Service cards
  const services = [
    {
      icon: Utensils,
      title: language === 'nl' ? 'Koude Schotels' : 'Platouri Reci',
      description: language === 'nl' 
        ? 'Luxe charcuterie, kaasschotels en hapjes voor elk feest.'
        : 'Mezeluri fine, platouri de brânzeturi și aperitive pentru orice eveniment.'
    },
    {
      icon: PartyPopper,
      title: language === 'nl' ? 'BBQ Pakketten' : 'Pachete BBQ',
      description: language === 'nl'
        ? 'Complete BBQ-pakketten met marinades en bijgerechten.'
        : 'Pachete complete BBQ cu marinate și garnituri.'
    },
    {
      icon: Users,
      title: language === 'nl' ? 'Warme Buffetten' : 'Bufete Calde',
      description: language === 'nl'
        ? 'Stoofpotjes, goulash en warme gerechten voor grotere groepen.'
        : 'Tocănițe, gulaș și preparate calde pentru grupuri mari.'
    }
  ];

  return (
    <>
      <SEO
        title={language === 'nl' 
          ? 'Traiteur & Catering Zwevezele | Slagerij John - Koude Schotels & BBQ'
          : 'Catering Zwevezele | Slagerij John - Platouri & BBQ'}
        description={language === 'nl'
          ? 'Op zoek naar een traiteur in Zwevezele, Wingene of Lichtervelde? Slagerij John verzorgt uw feesten met koude schotels, warme buffetten en BBQ-pakketten. Vraag een offerte!'
          : 'Cauți catering în Zwevezele? Slagerij John oferă platouri reci, bufete calde și pachete BBQ pentru evenimente. Solicită o ofertă!'}
        keywords="traiteur Zwevezele, catering Wingene, koude schotels, BBQ pakket bestellen, feestbuffet Lichtervelde, catering Roeselare, catering Tielt, traiteur West-Vlaanderen"
        structuredData={breadcrumbSchema}
      />
      
      <div className="min-h-screen pb-[60px] lg:pb-0">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <LazyImage
              src={cateringBbqNight}
              alt="Traiteur en catering service Slagerij John - BBQ en feestbuffetten in Zwevezele"
              className="w-full h-full object-cover object-center"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {language === 'nl' 
                ? 'Iets te vieren? Wij zorgen voor het eten.' 
                : 'Ai ceva de sărbătorit? Noi ne ocupăm de mâncare.'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl drop-shadow-md">
              {language === 'nl'
                ? 'Of het nu gaat om een verjaardag, communie of bedrijfsfeest in de regio Zwevezele, Wingene of Lichtervelde: Slagerij John is uw partner. Van koude schotels tot uitgebreide BBQ-pakketten.'
                : 'Fie că este vorba de o aniversare, botez sau eveniment de companie în zona Zwevezele, Wingene sau Lichtervelde: Slagerij John este partenerul tău. De la platouri reci la pachete BBQ complete.'}
            </p>
          </div>
        </section>

        {/* CTA Buttons Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/Folder-Slagerij-John.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
                  {language === 'nl' ? 'Download onze folder' : 'Descarcă broșura'}
                </Button>
              </a>
              <LocalizedLink to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {language === 'nl' ? 'Vraag een offerte' : 'Solicită o ofertă'}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-10">
              {language === 'nl' ? 'Onze Traiteur Diensten' : 'Serviciile Noastre de Catering'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div>
                <LazyImage
                  src={cateringChefServing}
                  alt="Professionele catering service door Slagerij John"
                  className="rounded-lg shadow-lg w-full h-auto"
                  width="800"
                  height="600"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  {language === 'nl' ? 'Zorgeloos genieten' : 'Bucură-te fără griji'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {language === 'nl'
                    ? 'Bij Slagerij John combineren we traditioneel vakmanschap met modern gemak. Wij nemen u het werk uit handen, zodat u kunt genieten van uw feest.'
                    : 'La Slagerij John combinăm meșteșugul tradițional cu confortul modern. Ne ocupăm de tot, astfel încât tu să te poți bucura de eveniment.'}
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {language === 'nl' ? 'Lokale kwaliteit van West-Vlaamse boeren' : 'Calitate locală de la fermieri vest-flamanzi'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {language === 'nl' ? 'Alles huisbereid in eigen atelier' : 'Totul preparat în atelierul propriu'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {language === 'nl' ? 'Flexibele formules voor elke groep' : 'Formule flexibile pentru orice grup'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-10">
              {language === 'nl' ? 'Onze Creaties' : 'Creațiile Noastre'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <LazyImage
                src={cateringCharcuterie}
                alt="Koude schotel met charcuterie - traiteur Zwevezele"
                className="rounded-lg shadow-md w-full h-48 object-cover"
                width="400"
                height="300"
              />
              <LazyImage
                src={cateringPartySpread}
                alt="Complete feestbuffet catering Wingene"
                className="rounded-lg shadow-md w-full h-48 object-cover"
                width="400"
                height="300"
              />
              <LazyImage
                src={cateringMiciGrill}
                alt="BBQ en grill catering Lichtervelde"
                className="rounded-lg shadow-md w-full h-48 object-cover"
                width="400"
                height="300"
              />
              <LazyImage
                src={cateringSalads}
                alt="Verse salades voor buffetten - traiteur West-Vlaanderen"
                className="rounded-lg shadow-md w-full h-48 object-cover"
                width="400"
                height="300"
              />
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {language === 'nl' ? 'Klaar om te bestellen?' : 'Gata să comanzi?'}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {language === 'nl'
                ? 'Neem contact met ons op voor een vrijblijvende offerte. Wij denken graag met u mee!'
                : 'Contactează-ne pentru o ofertă fără obligații. Ne face plăcere să te ajutăm!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+32466186457">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  +32 466 18 64 57
                </Button>
              </a>
              <LocalizedLink to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  {language === 'nl' ? 'Contactformulier' : 'Formular de contact'}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
