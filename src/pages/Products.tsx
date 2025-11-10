import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import beefImage from "@/assets/beef-products.jpg";
import porkImage from "@/assets/pork-products.jpg";
import poultryImage from "@/assets/poultry-products.jpg";
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
      image: beefImage,
      descriptionKey: "products.beef.description",
      itemKeys: [
        "products.beef.item1",
        "products.beef.item2",
        "products.beef.item3",
        "products.beef.item4",
        "products.beef.item5",
        "products.beef.item6"
      ]
    },
    {
      titleKey: "products.pork.title",
      image: porkImage,
      descriptionKey: "products.pork.description",
      itemKeys: [
        "products.pork.item1",
        "products.pork.item2",
        "products.pork.item3",
        "products.pork.item4",
        "products.pork.item5",
        "products.pork.item6"
      ]
    },
    {
      titleKey: "products.poultry.title",
      image: poultryImage,
      descriptionKey: "products.poultry.description",
      itemKeys: [
        "products.poultry.item1",
        "products.poultry.item2",
        "products.poultry.item3",
        "products.poultry.item4",
        "products.poultry.item5",
        "products.poultry.item6"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Ons Assortiment"
        description="Ontdek ons uitgebreide assortiment: premium rundvlees, verse varkensvlees, gevogelte en huisgemaakte specialiteiten. Kwaliteitsvlees voor elke gelegenheid."
        keywords="rundvlees, varkensvlees, gevogelte, huisgemaakte worst, BBQ vlees, biefstuk, gehakt"
        structuredData={breadcrumbData}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            {t('products.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Product Categories */}
        <div className="space-y-12 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden border-border hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div 
          className="h-64 md:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
          role="img"
          aria-label={t(category.titleKey)}
        />
                <CardContent className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
                    {t(category.titleKey)}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t(category.descriptionKey)}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.itemKeys.map((itemKey, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {t(itemKey)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Products */}
        <Card className="bg-muted/30 border-border mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-serif font-semibold mb-6 text-center text-foreground">
              {t('products.specialties.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div>
                <h3 className="font-semibold mb-3 text-xl text-primary">{t('products.specialties.homemade')}</h3>
                <ul className="space-y-2 text-foreground/90">
                  <li>• {t('products.specialties.homemade.item1')}</li>
                  <li>• {t('products.specialties.homemade.item2')}</li>
                  <li>• {t('products.specialties.homemade.item3')}</li>
                  <li>• {t('products.specialties.homemade.item4')}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-xl text-primary">{t('products.specialties.bbq')}</h3>
                <ul className="space-y-2 text-foreground/90">
                  <li>• {t('products.specialties.bbq.item1')}</li>
                  <li>• {t('products.specialties.bbq.item2')}</li>
                  <li>• {t('products.specialties.bbq.item3')}</li>
                  <li>• {t('products.specialties.bbq.item4')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
            {t('products.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t('products.cta.subtitle')}
          </p>
          <Link to="/order">
            <Button size="lg" className="text-lg px-8 py-6">
              {t('products.cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
