import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ShoppingCart } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import LazyImage from "@/components/LazyImage";
import { getProductDescription } from "@/lib/productsPageConfig";

export interface BrowseProduct {
  key: string;
  name_nl: string;
  name_ro: string;
  price: number;
  unit: string;
}

interface ProductBrowseCardProps {
  product: BrowseProduct;
  language: "nl" | "ro";
  imageSrc?: string;
  badge?: string;
}

const formatPrice = (p: number) =>
  p.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ProductBrowseCard({
  product,
  language,
  imageSrc,
  badge,
}: ProductBrowseCardProps) {
  const name = language === "ro" ? product.name_ro : product.name_nl;
  const unitLabel =
    product.unit === "stuk" || product.unit === "stuks"
      ? language === "nl"
        ? "stuk"
        : "buc."
      : product.unit;
  const description = getProductDescription(product.key, language);

  return (
    <Card className="group flex flex-col h-full overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow rounded-xl">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {imageSrc ? (
          <LazyImage
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-muted-foreground text-sm px-4 text-center">
            Slagerij John
          </div>
        )}
        {badge && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground shadow-sm">
            {badge}
          </Badge>
        )}
      </div>
      <CardContent className="pt-4 flex-grow flex flex-col">
        <h3 className="font-serif font-semibold text-lg leading-snug mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{description}</p>
        <p className="mt-3 text-lg font-bold text-primary">
          €{formatPrice(product.price)}
          <span className="text-sm font-normal text-muted-foreground ml-1">/ {unitLabel}</span>
        </p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <LocalizedLink to="/order" className="w-full">
          <Button
            type="button"
            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            {language === "nl" ? "Toevoegen" : "Adaugă"}
            <ShoppingCart className="w-4 h-4 opacity-80" aria-hidden="true" />
          </Button>
        </LocalizedLink>
      </CardFooter>
    </Card>
  );
}
