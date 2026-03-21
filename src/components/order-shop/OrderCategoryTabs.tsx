import { cn } from "@/lib/utils";
import type { OrderCategoryId } from "@/lib/orderShopCatalog";

interface OrderCategoryTabsProps {
  active: OrderCategoryId;
  onChange: (id: OrderCategoryId) => void;
  labels: Record<OrderCategoryId, string>;
}

const ORDER: OrderCategoryId[] = ["colli", "bbq", "tapas", "desserts"];

export function OrderCategoryTabs({ active, onChange, labels }: OrderCategoryTabsProps) {
  return (
    <div className="overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
      <div className="flex gap-2 min-w-max">
        {ORDER.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap",
              active === id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {labels[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
