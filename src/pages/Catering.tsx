import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";

// Hero & Action images - Night atmosphere shots
import cateringBbqNight from "@/assets/catering-bbq-night.webp";
import cateringBbqSmoky from "@/assets/catering-bbq-smoky.webp";
import cateringMiciGrill from "@/assets/catering-mici-grill.webp";
import cateringChefServing from "@/assets/catering-chef-serving.webp";

// Freshness & Diversity images
import cateringSalads from "@/assets/catering-salads.webp";
import cateringPartySpread from "@/assets/catering-party-spread.webp";
import cateringGrainBowls from "@/assets/catering-grain-bowls.webp";
import cateringTacos from "@/assets/catering-tacos.webp";

// Cold Platters & Gallery
import cateringCharcuterie from "@/assets/catering-charcuterie.webp";
import cateringBeefSteak from "@/assets/catering-beef-steak.webp";
import cateringPastaBowls from "@/assets/catering-pasta-bowls.webp";
import cateringPartyPlatter from "@/assets/catering-party-platter.webp";
import cateringCheesePlatter from "@/assets/catering-cheese-platter.webp";
import cateringTomatoSalad from "@/assets/catering-tomato-salad.webp";

export default function Catering() {
  const { t, language } = useLanguage();
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.catering'), url: '/catering' }
  ]);

  // Gallery images with SEO-optimized captions and alt text
  const galleryImages = [
    // 1. Waitress photo (Full Service) - cateringChefServing
    { 
      src: cateringChefServing, 
      alt: language === 'nl' ? "Catering en hapjes voor recepties in West-Vlaanderen" : "Catering și aperitive pentru recepții în Flandra de Vest",
      caption: language === 'nl' ? "Zorgeloos genieten – Van hapjes tot tafelservice." : "Bucură-te fără griji – De la aperitive la servicii la masă."
    },
    // 2. Meat on the Fire/Rotisserie (Food Porn) - cateringBeefSteak
    { 
      src: cateringBeefSteak, 
      alt: language === 'nl' ? "Vers gegrild vlees en warme delicatessen van Slagerij John" : "Carne proaspăt gătită și delicatese calde de la Slagerij John",
      caption: language === 'nl' ? "Ambachtelijk gegrild – Sappig vlees, perfect bereid op het vuur." : "Grătar artizanal – Carne suculentă, perfect preparată pe foc."
    },
    // 3. Salad Bowls (Freshness) - cateringSalads
    { 
      src: cateringSalads, 
      alt: language === 'nl' ? "Verse salades en koude groenten voor barbecuebuffetten en feesten" : "Salate proaspete și legume reci pentru bufete barbecue și petreceri",
      caption: language === 'nl' ? "Kleurrijk & Vers – Een breed assortiment huisgemaakte salades en bijgerechten." : "Colorat și proaspăt – O gamă largă de salate și garnituri făcute în casă."
    },
    // 4. Individual bowls/Tacos (Refinement) - cateringTacos
    { 
      src: cateringTacos, 
      alt: language === 'nl' ? "Luxe aperitifhapjes en buffet traiteur Slagerij John" : "Aperitive de lux și bufet catering Slagerij John",
      caption: language === 'nl' ? "Moderne buffetten – Verrassende hapjes en wereldse smaken." : "Bufete moderne – Aperitive surprinzătoare și arome internaționale."
    },
    // 5. Charcuterie Platter (Classic) - cateringCharcuterie
    { 
      src: cateringCharcuterie, 
      alt: language === 'nl' ? "Koude schotel met charcuterie en kaas regio Wingene Zwevezele" : "Platou rece cu mezeluri și brânză în zona Wingene Zwevezele",
      caption: language === 'nl' ? "Klassieke Vleesschotels – De fijnste charcuterie, vers van het mes." : "Platouri clasice de carne – Cele mai fine mezeluri, proaspăt tăiate."
    },
    // Additional gallery images
    { src: cateringPartySpread, alt: language === 'nl' ? "Complete party catering met tacos en garnituren" : "Catering complet pentru petreceri cu tacos și garnituri", caption: "" },
    { src: cateringGrainBowls, alt: language === 'nl' ? "Gourmet bowls met zalm en groenten" : "Boluri gourmet cu somon și legume", caption: "" },
    { src: cateringPastaBowls, alt: language === 'nl' ? "Gourmet pastabowls met verse groenten" : "Boluri de paste gourmet cu legume proaspete", caption: "" },
    { src: cateringPartyPlatter, alt: language === 'nl' ? "Premium feestschotel met vleeswaren en kaas" : "Platou premium pentru petreceri cu mezeluri și brânză", caption: "" },
    { src: cateringCheesePlatter, alt: language === 'nl' ? "Ambachtelijke kaasschotel met druiven en walnoten" : "Platou artizanal de brânzeturi cu struguri și nuci", caption: "" },
    { src: cateringTomatoSalad, alt: language === 'nl' ? "Verse tomatensalade met rode ui en peterselie" : "Salată proaspătă de roșii cu ceapă roșie și pătrunjel", caption: "" },
  ];

  // SEO meta tags optimized for Belgian market
  const seoTitle = language === 'nl'
    ? 'Traiteur & Catering Zwevezele | BBQ, Buffetten & Feesten'
    : 'Catering & Evenimente | BBQ, Bufete & Preparate Românești';
  
  const seoDescription = language === 'nl'
    ? 'Traiteur nodig in Zwevezele, Wingene of Lichtervelde? Slagerij John verzorgt uw feest met koude schotels, warme buffetten en live BBQ. Vraag een offerte aan!'
    : 'Cauți catering pentru evenimente? Slagerij John oferă bufete reci, preparate calde și grătar live. Mici, cârnați și specialități tradiționale pentru sărbătorile tale.';

  const seoKeywords = language === 'nl'
    ? 'traiteur Zwevezele, catering Wingene, buffetten Lichtervelde, koude schotels, warme buffetten, BBQ catering, feesten, party service, slagerij traiteur'
    : 'catering evenimente, bufet rece, preparate românești, grătar, mici, cârnați, catering Belgia';

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={breadcrumbSchema}
      />
      
      <div className="min-h-screen">
        {/* Hero Section with Fire/Grill Image */}
        <section className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
          <div className="absolute inset-0">
            <LazyImage
              src={cateringBbqNight}
              alt="Traiteur barbecue op locatie in regio Zwevezele en Wingene door Slagerij John"
              className="w-full h-full object-cover object-center md:object-[center_30%]"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {language === 'nl' 
                ? 'Ambachtelijke slagerij & traiteur in Zwevezele.' 
                : 'Gustul de acasă, aici în Belgia.'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-md mb-8">
              {language === 'nl' 
                ? 'Dagvers vlees, huisbereide gerechten en feestelijke schotels. Bestel online en haal af wanneer het u past.' 
                : 'Mici, cârnați proaspeți și preparate tradiționale românești, realizate cu carne de cea mai bună calitate.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LocalizedLink to="/order">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  {language === 'nl' ? 'Bekijk onze webshop' : 'Vezi produsele românești'}
                </Button>
              </LocalizedLink>
              {language === 'nl' && (
                <LocalizedLink to="/catering">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
                    Onze promoties
                  </Button>
                </LocalizedLink>
              )}
            </div>
          </div>
        </section>

        {/* Intro Text Block */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
              {language === 'nl' 
                ? 'Bij Slagerij John verzorgen wij uw feesten tot in de puntjes. Of u nu een feest organiseert in Zwevezele, Wingene of Lichtervelde, onze traiteur diensten staan garant voor kwaliteit en versheid. Ontdek hieronder onze formules voor koude buffetten en barbecue.'
                : 'La Slagerij John, ne ocupăm de petrecerile tale până în cel mai mic detaliu. Fie că organizezi un eveniment în Zwevezele, Wingene sau Lichtervelde, serviciile noastre de catering garantează calitate și prospețime. Descoperă mai jos opțiunile noastre pentru bufete reci și grătar.'}
            </p>
          </div>
        </section>

        {/* Trust Section - Action Photos */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {language === 'nl' ? 'Wij Komen Bij U Koken' : 'Gătim la Tine Acasă'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('catering.p1')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('catering.p2')}
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                <figure>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                    <LazyImage
                      src={cateringBbqSmoky}
                      alt={language === 'nl' ? "Traiteur barbecue op locatie in regio Zwevezele en Wingene door Slagerij John" : "Catering grătar la domiciliu în zona Zwevezele și Wingene de la Slagerij John"}
                      className="w-full h-full object-cover"
                      width="600"
                      height="450"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted-foreground italic text-center">
                    {language === 'nl' ? "Live cooking op uw feest – Wij bakken, u geniet van uw gasten." : "Gătit live la petrecerea ta – Noi gătim, tu te bucuri de invitați."}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* BBQ Section with Sausages */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <figure>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                    <LazyImage
                      src={cateringMiciGrill}
                      alt={language === 'nl' ? "Barbecue worsten en vleesassortiment voor feesten en evenementen" : "Mici și cârnați la grătar pentru petreceri și evenimente"}
                      className="w-full h-full object-cover"
                      width="600"
                      height="450"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted-foreground italic text-center">
                    {language === 'nl' ? "Voor elk wat wils – Kwaliteitsvlees uit eigen atelier voor grote en kleine groepen." : "Pentru fiecare câte ceva – Carne de calitate din atelierul propriu pentru grupuri mari și mici."}
                  </figcaption>
                </figure>
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {language === 'nl' ? 'BBQ Formules Voor Elk Feest' : 'Pachete BBQ Pentru Orice Eveniment'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('catering.p3')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'nl' 
                    ? 'Of u nu een intiem tuinfeest plant of een groot bedrijfsevenement organiseert, wij hebben de capaciteit om iedereen te voorzien van heerlijke, vers bereide gerechten.'
                    : 'Fie că planifici o petrecere intimă în grădină sau organizezi un eveniment corporate mare, avem capacitatea de a oferi tuturor preparate delicioase, proaspăt gătite.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Freshness Section with Salads */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {language === 'nl' ? 'Verse Salades & Bijgerechten' : 'Salate Proaspete și Garnituri'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('catering.p4')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'nl' 
                    ? 'Van kleurrijke seizoenssalades tot elegante graanbowls - wij zorgen voor een perfect uitgebalanceerd menu dat al uw gasten zal bekoren.'
                    : 'De la salate colorate de sezon la boluri elegante cu cereale - asigurăm un meniu perfect echilibrat care va încânta toți invitații tăi.'}
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <LazyImage
                    src={cateringSalads}
                    alt={language === 'nl' ? "Verse salades en koude groenten voor barbecuebuffetten en feesten" : "Salate proaspete și legume reci pentru bufete barbecue și petreceri"}
                    className="w-full h-full object-cover"
                    width="600"
                    height="450"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'nl' ? 'Uw Feest, Onze Passie' : 'Petrecerea Ta, Pasiunea Noastră'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'nl' 
                ? 'Neem contact met ons op voor een vrijblijvende offerte. Wij bespreken graag uw wensen en stellen een menu op maat samen.'
                : 'Contactează-ne pentru o ofertă fără obligații. Ne face plăcere să discutăm dorințele tale și să creăm un meniu personalizat.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink to="/contact">
                <Button size="lg" className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  {language === 'nl' ? 'Contacteer Ons' : 'Contactează-ne'}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </section>


        {/* Gallery Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              {t('catering.gallery.title')}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square group hover:shadow-xl transition-shadow duration-300 mb-2">
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width="300"
                      height="300"
                      rootMargin="100px"
                    />
                  </div>
                  {image.caption && (
                    <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed px-1">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
