import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, ShoppingCart, ArrowRight } from "lucide-react";
import displayCaseImage from "@/assets/products-hero.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema, getProductListSchema } from "@/lib/structuredData";
import LocalizedLink from "@/components/LocalizedLink";

// Import images for menu categories
import tapasJohnPlatter from "@/assets/tapas-john-family-platter.webp";
import fondueVlees from "@/assets/fondue-bourguignonne-meat-platter-beef-chicken.webp";
import luxeGourmetSchotel from "@/assets/luxe-gourmet-schotel-10-soorten-vlees.webp";

interface MenuItem {
  name: string;
  price: string;
}

interface MenuCategory {
  title: string;
  badge?: string;
  items: MenuItem[];
  image?: string;
}

const Products = () => {
  const { t, language } = useLanguage();

  const breadcrumbData = getBreadcrumbSchema([
    { name: t('nav.home'), url: "/" },
    { name: t('products.breadcrumb'), url: "/products" },
  ]);

  const productListData = getProductListSchema();

  // SEO meta tags optimized for Belgian market
  const seoTitle = language === 'nl'
    ? 'Ons Aanbod | Menu\'s, Schotels & Colli\'s - Slagerij John'
    : 'Oferta Noastră | Meniuri, Platouri & Pachete - Slagerij John';
  
  const seoDescription = language === 'nl'
    ? 'Ontdek ons complete aanbod: hapjes, vleesschotels, tapas, fondue, gourmet en voordelige colli\'s. Bestel online bij Slagerij John in Zwevezele!'
    : 'Descoperă oferta noastră completă: aperitive, platouri de carne, tapas, fondue, gourmet și pachete avantajoase. Comandă online la Slagerij John!';

  const seoKeywords = language === 'nl'
    ? 'menu slagerij, hapjes bestellen, vleesschotels, tapas, fondue vlees, gourmet schotel, colli varken, colli kip, BBQ pakket, Zwevezele'
    : 'meniu măcelărie, aperitive, platouri carne, tapas, fondue, gourmet, pachet porc, pachet pui, pachet BBQ';

  // À La Carte menu categories
  const aLaCarteCategories: MenuCategory[] = [
    {
      title: t('menu.hapjes.title'),
      badge: t('menu.pricePerPerson'),
      items: [
        { name: t('menu.hapjes.scampi'), price: '€4' },
        { name: t('menu.hapjes.lepeltjeScampi'), price: '€2' },
        { name: t('menu.hapjes.lepeltjeMeloen'), price: '€2' },
        { name: t('menu.hapjes.lepeltjePate'), price: '€1,50' },
        { name: t('menu.hapjes.lepeltjeGeitenkaas'), price: '€2' },
        { name: t('menu.hapjes.lepeltjeZalm'), price: '€2' },
        { name: t('menu.hapjes.tacoGehakt'), price: '€2,50' },
        { name: t('menu.hapjes.tacoKip'), price: '€2,50' },
        { name: t('menu.hapjes.blinis'), price: '€2,50' },
        { name: t('menu.hapjes.bruschettaGeitenkaas'), price: '€2' },
        { name: t('menu.hapjes.bruschettaZalm'), price: '€1,50' },
        { name: t('menu.hapjes.bruschettaTomaat'), price: '€1' },
        { name: t('menu.hapjes.wrapsZalm'), price: '€2' },
        { name: t('menu.hapjes.wrapsHesp'), price: '€2' },
        { name: t('menu.hapjes.wrapsKip'), price: '€2' },
        { name: t('menu.hapjes.bulgurFeta'), price: '€3' },
        { name: t('menu.hapjes.bulgurFetaMeloen'), price: '€3' },
        { name: t('menu.hapjes.bulgurZalm'), price: '€3' },
        { name: t('menu.hapjes.bulgurGarnaal'), price: '€3,50' },
        { name: t('menu.hapjes.hawaiiSalade'), price: '€3' },
      ],
    },
    {
      title: t('menu.vlees.title'),
      badge: t('menu.pricePerPerson'),
      items: [
        { name: t('menu.vlees.ardeens'), price: '€6,50' },
        { name: t('menu.vlees.varkenshaas'), price: '€8' },
        { name: t('menu.vlees.orloff'), price: '€7' },
        { name: t('menu.vlees.kalkoen'), price: '€8,50' },
        { name: t('menu.vlees.hamrol'), price: '€10' },
        { name: t('menu.vlees.kipfilet'), price: '€8,40' },
        { name: t('menu.vlees.zalm'), price: '€10' },
      ],
    },
    {
      title: t('menu.groenten.title'),
      badge: '€5/pers',
      items: [
        { name: t('menu.groenten.bloemkool'), price: '' },
        { name: t('menu.groenten.boontjes'), price: '' },
        { name: t('menu.groenten.wortel'), price: '' },
        { name: t('menu.groenten.witloof'), price: '' },
      ],
    },
    {
      title: t('menu.soep.title'),
      badge: t('menu.pricePerPerson'),
      items: [
        { name: t('menu.soep.tomaat'), price: '€5,20/l' },
        { name: t('menu.soep.tomaatBalletjes'), price: '€5,60/l' },
        { name: t('menu.soep.pompoen'), price: '€6/l' },
        { name: t('menu.soep.broccoli'), price: '€5,50/l' },
      ],
    },
  ];

  // Extra menu categories
  const extraMenuCategories: MenuCategory[] = [
    {
      title: t('menu.broodjes.title'),
      badge: '€1,70/st',
      items: [
        { name: t('menu.broodjes.kipcurry'), price: '' },
        { name: t('menu.broodjes.hesp'), price: '' },
        { name: t('menu.broodjes.tonijn'), price: '' },
      ],
    },
    {
      title: t('menu.dessert.title'),
      badge: t('menu.dessert.badge'),
      items: [
        { name: t('menu.dessert.buffet1'), price: '€7/pers' },
        { name: t('menu.dessert.buffet2'), price: '€12/pers' },
        { name: t('menu.dessert.fruitBuffet'), price: '€4/pers' },
        { name: t('menu.dessert.meloenDruiven'), price: '' },
        { name: t('menu.dessert.ananasKiwi'), price: '' },
        { name: t('menu.dessert.mandarijnKaki'), price: '' },
      ],
    },
    {
      title: t('menu.keuze.title'),
      badge: t('menu.keuze.badge'),
      items: [
        { name: t('menu.keuze.vanille'), price: '€2' },
        { name: t('menu.keuze.tiramisu'), price: '€2,50' },
        { name: t('menu.keuze.donut'), price: '€2' },
        { name: t('menu.keuze.miniDonut'), price: '€1' },
        { name: t('menu.keuze.macarons'), price: '€2' },
      ],
    },
  ];

  // Image categories (Tapas, Fondue, Gourmet)
  const imageCategories: MenuCategory[] = [
    {
      title: t('menu.tapas.title'),
      badge: t('menu.tapas.badge'),
      image: tapasJohnPlatter,
      items: [
        { name: t('menu.tapas.kinder'), price: '€9/pers' },
        { name: t('menu.tapas.tapas2'), price: '€30 (4-5 pers)' },
        { name: t('menu.tapas.mix'), price: '€40 (5-6 pers)' },
        { name: t('menu.tapas.john1'), price: '€50 (5-6 pers)' },
        { name: t('menu.tapas.john2'), price: '€60 (7-9 pers)' },
        { name: t('menu.tapas.roemeens'), price: '€40 (5-6 pers)' },
      ],
    },
    {
      title: t('menu.fondue.title'),
      badge: t('menu.fondue.badge'),
      image: fondueVlees,
      items: [
        { name: t('menu.from'), price: '€10/pers' },
      ],
    },
    {
      title: t('menu.gourmet.title'),
      badge: t('menu.gourmet.badge'),
      image: luxeGourmetSchotel,
      items: [
        { name: t('menu.gourmet.9soorten'), price: '€10/pers' },
        { name: t('menu.gourmet.10soorten'), price: '€11/pers' },
        { name: t('menu.gourmet.luxe'), price: '€15/pers' },
      ],
    },
  ];

  // Colli's packages
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
    <div className="min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={[breadcrumbData, productListData]}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${displayCaseImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            {language === 'nl' ? 'Ons Aanbod' : 'Oferta Noastră'}
          </h1>
          <p className="text-xl md:text-2xl">
            {language === 'nl' 
              ? 'Menu\'s, schotels en voordelige colli\'s - alles voor uw feest of dagelijkse maaltijd'
              : 'Meniuri, platouri și pachete avantajoase - tot ce aveți nevoie pentru petrecere sau masă zilnică'}
          </p>
        </div>
      </section>

      {/* Menu's Speciale Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('menu.title').split(' ')[0]} <span className="text-primary">{t('menu.title').split(' ').slice(1).join(' ')}</span>
            </h2>
          </div>

          {/* À La Carte Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold">
                {t('menu.alacarte.title').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('menu.alacarte.title').split(' ').slice(-1)}</span>
              </h3>
              <p className="text-muted-foreground mt-2">
                {t('menu.alacarte.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aLaCarteCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-border hover:border-primary/50 transition-colors p-6"
                >
                  <h4 className="text-xl font-bold text-primary text-center mb-3">
                    {category.title}
                  </h4>
                  {category.badge && (
                    <div className="flex justify-center mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                        {category.badge}
                      </span>
                    </div>
                  )}
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between items-start text-sm">
                        <span className="flex items-start gap-2">
                          <span className="text-primary mt-1">◆</span>
                          <span>{item.name}</span>
                        </span>
                        {item.price && (
                          <span className="text-foreground font-medium ml-2 whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <LocalizedLink to="/order">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {t('menu.orderNow')}
                      </Button>
                    </LocalizedLink>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Extra Menu Options Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold">
                {t('menu.extra.title').split(' ')[0]} <span className="text-primary">{t('menu.extra.title').split(' ').slice(1).join(' ')}</span>
              </h3>
              <p className="text-muted-foreground mt-2">
                {t('menu.extra.subtitle')}
              </p>
            </div>

            {/* Top row - Cards without images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {extraMenuCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-border hover:border-primary/50 transition-colors p-6"
                >
                  <h4 className="text-xl font-bold text-primary text-center mb-3">
                    {category.title}
                  </h4>
                  {category.badge && (
                    <div className="flex justify-center mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                        {category.badge}
                      </span>
                    </div>
                  )}
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between items-start text-sm">
                        <span className="flex items-start gap-2">
                          <span className="text-primary mt-1">◆</span>
                          <span>{item.name}</span>
                        </span>
                        {item.price && (
                          <span className="text-foreground font-medium ml-2 whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <LocalizedLink to="/order">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {t('menu.orderNow')}
                      </Button>
                    </LocalizedLink>
                  </div>
                </Card>
              ))}
            </div>

            {/* Bottom row - Cards with images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {imageCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-border hover:border-primary/50 transition-colors overflow-hidden"
                >
                  {category.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-primary text-center italic mb-3">
                      {category.title}
                    </h4>
                    {category.badge && (
                      <div className="flex justify-center mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs text-center">
                          {category.badge}
                        </span>
                      </div>
                    )}
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex justify-between items-start text-sm">
                          <span className="flex items-start gap-2">
                            <span className="text-primary mt-1">◆</span>
                            <span>{item.name}</span>
                          </span>
                          {item.price && (
                            <span className="text-foreground font-medium ml-2 whitespace-nowrap">
                              {item.price}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colli's Menu Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              {language === 'nl' ? 'Voordelig' : 'Avantajos'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {t('packages.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                    <LocalizedLink to="/order">
                      <ShoppingCart className="w-4 h-4" />
                      {t('packages.orderNow')}
                    </LocalizedLink>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {language === 'nl' ? 'Klaar om te bestellen?' : 'Gata să comanzi?'}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === 'nl'
              ? 'Bestel eenvoudig online en haal uw bestelling op in onze winkel'
              : 'Comandă simplu online și ridică comanda din magazinul nostru'}
          </p>
          <LocalizedLink to="/order">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 group">
              {language === 'nl' ? 'Naar de Webshop' : 'Spre Magazin'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </LocalizedLink>
        </div>
      </section>
    </div>
  );
};

export default Products;