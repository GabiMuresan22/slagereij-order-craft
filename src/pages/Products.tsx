import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import displayCaseImage from "@/assets/products-hero.webp";
import tapasJohnPlatter from "@/assets/tapas-john-family-platter.webp";
import fondueVlees from "@/assets/fondue-bourguignonne-meat-platter-beef-chicken.webp";
import luxeGourmetSchotel from "@/assets/luxe-gourmet-schotel-10-soorten-vlees.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema, getProductListSchema } from "@/lib/structuredData";
import LocalizedLink from "@/components/LocalizedLink";
import { supabase } from "@/integrations/supabase/client";
import { ProductBrowseCard, type BrowseProduct } from "@/components/products/ProductBrowseCard";
import { ProductsCategoryTabs } from "@/components/products/ProductsCategoryTabs";
import {
  CATEGORY_SECTION_IDS,
  PRODUCT_KEYS_BY_CATEGORY,
} from "@/lib/productsPageConfig";
import { PRODUCT_BROWSE_IMAGES } from "@/lib/productBrowseImages";
import {
  productsPageHero,
  productsTrustStrip,
  categoryIntros,
  tabLabels,
} from "@/lib/productsPageCopy";
import ProductsSkeleton from "@/components/ProductsSkeleton";

interface DbProduct {
  key: string;
  name_nl: string;
  name_ro: string;
  price: number;
  unit: string;
  available: boolean;
}

