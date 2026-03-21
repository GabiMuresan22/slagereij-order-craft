import { cn } from "@/lib/utils";

export type DeliveryMethodValue = "pickup" | "delivery";

interface OrderTypeToggleProps {
  value: DeliveryMethodValue;
  onChange: (v: DeliveryMethodValue) => void;
  pickupLabel: string;
  deliveryLabel: string;
  className?: string;
  size?: "default" | "lg";
}

export function OrderTypeToggle({
  value,
  onChange,
  pickupLabel,
  deliveryLabel,
  className,
  size = "default",
}: OrderTypeToggleProps) {
  const pad = size === "lg" ? "py-3 px-4 md:px-8 text-base" : "py-2.5 px-4 text-sm";

  return (
    <div
      className={cn(
        "inline-flex w-full max-w-md rounded-xl border border-border bg-muted/30 p-1 shadow-inner",
        className
      )}
      role="group"
      aria-label="Bestelmethode"
    >
      <button
        type="button"
        onClick={() => onChange("pickup")}
        className={cn(
          "flex-1 rounded-lg font-semibold transition-all duration-200",
          pad,
          value === "pickup"
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {pickupLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("delivery")}
        className={cn(
          "flex-1 rounded-lg font-semibold transition-all duration-200",
          pad,
          value === "delivery"
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {deliveryLabel}
      </button>
    </div>
  );
}
