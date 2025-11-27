import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

// Christmas menu data
const holidayPackages = [
  {
    id: 1,
    title: "Meniu Traditional John",
    courses: [
      "Platou aperitiv (salam de casa cu sunca, salam de vita, slanina, toba, carnati semi-afumati, parizer, jumari, ceafa crud-uscata, branza, oua umplute, masline, rosi cherry, ceapa)",
      "Salata Boeuf",
      "Sarmale in foi de varza",
      "Ciorba de perisoare",
      "Platou mix gratar (ceafa, carnati subtiri cu usturoi, mici, frigarui de pui, cartofi la cuptor sau legume, salata de varza)",
      "Mix de prajituri (3 mini prajituri /pers)",
      "Vin & Suc",
    ],
    pricing: {
      "2_pers": 195,
      "4_pers": 380,
      "6_pers": 565,
    },
  },
  {
    id: 2,
    title: "Meniu Ca La Mama Acasa",
    courses: [
      "Platou aperitiv (salam de casa, slanina, kaizer, toba, carnati semi-afumati, cascaval, oua umplute, masline, ceapa)",
      "Salata Boeuf (carne de pui sau vita)",
      "Sarmale in foi de varza",
      "Ceafa de porc cu cartofi la cuptor sau legume",
      "Mix de prajituri (3 mini prajituri /pers)",
      "Vin & Suc",
    ],
    pricing: {
      "2_pers": 140,
      "4_pers": 270,
      "6_pers": 400,
    },
  },
  {
    id: 3,
    title: "Meniu Traditia Bunicilor",
    courses: [
      "Platou aperitiv (salam de casa, slanina, toba, carnati semi-afumati, parizer, jumari, branza, masline, ceapa)",
      "Piftie",
      "Salata Boeuf",
      "Sarmale in foi de varza",
      "Ciorba de perisoare",
      "Carne la garnita",
      "Mix de prajituri (3 mini prajituri /pers)",
      "Vin & Suc",
    ],
    pricing: {
      "2_pers": 170,
      "4_pers": 330,
      "6_pers": 490,
    },
  },
];

const cateringMenu = {
  hapjes: [
    { name: "Scampi (2st)", price: 4.0 },
    { name: "Leepeltje scampi", price: 2.0 },
    { name: "Leepeltje meloen & serrano", price: 2.0 },
    { name: "Leepeltje paté", price: 1.5 },
    { name: "Leepeltje geitenkaas", price: 2.0 },
    { name: "Leepeltje Zalm", price: 2.0 },
    { name: "Taco gehakt", price: 2.5 },
    { name: "Taco kip", price: 2.5 },
    { name: "Bilinis met gerookte zalm", price: 2.5 },
    { name: "Brusceta geitenkaas", price: 2.0 },
    { name: "Brusceta zalm", price: 1.5 },
    { name: "Brusceta tomaat", price: 1.0 },
    { name: "Wraps (Zalm, Hesp, Kip)", price: 2.0 },
    { name: "Bulgur feta / & meloen / zalm", price: 3.0 },
    { name: "Bulgur garnaal", price: 3.5 },
    { name: "Hawaii salade", price: 3.0 },
  ],
  tapas: [
    { name: "Kinder tapas", price_per_person: 9 },
    { name: "Tapas 2 (4-5 pers)", price_total: 30 },
    { name: "Tapas mix (5-6 pers)", price_total: 40 },
    { name: "Tapas John 1 (5-6 pers)", price_total: 50 },
    { name: "Tapas John 2 (7-9 pers)", price_total: 60 },
    { name: "Roemeense Tapas (5-6 pers)", price_total: 40 },
  ],
  miniSandwiches: {
    price_per_piece: 1.7,
    options: ["Kipcurry", "Vleessalade", "Hesp", "Salami", "Kaas", "Tonijn", "Préparé"],
  },
  socialDining: [
    { name: "Fondue (10 soorten)", price: "vanaf €10/pers" },
    { name: "Gourmet (9 soorten)", price: "€10/pers" },
    { name: "Gourmet (10 soorten)", price: "€11/pers" },
    { name: "Gourmet Luxe (10 soorten)", price: "€15/pers" },
  ],
  mainCourses: [
    { name: "Ardeens gebraad in champignonsaus", price: 6.5 },
    { name: "Varkenshaasje in sausje met spek", price: 8.0 },
    { name: "Orloffgebraad in kaassaus", price: 7.0 },
    { name: "Kalkoen in champignonsaus", price: 8.5 },
    { name: "Hamrol met witloof in kaassaus", price: 10.0 },
    { name: "Kipfilet in curry saus", price: 8.4 },
    { name: "Zalm in bearnaisesaus", price: 10.0 },
  ],
  warmVegetables: {
    price_per_person: 5.0,
    options: ["Bloemkool", "Boontjes", "Wortel", "Witloof met spek"],
  },
  soups: [
    { name: "Tomatensoep", price_per_liter: 5.2 },
    { name: "Tomatensoep met balletjes", price_per_liter: 5.6 },
    { name: "Pompoensoep", price_per_liter: 6.0 },
    { name: "Broccolisoep", price_per_liter: 5.5 },
  ],
  dessert: {
    buffets: [
      { name: "Dessertbuffet 1 (3 soorten)", price_per_person: 7 },
      { name: "Dessertbuffet 2 (5 soorten)", price_per_person: 12 },
      { name: "Fruit buffet (6 soorten)", price_per_person: 4 },
    ],
    alaCarte: [
      { name: "Vanille pudding", price: 2.0 },
      { name: "Tiramisu", price: 2.5 },
      { name: "Donut", price: 2.0 },
      { name: "Mini donut", price: 1.0 },
      { name: "Macarons", price: 2.0 },
    ],
  },
};

