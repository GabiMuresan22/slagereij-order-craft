import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceOption {
  persons: number;
  price: string;
}

interface MenuItem {
  id: number;
  titleKey: string;
  prices: PriceOption[];
  descriptionKey: string;
  ingredientKeys: string[];
}

// Menu items with translation keys
const menuItems: MenuItem[] = [
  {
    id: 1,
    titleKey: "christmasMenu.menu1.title",
    prices: [
      { persons: 2, price: "€195" },
      { persons: 4, price: "€380" },
      { persons: 6, price: "€565" }
    ],
    descriptionKey: "christmasMenu.menu1.description",
    ingredientKeys: [
      "christmasMenu.menu1.item1",
      "christmasMenu.menu1.item2",
      "christmasMenu.menu1.item3",
      "christmasMenu.menu1.item4",
      "christmasMenu.menu1.item5",
      "christmasMenu.menu1.item6",
      "christmasMenu.menu1.item7",
      "christmasMenu.menu1.item8"
    ]
  },
  {
    id: 2,
    titleKey: "christmasMenu.menu2.title",
    prices: [
      { persons: 2, price: "€140" },
      { persons: 4, price: "€270" },
      { persons: 6, price: "€400" }
    ],
    descriptionKey: "christmasMenu.menu2.description",
    ingredientKeys: [
      "christmasMenu.menu2.item1",
      "christmasMenu.menu2.item2",
      "christmasMenu.menu2.item3",
      "christmasMenu.menu2.item4",
      "christmasMenu.menu2.item5",
      "christmasMenu.menu2.item6",
      "christmasMenu.menu2.item7"
    ]
  },
  {
    id: 3,
    titleKey: "christmasMenu.menu3.title",
    prices: [
      { persons: 2, price: "€170" },
      { persons: 4, price: "€330" },
      { persons: 6, price: "€490" }
    ],
    descriptionKey: "christmasMenu.menu3.description",
    ingredientKeys: [
      "christmasMenu.menu3.item1",
      "christmasMenu.menu3.item2",
      "christmasMenu.menu3.item3",
      "christmasMenu.menu3.item4",
      "christmasMenu.menu3.item5",
      "christmasMenu.menu3.item6",
      "christmasMenu.menu3.item7",
      "christmasMenu.menu3.item8",
      "christmasMenu.menu3.item9"
    ]
  }
];

const ChristmasMenu = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="text-primary border-primary uppercase tracking-widest px-4 py-1">
            {t('christmasMenu.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            {t('christmasMenu.titlePrefix')} <span className="text-primary">{t('christmasMenu.title')}</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            {t('christmasMenu.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((menu) => (
            <Card 
              key={menu.id} 
              className="bg-neutral-800 border-primary transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header */}
              <CardHeader className="text-center pb-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <CardTitle className="text-xl font-serif font-bold text-primary min-h-[3.5rem] flex items-center justify-center">
                  {t(menu.titleKey)}
                </CardTitle>
                {menu.prices && (
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                    {menu.prices.map((priceOption, idx) => (
                      <div key={idx} className="flex flex-col items-center px-3 py-1 bg-neutral-900 rounded-lg border border-neutral-700">
                        <span className="text-lg font-bold text-white">{priceOption.price}</span>
                        <span className="text-xs text-neutral-400">{priceOption.persons} {t('christmasMenu.persons')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-grow pt-4">
                <div className="mb-4 text-center">
                  <span className="inline-block px-3 py-1 bg-neutral-900 rounded-full text-xs font-semibold text-neutral-300 border border-neutral-700">
                    {t(menu.descriptionKey)}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {menu.ingredientKeys.map((ingredientKey, idx) => (
                    <li key={idx} className="flex items-start text-sm text-neutral-300 leading-relaxed">
                      <span className="mr-3 text-primary mt-1.5 text-[10px]">◆</span>
                      <span>{t(ingredientKey)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Card Footer (Optional Order Button) */}
              <CardFooter className="pt-4 border-t border-neutral-700">
                <Link to="/order" className="w-full">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide"
                  >
                    {t('christmasMenu.orderNow')}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChristmasMenu;
