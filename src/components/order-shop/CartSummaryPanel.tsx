import { Button } from "@/components/ui/button";
import { QuantityStepper } from "./QuantityStepper";
import { Separator } from "@/components/ui/separator";
import type { DeliveryMethodValue } from "./OrderTypeToggle";
import { isStaticProductKey } from "@/lib/orderShopCatalog";

interface CartLine {
  product: string;
  quantity: string;
  unit: string;
}

interface CartSummaryPanelProps {
  lines: CartLine[];
  getLineTitle: (productKey: string) => string;
  getLineUnitPrice: (productKey: string) => number | null;
  orderTotal: number;
  deliveryMethod: DeliveryMethodValue;
  minimumOk: boolean;
  emptyMessage: string;
  title: string;
  totalLabel: string;
  ctaLabel: string;
  warningMinimum: string;
  onIncrement: (productKey: string) => void;
  onDecrement: (productKey: string) => void;
  onRemove: (productKey: string) => void;
  onCheckout: () => void;
  getQuantity: (productKey: string) => number;
  getDecimals: (productKey: string) => number;
  removeLabel: string;
}

export function CartSummaryPanel({
  lines,
  getLineTitle,
  getLineUnitPrice,
  orderTotal,
  deliveryMethod,
  minimumOk,
  emptyMessage,
  title,
  totalLabel,
  ctaLabel,
  warningMinimum,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  getQuantity,
  getDecimals,
  removeLabel,
}: CartSummaryPanelProps) {
  const hasItems = lines.length > 0;
  const showDeliveryWarning = deliveryMethod === "delivery" && hasItems && !minimumOk;

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card/95 p-5 shadow-xl">
      <h2 className="font-serif text-xl font-bold text-foreground mb-4">{title}</h2>

      {!hasItems ? (
        <p className="text-sm text-muted-foreground py-6 text-center">{emptyMessage}</p>
      ) : (
        <ul className="space-y-3 max-h-[min(50vh,420px)] overflow-y-auto pr-1">
          {lines.map((line) => {
            const q = getQuantity(line.product);
            const price = getLineUnitPrice(line.product);
            const lineTotal =
              price != null && !isStaticProductKey(line.product)
                ? price * q
                : 0;
            const isStatic = isStaticProductKey(line.product);

            return (
              <li
                key={`${line.product}-${line.unit}`}
                className="flex flex-col gap-2 rounded-lg border border-border/60 bg-muted/20 p-3"
              >
                <div className="flex justify-between gap-2">
                  <span className="text-sm font-medium leading-snug">{getLineTitle(line.product)}</span>
                  {isStatic ? (
                    <span className="text-xs text-muted-foreground shrink-0">—</span>
                  ) : (
                    <span className="text-sm font-semibold text-primary shrink-0">€{lineTotal.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <QuantityStepper
                    quantity={q}
                    onIncrement={() => onIncrement(line.product)}
                    onDecrement={() => onDecrement(line.product)}
                    disabledMinus={q <= 0}
                    decimals={getDecimals(line.product)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground h-8"
                    onClick={() => onRemove(line.product)}
                  >
                    {removeLabel}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showDeliveryWarning && (
        <p className="mt-3 text-xs text-amber-200/90 bg-amber-950/40 border border-amber-800/50 rounded-lg p-2">
          {warningMinimum}
        </p>
      )}

      <Separator className="my-4 bg-border" />

      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-base font-semibold">{totalLabel}</span>
        <span className="text-2xl font-bold text-primary">€{orderTotal.toFixed(2)}</span>
      </div>

      <Button
        type="button"
        className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
        disabled={!hasItems}
        onClick={onCheckout}
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
