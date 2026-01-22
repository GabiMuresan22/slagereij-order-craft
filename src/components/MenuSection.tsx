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
      title: language === 'nl' ? 'Hapjes' : 'Aperitive',
      badge: language === 'nl' ? 'Prijs/pers' : 'Preț/pers',
      items: [
        { name: 'Scampi (2st)', price: '€4' },
        { name: 'Lepeltje scampi', price: '€2' },
        { name: 'Lepeltje meloen & serrano', price: '€2' },
        { name: 'Lepeltje paté', price: '€1,50' },
        { name: 'Lepeltje geitenkaas', price: '€2' },
        { name: 'Lepeltje zalm', price: '€2' },
        { name: 'Taco gehakt', price: '€2,50' },
        { name: 'Taco kip', price: '€2,50' },
        { name: 'Blini\'s met gerookte zalm', price: '€2,50' },
        { name: 'Bruschetta geitenkaas', price: '€2' },
        { name: 'Bruschetta zalm', price: '€1,50' },
        { name: 'Bruschetta tomaat', price: '€1' },
        { name: 'Wraps zalm', price: '€2' },
        { name: 'Wraps hesp', price: '€2' },
        { name: 'Wraps kip', price: '€2' },
        { name: 'Bulgur feta', price: '€3' },
        { name: 'Bulgur feta & meloen', price: '€3' },
        { name: 'Bulgur zalm', price: '€3' },
        { name: 'Bulgur garnaal', price: '€3,50' },
        { name: 'Hawaii salade', price: '€3' },
      ],
    },
    {
      title: language === 'nl' ? 'Vleeshoofdgerechten' : 'Feluri principale',
      badge: language === 'nl' ? 'Prijs/pers' : 'Preț/pers',
      items: [
        { name: 'Ardeens gebraad in champignonsaus', price: '€6,50' },
        { name: 'Varkenshaasje in sausje met spek', price: '€8' },
        { name: 'Orloffgebraad in kaassaus', price: '€7' },
        { name: 'Kalkoen in champignonsaus', price: '€8,50' },
        { name: 'Hamrol met witloof in kaassaus', price: '€10' },
        { name: 'Kipfilet in curry saus', price: '€8,40' },
        { name: 'Zalm in bearnaisesaus', price: '€10' },
      ],
    },
    {
      title: language === 'nl' ? 'Warme Groenten' : 'Legume calde',
      badge: '€5/pers',
      items: [
        { name: 'Bloemkool', price: '' },
        { name: 'Boontjes', price: '' },
        { name: 'Wortel', price: '' },
        { name: 'Witloof met spek', price: '' },
      ],
    },
    {
      title: language === 'nl' ? 'Soep' : 'Supă',
      badge: language === 'nl' ? 'Prijs/pers' : 'Preț/pers',
      items: [
        { name: 'Tomatensoep', price: '€5,20/l' },
        { name: 'Tomatensoep met balletjes', price: '€5,60/l' },
        { name: 'Pompoensoep', price: '€6/l' },
        { name: 'Broccolisoep', price: '€5,50/l' },
      ],
    },
  ];

  // Extra menu categories
  const extraMenuCategories: MenuCategory[] = [
    {
      title: language === 'nl' ? 'Mini Belegde Broodjes' : 'Mini sandvișuri',
      badge: '€1,70/st',
      items: [
        { name: 'Kipcurry / Vleessalade', price: '' },
        { name: 'Hesp / Salami / Kaas', price: '' },
        { name: 'Tonijn / Préparé', price: '' },
      ],
    },
    {
      title: language === 'nl' ? 'Dessert / Fruit' : 'Desert / Fructe',
      badge: language === 'nl' ? 'Diverse desserts en fruit' : 'Diverse deserturi',
      items: [
        { name: 'Dessertbuffet 1 (3 soorten)', price: '€7/pers' },
        { name: 'Dessertbuffet 2 (5 soorten)', price: '€12/pers' },
        { name: 'Fruit buffet (6 soorten)', price: '€4/pers' },
        { name: 'Meloen – Druiven', price: '' },
        { name: 'Ananas – Kiwi', price: '' },
        { name: 'Mandarijn – Kaki', price: '' },
      ],
    },
    {
      title: language === 'nl' ? 'Keuze Dessert' : 'Deserturi individuale',
      badge: language === 'nl' ? 'Individuele desserts' : 'Individuale',
      items: [
        { name: 'Vanille pudding', price: '€2' },
        { name: 'Tiramisu', price: '€2,50' },
        { name: 'Donut', price: '€2' },
        { name: 'Mini donut', price: '€1' },
        { name: 'Macarons', price: '€2' },
      ],
    },
  ];

  // Image categories (Tapas, Fondue, Gourmet)
  const imageCategories: MenuCategory[] = [
    {
      title: 'Tapas',
      badge: language === 'nl' ? 'Diverse tapas opties' : 'Diverse opțiuni tapas',
      image: tapasJohnPlatter,
      items: [
        { name: 'Kinder tapas', price: '€9/pers' },
        { name: 'Tapas 2', price: '€30 (4-5 pers)' },
        { name: 'Tapas mix', price: '€40 (5-6 pers)' },
        { name: 'Tapas John 1', price: '€50 (5-6 pers)' },
        { name: 'Tapas John 2', price: '€60 (7-9 pers)' },
        { name: 'Roemeense Tapas', price: '€40 (5-6 pers)' },
      ],
    },
    {
      title: 'Fondue',
      badge: '10 soorten',
      image: fondueVlees,
      items: [
        { name: language === 'nl' ? 'Vanaf' : 'De la', price: '€10/pers' },
      ],
    },
    {
      title: 'Gourmet',
      badge: 'Luxe Gourmet & Steengrill Schotel',
      image: luxeGourmetSchotel,
      items: [
        { name: 'Gourmet (9 soorten)', price: '€10/pers' },
        { name: 'Gourmet (10 soorten)', price: '€11/pers' },
        { name: 'Gourmet Luxe (10 soorten)', price: '€15/pers' },
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
            {language === 'nl' ? 'FEESTDAGEN SEIZOEN' : 'SEZON SĂRBĂTORI'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Menu's <span className="text-primary">Speciale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Authentieke traditionele gerechten voor uw Kerst- en Nieuwjaarsdiner.'
              : 'Preparate tradiționale autentice pentru cina de Crăciun și Revelion.'}
          </p>
        </div>

        {/* À La Carte Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">
              À La Carte <span className="text-primary">{language === 'nl' ? 'Opties' : 'Opțiuni'}</span>
            </h3>
            <p className="text-muted-foreground mt-2">
              {language === 'nl' 
                ? 'Individuele gerechten en hapjes voor uw feestmenu.'
                : 'Preparate individuale și aperitive pentru meniul festiv.'}
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
                      {language === 'nl' ? 'Bestel Nu' : 'Comandă Acum'}
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
              Extra <span className="text-primary">Menu {language === 'nl' ? 'Opties' : 'Opțiuni'}</span>
            </h3>
            <p className="text-muted-foreground mt-2">
              {language === 'nl' 
                ? 'Broodjes, desserts, tapas en meer voor uw feestmenu.'
                : 'Sandvișuri, deserturi, tapas și mai mult pentru meniul festiv.'}
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
                      {language === 'nl' ? 'Bestel Nu' : 'Comandă Acum'}
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
