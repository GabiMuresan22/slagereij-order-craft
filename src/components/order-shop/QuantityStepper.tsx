import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabledMinus?: boolean;
  disabledPlus?: boolean;
  className?: string;
  /** Decimal places for display (e.g. 1 for kg) */
  decimals?: number;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  disabledMinus,
  disabledPlus,
  className,
  decimals = 0,
}: QuantityStepperProps) {
  const display =
    decimals > 0
      ? quantity.toLocaleString("nl-BE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : String(Math.round(quantity));

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-foreground hover:bg-background/80"
        onClick={onDecrement}
        disabled={disabledMinus}
        aria-label="Minder"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums">{display}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-foreground hover:bg-background/80"
        onClick={onIncrement}
        disabled={disabledPlus}
        aria-label="Meer"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
