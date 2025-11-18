import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import displayCaseImage from "@/assets/display-case.webp";
import tomatoImage from "@/assets/tomahawk-steaks.webp";
import porkMariImage from "@/assets/pork-marinated.webp";
import poultryImage from "@/assets/roasted-chicken.webp";
import specialtyImage from "@/assets/specialty-platter.webp";
import productBuffetSpread from "@/assets/product-buffet-spread.jpg";
import productWrappedSandwiches from "@/assets/product-wrapped-sandwiches.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";

const Products = () => {
  const { t } = useLanguage();

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Producten', url: '/products' }
  ]);

  const categories = [
    {
      titleKey: "products.beef.title",
      subtitleKey: "products.beef.subtitle",
      image: tomatoImage,
      itemKeys: [
        "products.beef.item1",
        "products.beef.item2",
        "products.beef.item3",
        "products.beef.item4",
        "products.beef.item5",
        "products.beef.item6"
      ],
      ctaKey: "products.beef.cta"
    },
    {
      titleKey: "products.pork.title",
      subtitleKey: "products.pork.subtitle",
      image: porkMariImage,
      itemKeys: [
        "products.pork.item1",
        "products.pork.item2",
        "products.pork.item3",
        "products.pork.item4",
        "products.pork.item5",
        "products.pork.item6"
      ],
      ctaKey: "products.pork.cta"
    },
    {
      titleKey: "products.poultry.title",
      subtitleKey: "products.poultry.subtitle",
      image: poultryImage,
      itemKeys: [
        "products.poultry.item1",
        "products.poultry.item2",
        "products.poultry.item3",
        "products.poultry.item4",
        "products.poultry.item5",
        "products.poultry.item6"
      ],
      ctaKey: "products.poultry.cta"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Ons Assortiment"
        description="Ontdek ons uitgebreide assortiment: premium rundvlees, verse varkensvlees, gevogelte en huisgemaakte specialiteiten. Kwaliteitsvlees voor elke gelegenheid."
        keywords="rundvlees, varkensvlees, gevogelte, huisgemaakte worst, BBQ vlees, biefstuk, gehakt"
        structuredData={breadcrumbData}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${displayCaseImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            {t('products.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl">
            {t('products.hero.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Product Categories */}
        <div className="space-y-20 mb-20">
          {categories.map((category, index) => (
            <section key={index} className={index % 2 === 0 ? "" : "bg-muted/20 -mx-4 px-4 py-12 md:py-16"}>
              <Card className="overflow-hidden border-border hover:shadow-2xl transition-all duration-300 max-w-6xl mx-auto">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  <div 
                    className={`h-80 md:h-auto bg-cover bg-center ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
                    style={{ backgroundImage: `url(${category.image})` }}
                    role="img"
                    aria-label={t(category.titleKey)}
                  />
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary">
                      {t(category.titleKey)}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      {t(category.subtitleKey)}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {category.itemKeys.map((itemKey, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                          <span>{t(itemKey)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full md:w-auto">
                      {t(category.ctaKey)}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </section>
          ))}
        </div>

        {/* Specialties Section */}
        <section className="mb-20">
          <Card className="overflow-hidden border-border">
            <div className="grid md:grid-cols-2 gap-0">
              <div 
                className="h-80 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${specialtyImage})` }}
                role="img"
                aria-label={t('products.specialties.title')}
              />
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary">
                  {t('products.specialties.title')}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('products.specialties.subtitle')}
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4 text-primary">
                      {t('products.specialties.homemade.title')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.homemade.item1')}</span>
                      </li>
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.homemade.item2')}</span>
                      </li>
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.homemade.item3')}</span>
                      </li>
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.homemade.item4')}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-4 text-primary">
                      {t('products.specialties.bbq.title')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.bbq.item1')}</span>
                      </li>
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.bbq.item2')}</span>
                      </li>
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.bbq.item3')}</span>
                      </li>
                      <li className="flex items-start text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{t('products.specialties.bbq.item4')}</span>
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full md:w-auto">
                    {t('products.specialties.cta')}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Product Gallery */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-primary">
            Onze Producten in Beeld
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-lg group hover:shadow-2xl transition-all duration-300">
              <img
                src={productBuffetSpread}
                alt="Uitgebreide buffet spread met verse salades, donuts en specialiteiten"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg group hover:shadow-2xl transition-all duration-300">
              <img
                src={productWrappedSandwiches}
                alt="Kleurrijke wraps en broodjes platter"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-muted/30 rounded-lg p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            {t('products.cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('products.cta.subtitle')}
          </p>
          <Link to="/order">
            <Button size="lg" className="text-lg px-10 py-6">
              {t('products.cta.button')}
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Products;
