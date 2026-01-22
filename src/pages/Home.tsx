import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ChefHat, Clock } from "lucide-react";
import heroImageDesktop from "@/assets/hero-steak.webp";
import heroImageMobile from "@/assets/hero-steak-mobile.webp";
import Testimonials from "@/components/Testimonials";
import ChristmasMenu from "@/components/ChristmasMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getLocalBusinessSchema, getReviewsSchema } from "@/lib/structuredData";
import LocalizedLink from "@/components/LocalizedLink";

// Category images
import bbqGrillMeats from "@/assets/bbq-grill-meats.webp";
import cateringChefServing from "@/assets/catering-chef-serving.webp";
import porkProducts from "@/assets/pork-products.webp";
import romanianPlatter from "@/assets/romanian-traditional-appetizer-platter-charcuterie.webp";

const Home = () => {
  const { t, language } = useLanguage();
  const structuredData = [getLocalBusinessSchema(), getReviewsSchema()];

  // SEO meta tags optimized for Belgian market
  const seoTitle = language === 'nl' 
    ? 'Slagerij John Zwevezele | Ambachtelijk Vlees & Traiteur Online'
    : 'Măcelăria John Zwevezele | Carne Proaspătă & Produse Românești';
  
  const seoDescription = language === 'nl'
    ? 'Bestel online bij Slagerij John. Uw slager in Zwevezele voor dagvers vlees, BBQ, gourmet en Roemeense specialiteiten. Vers bereid, makkelijk afgehaald.'
    : 'Gustul de acasă în Belgia. Comandă mici, cârnați și preparate tradiționale românești de la Slagerij John. Ridicare din Zwevezele.';

  // Category grid data
  const categories = [
    {
      title: language === 'nl' ? 'Vers Vlees' : 'Carne Proaspătă',
      image: porkProducts,
      link: '/products',
      alt: 'Vers vlees selectie'
    },
    {
      title: language === 'nl' ? 'BBQ & Gourmet' : 'BBQ & Gourmet',
      image: bbqGrillMeats,
      link: '/packages',
      alt: 'BBQ en gourmet vlees'
    },
    {
      title: language === 'nl' ? 'Traiteur' : 'Traiteur',
      image: cateringChefServing,
      link: '/catering',
      alt: 'Traiteur service'
    },
    {
      title: language === 'nl' ? 'Specialiteiten' : 'Specialități',
      image: romanianPlatter,
      link: '/products',
      alt: 'Roemeense en Belgische specialiteiten'
    }
  ];

  return (
    <div className="min-h-screen pb-[60px] lg:pb-0">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords="slagerij, traiteur, kwaliteitsvlees, Zwevezele, Wingene, catering, huisbereide gerechten, online bestellen, huisgemaakte worst, BBQ vlees, verse vleeswaren, Roemeense specialiteiten, mici"
        structuredData={structuredData}
      >
        <link rel="preload" as="image" href={heroImageDesktop} media="(min-width: 768px)" />
        <link rel="preload" as="image" href={heroImageMobile} media="(max-width: 767px)" />
      </SEO>

      {/* Hero Section - Above the Fold */}
      <section 
        className="relative h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden"
        aria-label={t("accessibility.heroSection") || "Welcome section"}
      >
        {/* Hero Image */}
        <picture>
          <source media="(min-width: 768px)" srcSet={heroImageDesktop} />
          <source media="(max-width: 767px)" srcSet={heroImageMobile} />
          <img
            src={heroImageDesktop}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>

        {/* Dark Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" aria-hidden="true" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-4 md:mb-6"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.9)" }}
          >
            {t("home.hero.title")}
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-white mb-8 md:mb-10 font-medium leading-relaxed max-w-2xl mx-auto"
            style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.9)" }}
          >
            {t("home.hero.subtitle")}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink to="/order">
              <Button
                size="lg"
                className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all min-h-[48px] shadow-lg border-2 border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto"
              >
                {t("home.hero.ctaPrimary")}
              </Button>
            </LocalizedLink>
            <LocalizedLink to="/catering">
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 font-semibold bg-transparent text-white border-2 border-white hover:bg-white hover:text-foreground transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto"
              >
                {t("home.hero.ctaSecondary")}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Trust Bar - Immediately below Hero */}
      <section className="py-8 md:py-12 bg-muted/50 border-y border-border" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="sr-only">{t("accessibility.ourFeatures") || "Our Features"}</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Lokaal & Vers */}
            <div className="flex items-center justify-center gap-4 p-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold">{t("home.trust.local.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.trust.local.desc")}</p>
              </div>
            </div>

            {/* Huisbereid */}
            <div className="flex items-center justify-center gap-4 p-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <ChefHat className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold">{t("home.trust.homemade.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.trust.homemade.desc")}</p>
              </div>
            </div>

            {/* Click & Collect */}
            <div className="flex items-center justify-center gap-4 p-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold">{t("home.trust.clickCollect.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.trust.clickCollect.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Category Grid - Product Navigation */}
      <section className="py-12 md:py-16 bg-background" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4">
          <h2 id="categories-heading" className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12">
            {t("home.categories.title")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <LocalizedLink
                key={index}
                to={category.link}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <img
                  src={category.image}
                  alt={category.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center p-4">
                  <h3 className="text-white text-lg md:text-xl font-serif font-bold text-center" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}>
                    {category.title}
                  </h3>
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* Christmas Menu Section */}
      <ChristmasMenu />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-5xl font-serif font-bold mb-6">{t("home.cta.title")}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{t("home.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink to="/order">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 font-bold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto"
              >
                {t("home.cta.orderBtn")}
              </Button>
            </LocalizedLink>
            <LocalizedLink to="/products">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto"
              >
                {t("home.cta.productsBtn")}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
