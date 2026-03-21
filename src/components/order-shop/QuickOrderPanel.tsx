import { Button } from "@/components/ui/button";
import { OrderTypeToggle, type DeliveryMethodValue } from "./OrderTypeToggle";
import LocalizedLink from "@/components/LocalizedLink";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface QuickOrderPanelProps {
  deliveryMethod: DeliveryMethodValue;
  onDeliveryMethodChange: (v: DeliveryMethodValue) => void;
  pickupLabel: string;
  deliveryLabel: string;
  methodLabel: string;
  primaryCta: string;
  secondaryCta: string;
  onPrimaryScroll: () => void;
}

export function QuickOrderPanel({
  deliveryMethod,
  onDeliveryMethodChange,
  pickupLabel,
  deliveryLabel,
  methodLabel,
  primaryCta,
  secondaryCta,
  onPrimaryScroll,
}: QuickOrderPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-4 md:p-5 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{methodLabel}</span>
          <OrderTypeToggle
            value={deliveryMethod}
            onChange={onDeliveryMethodChange}
            pickupLabel={pickupLabel}
            deliveryLabel={deliveryLabel}
            className="max-w-full sm:max-w-md"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            type="button"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onPrimaryScroll}
          >
            <ShoppingBag className="h-4 w-4" />
            {primaryCta}
          </Button>
          <Button type="button" variant="outline" className="border-border" asChild>
            <LocalizedLink to="/products" className="gap-2">
              {secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