const ChristmasMenuDisplay = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-12 max-w-6xl mx-auto" data-testid="christmas-menu-display">
      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="packages" className="text-sm md:text-base">
            {t("christmas.menu.packages")}
          </TabsTrigger>
          <TabsTrigger value="catering" className="text-sm md:text-base">
            {t("christmas.menu.catering")}
          </TabsTrigger>
        </TabsList>

        {/* Holiday Packages Tab */}
        <TabsContent value="packages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {holidayPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg md:text-xl font-serif text-center text-primary">{pkg.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 mb-4">
                    {pkg.courses.map((course, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4 mt-4">
                    <p className="font-semibold text-center mb-2">{t("christmas.menu.prices")}</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <p className="font-medium">2 {t("christmas.menu.persons")}</p>
                        <p className="text-primary font-bold">€{pkg.pricing["2_pers"]}</p>
                      </div>
                      <div>
                        <p className="font-medium">4 {t("christmas.menu.persons")}</p>
                        <p className="text-primary font-bold">€{pkg.pricing["4_pers"]}</p>
                      </div>
                      <div>
                        <p className="font-medium">6 {t("christmas.menu.persons")}</p>
                        <p className="text-primary font-bold">€{pkg.pricing["6_pers"]}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Catering Menu Tab */}
        <TabsContent value="catering">
          <Accordion type="single" collapsible className="w-full">
            {/* Hapjes */}
            <AccordionItem value="hapjes">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.hapjes")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cateringMenu.hapjes.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold text-primary">€{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tapas */}
            <AccordionItem value="tapas">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.tapas")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cateringMenu.tapas.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold text-primary">
                        {item.price_per_person !== undefined
                          ? `€${item.price_per_person}/${t("christmas.menu.person")}`
                          : item.price_total !== undefined
                            ? `€${item.price_total}`
                            : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Mini Sandwiches */}
            <AccordionItem value="mini-sandwiches">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.miniSandwiches")}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2 text-primary font-semibold">
                  €{cateringMenu.miniSandwiches.price_per_piece.toFixed(2)} {t("christmas.menu.perPiece")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cateringMenu.miniSandwiches.options.map((option, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {option}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Social Dining */}
            <AccordionItem value="social-dining">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.socialDining")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cateringMenu.socialDining.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Main Courses */}
            <AccordionItem value="main-courses">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.mainCourses")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cateringMenu.mainCourses.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold text-primary">€{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Warm Vegetables */}
            <AccordionItem value="warm-vegetables">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.warmVegetables")}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-2 text-primary font-semibold">
                  €{cateringMenu.warmVegetables.price_per_person.toFixed(2)}/{t("christmas.menu.person")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cateringMenu.warmVegetables.options.map((option, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {option}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Soups */}
            <AccordionItem value="soups">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.soups")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cateringMenu.soups.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold text-primary">
                        €{item.price_per_liter.toFixed(2)}/{t("christmas.menu.liter")}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Desserts */}
            <AccordionItem value="desserts">
              <AccordionTrigger className="text-lg font-semibold">{t("christmas.menu.desserts")}</AccordionTrigger>
              <AccordionContent>
                <div className="mb-4">
                  <p className="font-medium mb-2">{t("christmas.menu.buffets")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cateringMenu.dessert.buffets.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-semibold text-primary">
                          €{item.price_per_person}/{t("christmas.menu.person")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">{t("christmas.menu.alaCarte")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cateringMenu.dessert.alaCarte.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b border-muted">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-semibold text-primary">€{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChristmasMenuDisplay;
