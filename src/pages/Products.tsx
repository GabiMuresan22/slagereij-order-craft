import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import beefImage from "@/assets/beef-products.jpg";
import porkImage from "@/assets/pork-products.jpg";
import poultryImage from "@/assets/poultry-products.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Products = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "Rundvlees",
      image: beefImage,
      description: "Premium biefstukken, gehakt, stoofvlees en meer",
      items: [
        "Biefstuk (diverse soorten)",
        "Rosbief",
        "Gehakt (rund)",
        "Stoofvlees",
        "Riblappen",
        "Ossenhaas"
      ]
    },
    {
      title: "Varkensvlees",
      image: porkImage,
      description: "Verse varkensproducten en huisgemaakte specialiteiten",
      items: [
        "Varkenshaas",
        "Koteletten",
        "Gehakt (varken)",
        "Speklappen",
        "Braadworst",
        "Huisgemaakte worst"
      ]
    },
    {
      title: "Gevogelte",
      image: poultryImage,
      description: "Verse kip, kalkoen en gevogelte specialiteiten",
      items: [
        "Hele kip",
        "Kipfilet",
        "Kippendijen",
        "Kalkoenfilet",
        "Kipgehakt",
        "Gevulde kip"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
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
                />
                <CardContent className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
                    {category.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {item}
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
                  <li>• Gehaktballen (speciaal recept)</li>
                  <li>• Verse worst (verschillende smaken)</li>
                  <li>• Kruidenboter</li>
                  <li>• Marinades</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-xl text-primary">{t('products.specialties.bbq')}</h3>
                <ul className="space-y-2 text-foreground/90">
                  <li>• BBQ pakketten</li>
                  <li>• Gemarineerde spiesjes</li>
                  <li>• Hamburgers (huisgemaakt)</li>
                  <li>• Spare ribs</li>
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
