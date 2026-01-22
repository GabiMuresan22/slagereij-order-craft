import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const MenuSection = () => {
  const { t, language } = useLanguage();

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

  const orderPath = language === 'nl' ? '/bestellen' : '/ro/bestellen';

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            {t('menu.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('menu.title').split(' ')[0]} <span className="text-primary">{t('menu.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('menu.subtitle')}
          </p>
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
                  <Link to={orderPath}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      {t('menu.orderNow')}
                    </Button>
                  </Link>
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
                  <Link to={orderPath}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      {t('menu.orderNow')}
                    </Button>
                  </Link>
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
  );
};

export default MenuSection;
