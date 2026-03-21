import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { QuantityStepper } from "./QuantityStepper";
import { cn } from "@/lib/utils";

interface OrderProductRowProps {
  title: string;
  description: string;
  imageSrc?: string | null;
  priceLabel: string;
  quantity: number;
  unitLabel: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  decimals?: number;
  isStatic?: boolean;
  badge?: string;
}

export function OrderProductRow({
  title,
  description,
  imageSrc,
  priceLabel,
  quantity,
  unitLabel,
  onIncrement,
  onDecrement,
  onRemove,
  decimals = 0,
  isStatic,
  badge,
}: OrderProductRowProps) {
  const hasLine = quantity > 0;

  return (
    <div
      className={cn(
        "group flex gap-3 rounded-xl border border-border bg-card/60 p-3 shadow-sm transition-shadow hover:shadow-md md:gap-4 md:p-4",
        hasLine && "ring-1 ring-primary/30"
      )}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted md:h-20 md:w-20">
        {imageSrc ? (
          <LazyImage src={imageSrc} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground text-center px-1">
            Slagerij John
          </div>
        )}
        {badge && (
          <Badge className="absolute bottom-0 left-0 right-0 rounded-none text-[10px] py-0 bg-primary/90 text-primary-foreground">
            {badge}
          </Badge>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-sm font-semibold leading-tight text-foreground md:text-base">{title}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground md:text-sm">{description}</p>
        <p className="mt-2 text-sm font-bold text-primary md:text-base">
          {priceLabel}
          {!isStatic && (
            <span className="ml-1 text-xs font-normal text-muted-foreground">/ {unitLabel}</span>
          )}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
          aria-label="Verwijderen"
        >
          <X className="h-4 w-4" />
        </Button>
        <QuantityStepper
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          disabledMinus={quantity <= 0}
          decimals={decimals}
        />
      </div>
    </div>
  );
}
