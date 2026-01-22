import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ChefHat, ShoppingBag, PartyPopper, Heart, FileText, MessageSquare, Package, Clock, Home as HomeIcon } from "lucide-react";
import heroImageDesktop from "@/assets/hero-steak.webp";
import heroImageMobile from "@/assets/hero-steak-mobile.webp";
import Testimonials from "@/components/Testimonials";
import ChristmasMenu from "@/components/ChristmasMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getLocalBusinessSchema, getReviewsSchema } from "@/lib/structuredData";
import LocalizedLink from "@/components/LocalizedLink";

// Category images
import porkProducts from "@/assets/pork-products.webp";
import cateringChefServing from "@/assets/catering-chef-serving.webp";
import romanianPlatter from "@/assets/romanian-traditional-appetizer-platter-charcuterie.webp";
import teamPortrait from "@/assets/team-portrait.webp";
import cateringPartySpread from "@/assets/catering-party-spread.webp";

const Home = () => {
  const { t, language } = useLanguage();
  const structuredData = [getLocalBusinessSchema(), getReviewsSchema()];

  // SEO meta tags optimized for Belgian market (CTR & local ranking)
  const seoTitle = language === 'nl' 
    ? 'Slagerij John Zwevezele | Vers Vlees, Traiteur & Roemeense Specialiteiten'
    : 'Măcelăria John Zwevezele | Carne Proaspătă & Produse Românești';
  
  const seoDescription = language === 'nl'
    ? 'Bestel online bij Slagerij John. Uw ambachtelijke slager in Zwevezele voor gourmet, BBQ en dagvers vlees. Ook authentieke Roemeense producten. Afhaling in de winkel.'
    : 'Gustul de acasă în Belgia. Comandă mici, cârnați și preparate tradiționale românești de la Slagerij John. Ridicare din Zwevezele.';

  // Featured Products - 3 cards with appetizing photos
  const featuredProducts = [
    {
      title: t('home.featured.freshMeat.title'),
      description: t('home.featured.freshMeat.desc'),
      image: porkProducts,
      link: '/products',
      alt: language === 'nl' ? 'biefstuk kopen, varkenshaasje, dagvers vlees' : 'carne proaspătă de vită și porc'
    },
    {
      title: t('home.featured.catering.title'),
      description: t('home.featured.catering.desc'),
      image: cateringChefServing,
      link: '/catering',
      alt: language === 'nl' ? 'gourmet schotel, traiteur, steengrill' : 'catering și platouri gourmet'
    },
    {
      title: t('home.featured.specialties.title'),
      description: t('home.featured.specialties.desc'),
      image: romanianPlatter,
      link: '/products',
      alt: language === 'nl' ? 'huisgemaakte specialiteiten, Roemeense mici' : 'specialități românești, mici, cârnați'
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

      {/* 1. HERO SECTION - First Impression */}
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
          
          {/* CTA Buttons - Different for NL vs RO */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink to="/order">
              <Button
                size="lg"
                className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all min-h-[48px] shadow-lg border-2 border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto"
              >
                {t("home.hero.ctaPrimary")}
              </Button>
            </LocalizedLink>
            {language === 'nl' && (
              <LocalizedLink to="/catering">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 font-semibold bg-transparent text-white border-2 border-white hover:bg-white hover:text-foreground transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto"
                >
                  {t("home.hero.ctaSecondary")}
                </Button>
              </LocalizedLink>
            )}
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION - Trust & Quality */}
      <section className="py-12 md:py-16 bg-background" aria-labelledby="intro-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("home.intro.text")}
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS - 3 Cards */}
      <section className="py-12 md:py-16 bg-muted/30" aria-labelledby="featured-heading">
        <div className="container mx-auto px-4">
          <h2 id="featured-heading" className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12">
            {t("home.featured.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <LocalizedLink
                key={index}
                to={product.link}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-white text-2xl font-serif font-bold mb-2" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}>
                    {product.title}
                  </h3>
                  <p className="text-white/90 text-base" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                    {product.description}
                  </p>
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS - Simple Steps */}
      <section className="py-12 md:py-16 bg-background" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <h2 id="how-it-works-heading" className="text-2xl md:text-3xl font-serif font-bold text-center mb-10">
            {t("home.howItWorks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-2xl font-bold">
                1
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Package className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">{t("home.howItWorks.step1.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.howItWorks.step1.desc")}</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-2xl font-bold">
                2
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">{t("home.howItWorks.step2.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.howItWorks.step2.desc")}</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-2xl font-bold">
                3
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <HomeIcon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">{t("home.howItWorks.step3.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.howItWorks.step3.desc")}</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <LocalizedLink to="/order">
              <Button size="lg" className="px-8">
                {t("home.hero.ctaPrimary")}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* 5. VALUE PROPOSITION SECTION - Why Us? */}
      <section className="py-12 md:py-16 bg-muted/50 border-y border-border" aria-labelledby="why-us-heading">
        <div className="container mx-auto px-4">
          <h2 id="why-us-heading" className="text-2xl md:text-3xl font-serif font-bold text-center mb-10">
            {t("home.whyUs.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Local Quality */}
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">{t("home.whyUs.local.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.whyUs.local.desc")}</p>
            </div>

            {/* Homemade */}
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ChefHat className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">{t("home.whyUs.homemade.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.whyUs.homemade.desc")}</p>
            </div>

            {/* Convenience */}
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">{t("home.whyUs.convenience.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.whyUs.convenience.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATERING & EVENTS SECTION - High Ticket Sales */}
      <section className="py-12 md:py-20 bg-muted/30" aria-labelledby="catering-heading">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Catering & Events</span>
              </div>
              <h2 id="catering-heading" className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {t("home.catering.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t("home.catering.body")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LocalizedLink to="/traiteur-catering">
                  <Button size="lg" className="w-full sm:w-auto">
                    <FileText className="mr-2 h-5 w-5" />
                    {t("home.catering.ctaFolder")}
                  </Button>
                </LocalizedLink>
                <LocalizedLink to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {t("home.catering.ctaQuote")}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={cateringPartySpread}
                  alt={language === 'nl' ? 'Complete party catering met tacos en bijgerechten' : 'Catering complet pentru petreceri'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Christmas Menu Section */}
      <ChristmasMenu />

      {/* Testimonials Section */}
      <Testimonials />

      {/* 5. ABOUT US SECTION - Personal Connection */}
      <section className="py-12 md:py-20 bg-background" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={teamPortrait}
                  alt={language === 'nl' ? 'Het team van Slagerij John' : 'Echipa Măcelăriei John'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {language === 'nl' ? 'Ons Verhaal' : 'Povestea Noastră'}
                </span>
              </div>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {t("home.about.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {t("home.about.p1")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t("home.about.p2")}
              </p>
              <LocalizedLink to="/about">
                <Button size="lg" variant="outline">
                  {t("home.about.cta")}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

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