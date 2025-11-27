import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Data extracted directly from your photos
const menuItems = [
  {
    id: 1,
    title: "Meniu Traditional John",
    price: "12.00 €",
    unit: "/ p.p",
    description: "Platou aperitiv (koud)",
    ingredients: [
      "Salam de casa cu sunca",
      "Salam de vita",
      "Slanina, Toba & Parizer",
      "Carnati semi-afumati",
      "Jumari & Ceapa crud-uscata",
      "Branza, Oua umplute",
      "Masline, Rosi cherry, Ceapa"
    ]
  },
  {
    id: 2,
    title: "Meniu Ca La Mama Acasa",
    price: "15.00 €",
    unit: "/ p.p",
    description: "Platou aperitiv + Salata Boeuf",
    ingredients: [
      "Platou aperitiv: Salam de casa, Slanina, Kaizer, Toba, Carnati semi-afumati, Cascaval, Oua umplute, Masline, Ceapa",
      "Salata Boeuf (pui / vita)"
    ]
  },
  {
    id: 3,
    title: "Meniu Traditia Bunicilor",
    price: "15.00 €",
    unit: "/ p.p",
    description: "Platou aperitiv + Piftie",
    ingredients: [
      "Platou aperitiv: Salam de casa, Slanina, Toba, Carnati semi-afumati, Parizer, Jumari, Branza, Masline, Ceapa",
      "Piftie"
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
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-3xl font-bold text-white">{menu.price}</span>
                  <span className="text-sm text-neutral-400">{menu.unit}</span>
                </div>
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
