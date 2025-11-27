import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface PriceOption {
  persons: number;
  price: string;
}

interface MenuItem {
  id: number;
  title: string;
  price?: string;
  unit?: string;
  prices?: PriceOption[];
  description: string;
  ingredients: string[];
}

// Data extracted directly from your photos
const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Meniu Traditional John",
    prices: [
      { persons: 2, price: "€195" },
      { persons: 4, price: "€380" },
      { persons: 6, price: "€565" }
    ],
    description: "Meniu complet tradițional",
    ingredients: [
      "Platou aperitiv (salam de casa cu sunca, salam de vita, slanina, toba, carnati semi-afumati, parizer, jumari, ceafa crud-uscata (afumata), branza, oua umplute, masline, rosi cherry, ceapa)",
      "Salata Boeuf",
      "Sarmale in foi de varza",
      "Ciorba de perisoare",
      "Platou mix gratar (ceafa, carnati subtiri cu usturoi, mici, frigarui de pui, cartofi la cuptor sau legume, salata de varza)",
      "Mix de prajituri (3 mini prajituri /p)",
      "Vin",
      "Suc"
    ]
  },
  {
    id: 2,
    title: "Meniu Ca La Mama Acasa",
    prices: [
      { persons: 2, price: "€140" },
      { persons: 4, price: "€270" },
      { persons: 6, price: "€400" }
    ],
    description: "Meniu complet cu preparate tradiționale",
    ingredients: [
      "Platou aperitiv (salam de casa, slanina, kaizer, toba, carnati semi-afumati, cascaval, oua umplute, masline, ceapa)",
      "Salata Boeuf (carne de pui sau vita)",
      "Sarmale in foi de varza",
      "Ceafa de porc cu cartofi la cuptor sau legume",
      "Mix de prajituri (3 mini prajituri /p)",
      "Vin",
      "Suc"
    ]
  },
  {
    id: 3,
    title: "Meniu Traditia Bunicilor",
    price: "€170 / €330 / €490",
    unit: "(2/4/6 pers)",
    description: "Meniu complet tradițional",
    ingredients: [
      "Platou aperitiv (salam de casa, slanina, toba, carnati semi-afumati, parizer, jumari, branza, masline, ceapa)",
      "Piftie",
      "Salata Boeuf",
      "Sarmale in foi de varza",
      "Ciorba de perisoare",
      "Carne la garnita",
      "Mix de prajituri (3 mini prajituri/p)",
      "Vin",
      "Suc"
    ]
  }
];

const ChristmasMenu = () => {
  return (
    <section className="w-full py-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="text-amber-500 border-amber-500 uppercase tracking-widest px-4 py-1">
            Sezonul Sărbătorilor
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Meniuri <span className="text-amber-500">Speciale</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Preparate tradiționale autentice pentru masa de Crăciun și Revelion.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((menu) => (
            <Card 
              key={menu.id} 
              className="bg-neutral-800 border-neutral-700 hover:border-amber-500 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header */}
              <CardHeader className="text-center pb-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardTitle className="text-xl font-serif font-bold text-amber-500 min-h-[3.5rem] flex items-center justify-center">
                  {menu.title}
                </CardTitle>
                {menu.price && menu.unit ? (
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-3xl font-bold text-white">{menu.price}</span>
                    <span className="text-sm text-neutral-400">{menu.unit}</span>
                  </div>
                ) : menu.prices ? (
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                    {menu.prices.map((priceOption, idx) => (
                      <div key={idx} className="flex flex-col items-center px-3 py-1 bg-neutral-900 rounded-lg border border-neutral-700">
                        <span className="text-lg font-bold text-white">{priceOption.price}</span>
                        <span className="text-xs text-neutral-400">{priceOption.persons} pers</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-grow pt-4">
                <div className="mb-4 text-center">
                  <span className="inline-block px-3 py-1 bg-neutral-900 rounded-full text-xs font-semibold text-neutral-300 border border-neutral-700">
                    {menu.description}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {menu.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start text-sm text-neutral-300 leading-relaxed">
                      <span className="mr-3 text-amber-500 mt-1.5 text-[10px]">◆</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Card Footer (Optional Order Button) */}
              <CardFooter className="pt-4 border-t border-neutral-700">
                <Link to="/order" className="w-full">
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold tracking-wide"
                  >
                    Comandă Acum
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
