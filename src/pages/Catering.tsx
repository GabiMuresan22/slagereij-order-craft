import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import cateringChef from "@/assets/catering-chef-grilling.webp";
import cateringChefServing from "@/assets/catering-chef-serving.webp";
import cateringSalads from "@/assets/catering-salads.webp";
import cateringSausages from "@/assets/catering-sausages.webp";
import cateringPorkChops from "@/assets/catering-pork-chops.webp";
import cateringCharcuterie from "@/assets/catering-charcuterie.webp";
import cateringPartySpread from "@/assets/catering-party-spread.webp";
import cateringBeefSteak from "@/assets/catering-beef-steak.webp";
import cateringGrainBowls from "@/assets/catering-grain-bowls.webp";
import cateringTacos from "@/assets/catering-tacos.webp";
import cateringPastaBowls from "@/assets/catering-pasta-bowls.webp";
import cateringPartyPlatter from "@/assets/catering-party-platter.webp";
import cateringCheesePlatter from "@/assets/catering-cheese-platter.webp";
import cateringTomatoSalad from "@/assets/catering-tomato-salad.webp";
import romanianPlatter from "@/assets/romanian-traditional-appetizer-platter-charcuterie.webp";
import kidsPlatter from "@/assets/kids-tapas-finger-food.webp";
import tapasJohn from "@/assets/tapas-john-part-mix.webp";

export default function Catering() {
  const { t } = useLanguage();
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.catering'), url: '/catering' }
  ]);

  const galleryImages = [
    { src: romanianPlatter, alt: "Traditional Romanian appetizer platter with mixed charcuterie" },
    { src: kidsPlatter, alt: "Child-friendly party platter with mini burgers and snacks" },
    { src: tapasJohn, alt: "Tapas mix platter serving for two people" },
    { src: cateringChef, alt: "Professional chef grilling at outdoor catering event" },
    { src: cateringChefServing, alt: "Chef presenting gourmet catering dishes on serving tray" },
    { src: cateringCharcuterie, alt: "Artisanal charcuterie platter with premium meats and accompaniments" },
    { src: cateringPorkChops, alt: "Juicy grilled pork chops on professional BBQ" },
    { src: cateringSausages, alt: "Fresh homemade sausages grilling to perfection" },
    { src: cateringSalads, alt: "Fresh colorful salad bowls with vegetables" },
    { src: cateringPartySpread, alt: "Complete party catering spread with tacos and sides" },
    { src: cateringTacos, alt: "Artfully arranged taco platter with fresh toppings" },
    { src: cateringGrainBowls, alt: "Gourmet grain bowls with salmon and vegetables" },
    { src: cateringBeefSteak, alt: "Premium beef steak with rosemary and peppercorns" },
    { src: cateringPastaBowls, alt: "Gourmet pasta bowls with fresh vegetables in ceramic dishes" },
    { src: cateringPartyPlatter, alt: "Premium party platter with cold cuts, cheese, olives and garnishes" },
    { src: cateringCheesePlatter, alt: "Artisanal cheese platter with grapes, walnuts and dried fruits" },
    { src: cateringTomatoSalad, alt: "Fresh tomato salad with red onions and parsley garnish" },
  ];

  return (
    <>
      <SEO
        title={t('catering.title')}
        description={t('catering.subtitle')}
        keywords="catering, traiteur, feesten, events, BBQ, barbecue, party service, Zwevezele"
        structuredData={breadcrumbSchema}
      />
      
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-muted/20 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 text-center">
              {t('catering.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold text-center max-w-3xl mx-auto">
              {t('catering.subtitle')}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t('catering.p1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t('catering.p2')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t('catering.p3')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('catering.p4')}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              {t('catering.gallery.title')}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-lg aspect-[3/4] group hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="400"
                    height="533"
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
