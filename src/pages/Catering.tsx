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

  // Gallery images (professional, no kids/raw meat)
  const galleryImages = [
    { src: cateringChefServing, alt: "Chef presenting gourmet catering dishes on serving tray" },
    { src: cateringPartySpread, alt: "Complete party catering spread with tacos and sides" },
    { src: cateringGrainBowls, alt: "Gourmet grain bowls with salmon and vegetables" },
    { src: cateringCharcuterie, alt: "Artisanal charcuterie platter with premium meats" },
    { src: cateringTacos, alt: "Artfully arranged taco platter with fresh toppings" },
    { src: cateringBeefSteak, alt: "Premium beef steak with rosemary and peppercorns" },
    { src: cateringPastaBowls, alt: "Gourmet pasta bowls with fresh vegetables" },
    { src: cateringPartyPlatter, alt: "Premium party platter with cold cuts and cheese" },
    { src: cateringCheesePlatter, alt: "Artisanal cheese platter with grapes and walnuts" },
    { src: cateringTomatoSalad, alt: "Fresh tomato salad with red onions and parsley" },
  ];

  return (
    <>
      <SEO
        title="Caterer Slagerij John | Buffetten in Zwevezele & Wingene"
        description="Op zoek naar een caterer in Zwevezele of Wingene? Slagerij John verzorgt uw feesten met koude schotels, warme buffetten en barbecue. Bekijk onze folder!"
        keywords="caterer, traiteur, catering, buffetten, feesten, Zwevezele, Wingene, Lichtervelde, koude schotels, warme buffetten, barbecue, party service"
        structuredData={breadcrumbSchema}
      />
      
      <div className="min-h-screen">
        {/* Hero Section with Fire/Grill Image */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <LazyImage
              src={cateringBbqNight}
              alt="Professional chef grilling at night with atmospheric smoke and flames"
              className="w-full h-full object-cover"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {language === 'nl' ? 'Traiteur & Feestmenu\'s' : t('catering.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-md">
              {t('catering.subtitle')}
            </p>
          </div>
        </section>

        {/* Trust Section - Action Photos */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {language === 'nl' ? 'Wij Komen Bij U Koken' : 'We Cook at Your Place'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('catering.p1')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('catering.p2')}
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <LazyImage
                    src={cateringBbqSmoky}
                    alt="Chef grilling sausages with smoke at outdoor catering event"
                    className="w-full h-full object-cover"
                    width="600"
                    height="450"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BBQ Section with Sausages */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <LazyImage
                    src={cateringBbqSmoky}
                    alt="Professional BBQ grill full of sausages with smoke"
                    className="w-full h-full object-cover"
                    width="600"
                    height="450"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {language === 'nl' ? 'BBQ Formules Voor Elk Feest' : 'BBQ Packages for Every Event'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('catering.p3')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'nl' 
                    ? 'Of u nu een intiem tuinfeest plant of een groot bedrijfsevenement organiseert, wij hebben de capaciteit om iedereen te voorzien van heerlijke, vers bereide gerechten.'
                    : 'Whether you\'re planning an intimate garden party or organizing a large corporate event, we have the capacity to provide everyone with delicious, freshly prepared dishes.'}
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
                  {language === 'nl' ? 'Verse Salades & Bijgerechten' : 'Fresh Salads & Side Dishes'}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('catering.p4')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'nl' 
                    ? 'Van kleurrijke seizoenssalades tot elegante graanbowls - wij zorgen voor een perfect uitgebalanceerd menu dat al uw gasten zal bekoren.'
                    : 'From colorful seasonal salads to elegant grain bowls - we ensure a perfectly balanced menu that will delight all your guests.'}
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <LazyImage
                    src={cateringSalads}
                    alt="Fresh colorful salad bowls with vegetables"
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
              {language === 'nl' ? 'Uw Feest, Onze Passie' : 'Your Party, Our Passion'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'nl' 
                ? 'Neem contact met ons op voor een vrijblijvende offerte. Wij bespreken graag uw wensen en stellen een menu op maat samen.'
                : 'Contact us for a no-obligation quote. We\'d love to discuss your wishes and create a custom menu.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink to="/contact">
                <Button size="lg" className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  {language === 'nl' ? 'Contacteer Ons' : 'Contact Us'}
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
                  className="relative overflow-hidden rounded-lg aspect-square group hover:shadow-xl transition-shadow duration-300"
                >
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="300"
                    height="300"
                    rootMargin="100px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
