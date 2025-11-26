import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, ShoppingCart } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBreadcrumbSchema } from "@/lib/structuredData";

export default function Packages() {
  const { t } = useLanguage();
  
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pakketten", url: "/packages" },
  ]);
  
  const packages = [
    {
      id: 1,
      titleKey: 'packages.pork1.title',
      price: 45,
      itemKeys: [
        'packages.pork1.item1',
        'packages.pork1.item2',
        'packages.pork1.item3',
        'packages.pork1.item4',
        'packages.pork1.item5',
      ],
    },
    {
      id: 2,
      titleKey: 'packages.pork2.title',
      price: 55,
      itemKeys: [
        'packages.pork2.item1',
        'packages.pork2.item2',
        'packages.pork2.item3',
        'packages.pork2.item4',
        'packages.pork2.item5',
        'packages.pork2.item6',
      ],
    },
    {
      id: 3,
      titleKey: 'packages.chicken.title',
      price: 50,
      itemKeys: [
        'packages.chicken.item1',
        'packages.chicken.item2',
        'packages.chicken.item3',
        'packages.chicken.item4',
        'packages.chicken.item5',
      ],
    },
    {
      id: 4,
      titleKey: 'packages.mixed.title',
      price: 60,
      itemKeys: [
        'packages.mixed.item1',
        'packages.mixed.item2',
        'packages.mixed.item3',
        'packages.mixed.item4',
        'packages.mixed.item5',
        'packages.mixed.item6',
      ],
    },
    {
      id: 5,
      titleKey: 'packages.bbq.title',
      price: 55,
      itemKeys: [
        'packages.bbq.item1',
        'packages.bbq.item2',
        'packages.bbq.item3',
        'packages.bbq.item4',
        'packages.bbq.item5',
      ],
    },
    {
      id: 6,
      titleKey: 'packages.john.title',
      price: 100,
      itemKeys: [
        'packages.john.item1',
        'packages.john.item2',
        'packages.john.item3',
        'packages.john.item4',
        'packages.john.item5',
        'packages.john.item6',
        'packages.john.item7',
        'packages.john.item8',
        'packages.john.item9',
        'packages.john.item10',
      ],
      featured: true
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title={t('packages.title')}
        description={t('packages.subtitle')}
        keywords="vleespakketten, BBQ pakket, varkenspakket, kippakket, Zwevezele, voordeel"
        structuredData={breadcrumbData}
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">
            {t('packages.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('packages.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`flex flex-col h-full hover:shadow-lg transition-all border-2 ${pkg.featured ? 'border-primary/50 shadow-md' : 'border-border'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-serif">{t(pkg.titleKey)}</CardTitle>
                  <span className="text-2xl font-bold text-primary">€{pkg.price}</span>
                </div>
                {pkg.featured && <Badge className="w-fit bg-primary text-primary-foreground">{t('packages.featured')}</Badge>}
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {pkg.itemKeys.map((itemKey, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      {t(itemKey)}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-6">
                <div className="w-full text-center text-sm italic text-orange-600 bg-orange-50 dark:bg-orange-900/20 py-2 rounded">
                  {t('packages.orderOnly')}
                </div>
                <Button className="w-full gap-2" asChild>
                  <Link to="/order">
                    <ShoppingCart className="w-4 h-4" />
                    {t('packages.orderNow')}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