const PackagesStatic = ({ t }: { t: (k: string) => string }) => {
  const packages = [
    {
      id: 1,
      titleKey: "packages.pork1.title",
      price: 45,
      itemKeys: [
        "packages.pork1.item1",
        "packages.pork1.item2",
        "packages.pork1.item3",
        "packages.pork1.item4",
        "packages.pork1.item5",
      ],
    },
    {
      id: 2,
      titleKey: "packages.pork2.title",
      price: 55,
      itemKeys: [
        "packages.pork2.item1",
        "packages.pork2.item2",
        "packages.pork2.item3",
        "packages.pork2.item4",
        "packages.pork2.item5",
        "packages.pork2.item6",
      ],
    },
    {
      id: 3,
      titleKey: "packages.chicken.title",
      price: 50,
      itemKeys: [
        "packages.chicken.item1",
        "packages.chicken.item2",
        "packages.chicken.item3",
        "packages.chicken.item4",
        "packages.chicken.item5",
      ],
    },
    {
      id: 4,
      titleKey: "packages.mixed.title",
      price: 60,
      itemKeys: [
        "packages.mixed.item1",
        "packages.mixed.item2",
        "packages.mixed.item3",
        "packages.mixed.item4",
        "packages.mixed.item5",
        "packages.mixed.item6",
      ],
    },
    {
      id: 5,
      titleKey: "packages.bbq.title",
      price: 55,
      itemKeys: [
        "packages.bbq.item1",
        "packages.bbq.item2",
        "packages.bbq.item3",
        "packages.bbq.item4",
        "packages.bbq.item5",
      ],
    },
    {
      id: 6,
      titleKey: "packages.john.title",
      price: 100,
      itemKeys: [
        "packages.john.item1",
        "packages.john.item2",
        "packages.john.item3",
        "packages.john.item4",
        "packages.john.item5",
        "packages.john.item6",
        "packages.john.item7",
        "packages.john.item8",
        "packages.john.item9",
        "packages.john.item10",
      ],
      featured: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className={`flex flex-col h-full hover:shadow-lg transition-all border-2 ${
            pkg.featured ? "border-primary/50 shadow-md" : "border-border"
          } rounded-xl`}
        >
          <CardHeader>
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-2xl font-serif">{t(pkg.titleKey)}</CardTitle>
              <span className="text-2xl font-bold text-primary shrink-0">€{pkg.price}</span>
            </div>
            {pkg.featured && (
              <Badge className="w-fit bg-primary text-primary-foreground">{t("packages.featured")}</Badge>
            )}
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
              {t("packages.orderOnly")}
            </div>
            <Button className="w-full gap-2" asChild>
              <LocalizedLink to="/order">
                <ShoppingCart className="w-4 h-4" />
                {t("packages.orderNow")}
              </LocalizedLink>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const Products = () => {
  const { t, language } = useLanguage();
  const lang = language === "ro" ? "ro" : "nl";

  const breadcrumbData = getBreadcrumbSchema([
    { name: t("nav.home"), url: "/" },
    { name: t("products.breadcrumb"), url: "/products" },
  ]);
  const productListData = getProductListSchema();

  /** SEO title: component appends " | Slagerij John" — avoid duplicate brand suffix */
  const seoTitle =
    lang === "nl"
      ? "Online Slagerij & Traiteur in Zwevezele | Vers Vlees, BBQ & Gourmet"
      : "Măcelărie online & Traiteur în Zwevezele | Carne proaspătă, BBQ & Gourmet";

  const seoDescription =
    lang === "nl"
      ? "Bestel vers vlees, BBQ, gourmet en traiteur online bij Slagerij John — ambachtelijke slagerij met webshop in Zwevezele, Wingene en Lichtervelde. Populaire vleesproducten, colli’s, tapas en warme gerechten."
      : "Comandă carne proaspătă, BBQ, gourmet și traiteur online la Slagerij John — măcelărie artizanală cu webshop în Zwevezele, Wingene și Lichtervelde. Produse populare, colli, tapas și preparate calde.";

  const seoKeywords =
    lang === "nl"
      ? "online slagerij, slagerij Zwevezele, vlees bestellen online, vers vlees bestellen, slagerij met webshop, traiteur Zwevezele, BBQ vlees, gourmet pakket, voordeelpakketten vlees, Roemeense specialiteiten, mici"
      : "măcelărie online, Zwevezele, carne online, colli vlees, BBQ, gourmet, traiteur, specialități românești";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("key, name_nl, name_ro, price, unit, available")
        .eq("available", true)
        .order("name_nl");
      if (error) throw error;
      return (data ?? []) as DbProduct[];
    },
  });

  const productByKey = useMemo(() => {
    const m = new Map<string, DbProduct>();
    products.forEach((p) => m.set(p.key, p));
    return m;
  }, [products]);

  const renderCategoryGrid = (categoryKey: keyof typeof PRODUCT_KEYS_BY_CATEGORY, badge: string) => {
    const keys = PRODUCT_KEYS_BY_CATEGORY[categoryKey];
    const items: BrowseProduct[] = [];
    keys.forEach((key) => {
      const p = productByKey.get(key);
      if (p) {
        items.push({
          key: p.key,
          name_nl: p.name_nl,
          name_ro: p.name_ro,
          price: Number(p.price),
          unit: p.unit,
        });
      }
    });

    if (items.length === 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((prod) => (
          <ProductBrowseCard
            key={prod.key}
            product={prod}
            language={lang}
            imageSrc={PRODUCT_BROWSE_IMAGES[prod.key]}
            badge={badge}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  const hero = productsPageHero[lang];
  const trust = productsTrustStrip[lang];
  const tabs = tabLabels[lang];

  return (
    <div className="min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={[breadcrumbData, productListData]}
      />

      {/* Hero */}
      <section
        className="relative min-h-[min(50vh,520px)] flex items-center justify-center py-16 md:py-20"
        aria-labelledby="products-hero-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${displayCaseImage})` }}
          role="img"
          aria-label=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-sm md:text-base font-medium text-primary-foreground/90 mb-3 tracking-wide uppercase">
            {lang === "nl" ? "Onze producten" : "Produsele noastre"}
          </p>
          <h1 id="products-hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            {hero.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/85">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              {lang === "nl" ? "Afhalen of bestellen" : "Ridicare sau comandă"}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              {lang === "nl" ? "Zwevezele · Wingene · Lichtervelde" : "Zwevezele · Wingene · Lichtervelde"}
            </span>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-muted/40 py-4" aria-label={lang === "nl" ? "Waarom bij ons" : "De ce la noi"}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:gap-x-10">
            {trust.map((line) => (
              <li key={line} className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky category tabs */}
      <ProductsCategoryTabs tabs={tabs} language={lang} />

      {/* Populaire keuzes */}
      <section
        id={CATEGORY_SECTION_IDS.populair}
        className="py-14 md:py-20 bg-background scroll-mt-28"
        aria-labelledby="heading-populair"
      >
        <div className="container mx-auto px-4">
          <h2 id="heading-populair" className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            {lang === "nl" ? "Populaire keuzes" : "Alegeri populare"}
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {categoryIntros.populair[lang]}
          </p>
          {renderCategoryGrid("populair", lang === "nl" ? "Populair" : "Popular")}
        </div>
      </section>

      {/* Colli's — includes static package cards + DB intro */}
      <section
        id={CATEGORY_SECTION_IDS.colli}
        className="py-14 md:py-20 bg-muted/30 scroll-mt-28"
        aria-labelledby="heading-colli"
      >
        <div className="container mx-auto px-4">
          <h2 id="heading-colli" className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            {lang === "nl" ? "Colli's & Voordeelpakketten" : "Colli & pachete avantajoase"}
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {categoryIntros.colli[lang]}
          </p>
          {renderCategoryGrid("colli", "Colli")}
          <div className="mt-16">
            <h3 className="text-xl font-serif font-semibold text-center mb-8">
              {lang === "nl" ? "Uitgebreide colli-menu's" : "Meniuri colli complete"}
            </h3>
            <PackagesStatic t={t} />
          </div>
        </div>
      </section>

      {/* BBQ & Gourmet */}
      <section
        id={CATEGORY_SECTION_IDS.bbq}
        className="py-14 md:py-20 bg-background scroll-mt-28"
        aria-labelledby="heading-bbq"
      >
        <div className="container mx-auto px-4">
          <h2 id="heading-bbq" className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            {lang === "nl" ? "BBQ & Gourmet" : "BBQ & Gourmet"}
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {categoryIntros.bbq[lang]}
          </p>
          {renderCategoryGrid("bbq", "BBQ")}
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="overflow-hidden rounded-xl border-border">
              <div className="aspect-video relative">
                <img
                  src={fondueVlees}
                  alt={lang === "nl" ? "Fondue vlees schotel voor gourmet" : "Platou fondue pentru gourmet"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-lg mb-2">{t("menu.fondue.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("menu.fondue.badge")}</p>
                <ul className="text-sm space-y-2 text-muted-foreground mb-4">
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.from")}</span>
                    <span className="shrink-0 text-foreground font-medium">€10/pers</span>
                  </li>
                </ul>
                <LocalizedLink to="/order">
                  <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
                </LocalizedLink>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-xl border-border">
              <div className="aspect-video relative">
                <img
                  src={luxeGourmetSchotel}
                  alt={lang === "nl" ? "Luxe gourmet schotel met vleessoorten" : "Platou gourmet cu sortimente de carne"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-lg mb-2">{t("menu.gourmet.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("menu.gourmet.badge")}</p>
                <ul className="text-sm space-y-2 text-muted-foreground mb-4">
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.gourmet.9soorten")}</span>
                    <span className="shrink-0 text-foreground font-medium">€10/pers</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.gourmet.10soorten")}</span>
                    <span className="shrink-0 text-foreground font-medium">€11/pers</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.gourmet.luxe")}</span>
                    <span className="shrink-0 text-foreground font-medium">€15/pers</span>
                  </li>
                </ul>
                <LocalizedLink to="/order">
                  <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
                </LocalizedLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tapas & Hapjes */}
      <section
        id={CATEGORY_SECTION_IDS.tapas}
        className="py-14 md:py-20 bg-muted/30 scroll-mt-28"
        aria-labelledby="heading-tapas"
      >
        <div className="container mx-auto px-4">
          <h2 id="heading-tapas" className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            {lang === "nl" ? "Tapas & Hapjes" : "Tapas & Aperitive"}
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {categoryIntros.tapas[lang]}
          </p>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="rounded-xl overflow-hidden border-border">
              <div className="aspect-video">
                <img
                  src={tapasJohnPlatter}
                  alt={lang === "nl" ? "Tapas schotel Slagerij John" : "Platou tapas Slagerij John"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-xl mb-2">{t("menu.tapas.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("menu.tapas.badge")}</p>
                <ul className="text-sm space-y-2 text-muted-foreground mb-6">
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.tapas.kinder")}</span>
                    <span className="shrink-0 text-foreground font-medium">€9/pers</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.tapas.tapas2")}</span>
                    <span className="shrink-0 text-foreground font-medium">€30 (4-5 pers)</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.tapas.mix")}</span>
                    <span className="shrink-0 text-foreground font-medium">€40 (5-6 pers)</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.tapas.john1")}</span>
                    <span className="shrink-0 text-foreground font-medium">€50 (5-6 pers)</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.tapas.john2")}</span>
                    <span className="shrink-0 text-foreground font-medium">€60 (7-9 pers)</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>◆ {t("menu.tapas.roemeens")}</span>
                    <span className="shrink-0 text-foreground font-medium">€40 (5-6 pers)</span>
                  </li>
                </ul>
                <LocalizedLink to="/order">
                  <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
                </LocalizedLink>
              </CardContent>
            </Card>
            <Card className="rounded-xl border-border p-6">
              <h3 className="font-serif font-semibold text-xl mb-2">{t("menu.hapjes.title")}</h3>
              <p className="text-xs text-muted-foreground mb-4">{t("menu.pricePerPerson")}</p>
              <ul className="text-sm space-y-2 text-muted-foreground mb-6">
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.hapjes.scampi")}</span>
                  <span className="shrink-0 text-foreground font-medium">€4</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.hapjes.lepeltjeScampi")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.hapjes.tacoGehakt")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2,50</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.hapjes.bruschettaGeitenkaas")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.hapjes.wrapsZalm")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.hapjes.bulgurGarnaal")}</span>
                  <span className="shrink-0 text-foreground font-medium">€3,50</span>
                </li>
              </ul>
              <LocalizedLink to="/order">
                <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
              </LocalizedLink>
            </Card>
          </div>
        </div>
      </section>

      {/* Warme gerechten & Soepen */}
      <section
        id={CATEGORY_SECTION_IDS.warm}
        className="py-14 md:py-20 bg-background scroll-mt-28"
        aria-labelledby="heading-warm"
      >
        <div className="container mx-auto px-4">
          <h2 id="heading-warm" className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            {lang === "nl" ? "Warme gerechten & Soepen" : "Preparate calde & Supe"}
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {categoryIntros.warm[lang]}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="rounded-xl p-6 border-border">
              <h3 className="font-serif font-semibold text-xl mb-4">{t("menu.vlees.title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("menu.pricePerPerson")}</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex justify-between gap-2">
                  <span>{t("menu.vlees.ardeens")}</span>
                  <span className="shrink-0">€6,50</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>{t("menu.vlees.varkenshaas")}</span>
                  <span>€8</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>{t("menu.vlees.zalm")}</span>
                  <span>€10</span>
                </li>
              </ul>
              <LocalizedLink to="/order" className="block mt-6">
                <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
              </LocalizedLink>
            </Card>
            <Card className="rounded-xl p-6 border-border">
              <h3 className="font-serif font-semibold text-xl mb-4">{t("menu.soep.title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("menu.pricePerPerson")}</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex justify-between gap-2">
                  <span>{t("menu.soep.tomaat")}</span>
                  <span>€5,20/l</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>{t("menu.soep.pompoen")}</span>
                  <span>€6/l</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>{t("menu.soep.broccoli")}</span>
                  <span>€5,50/l</span>
                </li>
              </ul>
              <LocalizedLink to="/order" className="block mt-6">
                <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
              </LocalizedLink>
            </Card>
          </div>
        </div>
      </section>

      {/* Dessert & Mini Belegde Broodjes */}
      <section
        className="py-14 md:py-20 bg-muted/30 scroll-mt-28"
        aria-labelledby="heading-dessert"
      >
        <div className="container mx-auto px-4">
          <h2 id="heading-dessert" className="text-3xl md:text-4xl font-serif font-bold text-center mb-10">
            {lang === "nl" ? "Dessert & Extra's" : "Desert & Extra"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="rounded-xl p-6 border-border">
              <h3 className="font-serif font-semibold text-xl mb-2">{t("menu.dessert.title")}</h3>
              <div className="flex justify-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  {t("menu.dessert.badge")}
                </span>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground mb-6">
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.dessert.buffet1")}</span>
                  <span className="shrink-0 text-foreground font-medium">€7/pers</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.dessert.buffet2")}</span>
                  <span className="shrink-0 text-foreground font-medium">€12/pers</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.dessert.fruitBuffet")}</span>
                  <span className="shrink-0 text-foreground font-medium">€4/pers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">◆</span>
                  <span>{t("menu.dessert.meloenDruiven")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">◆</span>
                  <span>{t("menu.dessert.ananasKiwi")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">◆</span>
                  <span>{t("menu.dessert.mandarijnKaki")}</span>
                </li>
              </ul>
              <LocalizedLink to="/order">
                <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
              </LocalizedLink>
            </Card>
            <Card className="rounded-xl p-6 border-border">
              <h3 className="font-serif font-semibold text-xl mb-2">{t("menu.keuze.title")}</h3>
              <div className="flex justify-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  {t("menu.keuze.badge")}
                </span>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground mb-6">
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.keuze.vanille")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.keuze.tiramisu")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2,50</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.keuze.donut")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.keuze.miniDonut")}</span>
                  <span className="shrink-0 text-foreground font-medium">€1</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>◆ {t("menu.keuze.macarons")}</span>
                  <span className="shrink-0 text-foreground font-medium">€2</span>
                </li>
              </ul>
              <LocalizedLink to="/order">
                <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
              </LocalizedLink>
            </Card>
            <Card className="rounded-xl p-6 border-border">
              <h3 className="font-serif font-semibold text-xl mb-2">{t("menu.broodjes.title")}</h3>
              <div className="flex justify-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  €1,70/st
                </span>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">◆</span>
                  <span>{t("menu.broodjes.kipcurry")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">◆</span>
                  <span>{t("menu.broodjes.hesp")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">◆</span>
                  <span>{t("menu.broodjes.tonijn")}</span>
                </li>
              </ul>
              <LocalizedLink to="/order">
                <Button className="w-full bg-primary text-primary-foreground">{t("menu.orderNow")}</Button>
              </LocalizedLink>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {lang === "nl" ? "Klaar om te bestellen?" : "Gata să comanzi?"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {lang === "nl"
              ? "Ambachtelijke kwaliteit, vers bereid — eenvoudig online bestellen bij uw slagerij in Zwevezele."
              : "Calitate artizanală, proaspăt pregătit — comandați online simplu la măcelăria din Zwevezele."}
          </p>
          <LocalizedLink to="/order">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 group">
              {lang === "nl" ? "Naar de webshop" : "Spre magazin"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </LocalizedLink>
        </div>
      </section>
    </div>
  );
};

export default Products;
