import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.webp";
import gallery6 from "@/assets/gallery-6.webp";
import gallery7 from "@/assets/gallery-7.webp";
import teamWorking from "@/assets/team-working.jpg";

export default function Catering() {
  const { t } = useLanguage();
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('nav.home'), url: '/' },
    { name: t('nav.catering'), url: '/catering' }
  ]);

  const galleryImages = [
    { src: teamWorking, alt: "Catering team at work" },
    { src: gallery1, alt: "Catering event setup" },
    { src: gallery2, alt: "Food display" },
    { src: gallery3, alt: "Catering service" },
    { src: gallery4, alt: "Event catering" },
    { src: gallery5, alt: "BBQ catering" },
    { src: gallery6, alt: "Food preparation" },
    { src: gallery7, alt: "Catering products" },
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
                  className="relative overflow-hidden rounded-lg aspect-square group hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
