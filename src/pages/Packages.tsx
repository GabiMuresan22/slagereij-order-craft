import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, ShoppingCart } from "lucide-react";
import SEO from "@/components/SEO";

export default function Packages() {
  const packages = [
    {
      id: 1,
      title: "Colli varken 1",
      price: 45,
      items: [
        "1kg spiering",
        "1kg filet kotelet",
        "1kg spek",
        "1kg worst",
        "1kg gehakt"
      ],
    },
    {
      id: 2,
      title: "Colli varken 2",
      price: 55,
      items: [
        "1kg spiering",
        "1kg filet kotelet",
        "1kg spek",
        "1kg worst",
        "1kg burger",
        "1kg gehakt"
      ],
    },
    {
      id: 3,
      title: "Colli kip",
      price: 50,
      items: [
        "1kg kipfilet",
        "1 kg kip schnitzel",
        "1kg kip gyros",
        "1 kg kip brochette",
        "1 kg kippenboutjes"
      ],
    },
    {
      id: 4,
      title: "Colli kip-varken",
      price: 60,
      items: [
        "1 kg kipfilet",
        "1kg kip schnitzel",
        "1kg varkens gehakt",
        "1kg filet kotelet",
        "1kg spiering",
        "1 kg spek"
      ],
    },
    {
      id: 5,
      title: "BBQ Colli",
      price: 55,
      items: [
        "1 kg kip brochette",
        "1 kg braadworst",
        "1 kg mici",
        "1kg gemarineerde spek",
        "1 kg gemarineerde ribbetjes"
      ],
    },
    {
      id: 6,
      title: "Colli John",
      price: 100,
      items: [
        "1kg braadworst",
        "1kg varkens gehakt",
        "1kg burger",
        "1 kg boomstammetjes",
        "1 kg filet kotelet",
        "1 kg kip gyros",
        "1 kg kip brochette",
        "1 kg kippenboutjes",
        "1 kg kip schnitzel",
        "1 kg kipfilet"
      ],
      featured: true
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEO 
        title="Colli Aanbod" 
        description="Ontdek onze voordelige vleespakketten. Colli varken, kip en BBQ pakketten aan scherpe prijzen."
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">
            Onze Colli's
          </h1>
          <p className="text-xl text-muted-foreground">
            Voordelige vleespakketten voor elke gelegenheid
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`flex flex-col h-full hover:shadow-lg transition-all border-2 ${pkg.featured ? 'border-primary/50 shadow-md' : 'border-border'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-serif">{pkg.title}</CardTitle>
                  <span className="text-2xl font-bold text-primary">€{pkg.price}</span>
                </div>
                {pkg.featured && <Badge className="w-fit bg-primary text-primary-foreground">Aanbevolen</Badge>}
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-6">
                <div className="w-full text-center text-sm italic text-orange-600 bg-orange-50 dark:bg-orange-900/20 py-2 rounded">
                  Enkel op bestelling!
                </div>
                <Button className="w-full gap-2" asChild>
                  <Link to="/order">
                    <ShoppingCart className="w-4 h-4" />
                    Bestel Nu
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
