import { Button } from "@/components/ui/button";
import { MapPin, ChefHat, Clock, PartyPopper, Heart, FileText, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import heroImageDesktop from "@/assets/hero-steak.webp";
import heroImageMobile from "@/assets/hero-steak-mobile.webp";
import Testimonials from "@/components/Testimonials";
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
import steengrillPlatter from "@/assets/steengrill-vleesschotel-assortiment.webp";

const Home = () => {
  const { t, language } = useLanguage();
  const structuredData = [getLocalBusinessSchema(), getReviewsSchema()];

  // SEO meta tags optimized for Belgian market
  const seoTitle = language === 'nl' 
    ? 'Slagerij John Zwevezele | Bestel Vlees & Traiteur Online'
    : 'Măcelăria John Zwevezele | Carne Proaspătă & Mici Românești';
  
  const seoDescription = language === 'nl'
    ? 'Ambachtelijke slagerij in Zwevezele. Bestel online: vers vlees, BBQ pakketten, gourmet en Roemeense specialiteiten. Afhalen in de winkel. Bekijk ons aanbod!'
    : 'Cauți gustul de acasă? Slagerij John în Zwevezele îți oferă mici, cârnați afumați, carne proaspătă și preparate tradiționale. Comandă online simplu și rapid!';

  // Category Grid - 4 cards with SEO keywords
  const categories = [
    {
      title: t('home.categories.freshMeat.title'),
      description: t('home.categories.freshMeat.desc'),
      image: porkProducts,
      link: '/products',
      alt: 'biefstuk kopen, varkenshaasje, dagvers vlees Zwevezele'
    },
    {
      title: t('home.categories.bbq.title'),
      description: t('home.categories.bbq.desc'),
      image: steengrillPlatter,
      link: '/packages',
      alt: 'bbq pakket bestellen, gourmet schotel, steengrill Wingene'
    },
    {
      title: t('home.categories.prepared.title'),
      description: t('home.categories.prepared.desc'),
      image: cateringChefServing,
      link: '/traiteur-catering',
      alt: 'traiteur gerechten, spaghetti saus, bereide maaltijden'
    },
    {
      title: t('home.categories.romanian.title'),
      description: t('home.categories.romanian.desc'),
      image: romanianPlatter,
      link: '/products',
      alt: 'Roemeense mici, gerookte worst, authentieke specialiteiten'
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

      {/* A. HERO SECTION - Above the Fold */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" aria-hidden="true" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.9)" }}
          >
            {language === 'nl' 
              ? 'Ambachtelijke slagerij & traiteur in Zwevezele'
              : 'Gustul de acasă și calitatea belgiană.'}
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-white mb-8 md:mb-10 font-medium leading-relaxed max-w-2xl mx-auto"
            style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.9)" }}
          >
            {language === 'nl'
              ? 'Dagvers vlees, huisbereide gerechten en feestelijke schotels. Bestel online en haal af wanneer het u past.'
              : 'Măcelărie tradițională și preparate românești autentice, gătite cu pasiune în inima Flandrei.'}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink to="/order">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl transition-all min-h-[48px] shadow-lg border-2 border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto uppercase tracking-wide"
                >
                  {language === 'nl' ? 'NAAR DE WEBSHOP' : 'VEZI PRODUSELE'}
                </Button>
              </motion.div>
            </LocalizedLink>
            {language === 'nl' && (
              <LocalizedLink to="/traiteur-catering">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 font-semibold bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white/30 hover:border-white hover:text-white hover:shadow-xl transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full sm:w-auto uppercase tracking-wide"
                  >
                    BEKIJK FOLDER
                  </Button>
                </motion.div>
              </LocalizedLink>
            )}
          </div>
        </div>
      </section>

      {/* B. TRUST BAR - Immediately below Hero */}
      <section className="py-8 md:py-12 bg-muted/50 border-b border-border" aria-labelledby="trust-bar-heading">
        <div className="container mx-auto px-4">
          <h2 id="trust-bar-heading" className="sr-only">Waarom Slagerij John</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Lokaal & Vers */}
            <motion.div 
              className="flex items-center gap-4 p-4 md:justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MapPin className="w-7 h-7 text-primary" aria-hidden="true" />
              </motion.div>
              <div>
                <h3 className="font-serif font-semibold text-lg">{t("home.whyUs.local.title")}</h3>
                <p className="text-sm text-muted-foreground">{language === 'nl' ? 'Vlees van lokale boeren' : 'Carne de la fermieri locali'}</p>
              </div>
            </motion.div>

            {/* Huisbereid */}
            <motion.div 
              className="flex items-center gap-4 p-4 md:justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChefHat className="w-7 h-7 text-primary" aria-hidden="true" />
              </motion.div>
              <div>
                <h3 className="font-serif font-semibold text-lg">{t("home.whyUs.homemade.title")}</h3>
                <p className="text-sm text-muted-foreground">{language === 'nl' ? 'Dagelijks vers bereid' : 'Preparat proaspăt zilnic'}</p>
              </div>
            </motion.div>

            {/* Click & Collect */}
            <motion.div 
              className="flex items-center gap-4 p-4 md:justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Clock className="w-7 h-7 text-primary" aria-hidden="true" />
              </motion.div>
              <div>
                <h3 className="font-serif font-semibold text-lg">{t("home.whyUs.convenience.title")}</h3>
                <p className="text-sm text-muted-foreground">{language === 'nl' ? 'Bestel online, haal op' : 'Comandă online, ridică'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* C. VISUAL CATEGORY GRID - Product Navigation */}
      <section className="py-12 md:py-16 bg-background" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4">
          <motion.h2 
            id="categories-heading" 
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("home.categories.title")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LocalizedLink
                  to={category.link}
                  className="group relative overflow-hidden rounded-xl shadow-lg block aspect-[4/5] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <img
                      src={category.image}
                      alt={category.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                  <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 
                      className="text-white text-xl md:text-2xl font-serif font-bold mb-2" 
                      style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
                    >
                      {category.title}
                    </h3>
                    <p 
                      className="text-white/90 text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity" 
                      style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
                    >
                      {category.description}
                    </p>
                  </motion.div>
                </LocalizedLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATERING & EVENTS SECTION - High Ticket Sales */}
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
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button size="lg" className="w-full sm:w-auto hover:shadow-lg transition-shadow">
                      <FileText className="mr-2 h-5 w-5" />
                      {t("home.catering.ctaFolder")}
                    </Button>
                  </motion.div>
                </LocalizedLink>
                <LocalizedLink to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto hover:shadow-lg transition-shadow">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      {t("home.catering.ctaQuote")}
                    </Button>
                  </motion.div>
                </LocalizedLink>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={cateringPartySpread}
                  alt={language === 'nl' ? 'Complete party catering met tacos en bijgerechten' : 'Catering complet pentru petreceri'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* ABOUT US SECTION - Personal Connection */}
      <section className="py-12 md:py-20 bg-background" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={teamPortrait}
                  alt={language === 'nl' ? 'Het team van Slagerij John' : 'Echipa Măcelăriei John'}
                  className="w-full h-full object-cover"
                  loading="lazy"
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
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" variant="outline" className="hover:shadow-lg transition-shadow">
                    {t("home.about.cta")}
                  </Button>
                </motion.div>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-10 font-semibold min-h-[48px] hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t("home.cta.orderBtn")}
                </Button>
              </motion.div>
            </LocalizedLink>
            <LocalizedLink to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-10 font-semibold min-h-[48px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t("nav.contact")}
                </Button>
              </motion.div>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
