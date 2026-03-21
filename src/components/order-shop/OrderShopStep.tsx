import { useMemo, useState, useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LocalizedLink from "@/components/LocalizedLink";
import { CustomRequestSection } from "./CustomRequestSection";
import type { CustomCartRequest } from "@/lib/orderCustomRequest";
import { OrderHero } from "./OrderHero";
import { OrderTypeToggle } from "./OrderTypeToggle";
import { QuickOrderPanel } from "./QuickOrderPanel";
import { OrderCategoryTabs } from "./OrderCategoryTabs";
import { OrderProductRow } from "./OrderProductRow";
import { DeliveryInfoCard } from "./DeliveryInfoCard";
import { CartSummaryPanel } from "./CartSummaryPanel";
import {
  ORDER_PRODUCT_KEYS,
  STATIC_ORDER_ROWS,
  STATIC_ROWS_BY_CATEGORY,
  isStaticProductKey,
  type OrderCategoryId,
} from "@/lib/orderShopCatalog";
import { PRODUCT_BROWSE_IMAGES } from "@/lib/productBrowseImages";
import { getProductDescription } from "@/lib/productsPageConfig";
import type { DeliveryMethodValue } from "./OrderTypeToggle";

interface ProductRow {
  key: string;
  name_nl: string;
  name_ro: string;
  price: number;
  unit: string;
}

interface OrderItemForm {
  product: string;
  quantity: string;
  unit: string;
}

interface OrderShopFormShape {
  deliveryMethod: DeliveryMethodValue;
  orderItems: OrderItemForm[];
}

interface OrderShopStepProps {
  form: UseFormReturn<OrderShopFormShape>;
  products: ProductRow[];
  language: "nl" | "ro";
  orderItems: OrderItemForm[];
  customRequests: CustomCartRequest[];
  orderTotal: number;
  t: (key: string) => string;
  onContinue: () => void;
  /** Category tab labels */
  categoryLabels: Record<OrderCategoryId, string>;
  heroTitle: string;
  heroSubtitle: string;
  quickPrimary: string;
  quickSecondary: string;
  cartTitle: string;
  cartEmpty: string;
  cartCta: string;
  cartTotal: string;
  cartWarnMin: string;
  allergenTitle: string;
  allergenBody: string;
  allergenLink: string;
  removeLineLabel: string;
  methodLabel: string;
}

const DELIVERY_MIN = 50;

function getQty(productKey: string, items: OrderItemForm[]): number {
  const line = items.find((i) => i.product === productKey);
  if (!line) return 0;
  return parseFloat(line.quantity) || 0;
}

function formatPrice(p: number) {
  return p.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function OrderShopStep({
  form,
  products,
  language,
  orderItems,
  customRequests,
  orderTotal,
  t,
  onContinue,
  categoryLabels,
  heroTitle,
  heroSubtitle,
  quickPrimary,
  quickSecondary,
  cartTitle,
  cartEmpty,
  cartCta,
  cartTotal,
  cartWarnMin,
  allergenTitle,
  allergenBody,
  allergenLink,
  removeLineLabel,
  methodLabel,
}: OrderShopStepProps) {
  const { toast } = useToast();
  const lang = language === "ro" ? "ro" : "nl";
  const [category, setCategory] = useState<OrderCategoryId>("colli");

  const productByKey = useMemo(() => {
    const m = new Map<string, ProductRow>();
    products.forEach((p) => m.set(p.key, p));
    return m;
  }, [products]);

  const deliveryMethod = form.watch("deliveryMethod");

  const setQuantity = useCallback(
    (productKey: string, newQty: number, defaultUnit: string) => {
      const items = form.getValues("orderItems");
      const idx = items.findIndex((i) => i.product === productKey);
      if (newQty <= 0) {
        if (idx >= 0) {
          form.setValue(
            "orderItems",
            items.filter((_, i) => i !== idx),
            { shouldValidate: true }
          );
        }
        return;
      }
      const unit = idx >= 0 ? items[idx].unit : defaultUnit;
      const qtyStr =
        unit === "kg"
          ? String(Math.round(newQty * 10) / 10)
          : String(Math.max(1, Math.round(newQty)));

      if (idx >= 0) {
        const next = [...items];
        next[idx] = { ...next[idx], quantity: qtyStr, unit };
        form.setValue("orderItems", next, { shouldValidate: true });
      } else {
        form.setValue(
          "orderItems",
          [...items, { product: productKey, quantity: qtyStr, unit: defaultUnit }],
          { shouldValidate: true }
        );
      }
    },
    [form]
  );

  const getStepAndMin = (productKey: string) => {
    const p = productByKey.get(productKey);
    const unit = p?.unit ?? "stuk";
    if (unit === "kg") return { step: 0.5, min: 0.5 };
    return { step: 1, min: 1 };
  };

  const increment = (productKey: string) => {
    const p = productByKey.get(productKey);
    const { step, min } = getStepAndMin(productKey);
    const defaultUnit = p?.unit ?? "stuk";
    const cur = getQty(productKey, orderItems);
    const next = cur <= 0 ? min : cur + step;
    setQuantity(productKey, next, defaultUnit);
  };

  const decrement = (productKey: string) => {
    const p = productByKey.get(productKey);
    const { step, min } = getStepAndMin(productKey);
    const defaultUnit = p?.unit ?? "stuk";
    const cur = getQty(productKey, orderItems);
    if (cur <= 0) return;
    const next = cur - step;
    if (next < min - 0.001) {
      setQuantity(productKey, 0, defaultUnit);
    } else {
      setQuantity(productKey, next, defaultUnit);
    }
  };

  const removeLine = (productKey: string) => {
    const items = form.getValues("orderItems");
    form.setValue(
      "orderItems",
      items.filter((i) => i.product !== productKey),
      { shouldValidate: true }
    );
  };

  const incrementStatic = (id: string) => {
    const cur = getQty(id, orderItems);
    if (cur <= 0) setQuantity(id, 1, "stuk");
    else setQuantity(id, cur + 1, "stuk");
  };

  const decrementStatic = (id: string) => {
    const cur = getQty(id, orderItems);
    if (cur <= 1) setQuantity(id, 0, "stuk");
    else setQuantity(id, cur - 1, "stuk");
  };

  const addCustomRequest = useCallback(
    (item: CustomCartRequest) => {
      const cur = form.getValues("customRequests") ?? [];
      form.setValue("customRequests", [...cur, item], { shouldValidate: true });
      toast({
        title: t("order.shop.customSection.toastAdded"),
        duration: 2500,
      });
    },
    [form, toast, t]
  );

  const removeCustomRequest = useCallback(
    (id: string) => {
      const cur = form.getValues("customRequests") ?? [];
      form.setValue(
        "customRequests",
        cur.filter((c) => c.id !== id),
        { shouldValidate: true }
      );
    },
    [form]
  );

  const scrollToProducts = () => {
    document.getElementById("order-product-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const keysForTab = ORDER_PRODUCT_KEYS[category];
  const staticForTab = STATIC_ROWS_BY_CATEGORY[category];

  const getLineTitle = (productKey: string) => {
    if (isStaticProductKey(productKey)) {
      const row = STATIC_ORDER_ROWS.find((r) => r.id === productKey);
      if (row) return lang === "ro" ? row.ro : row.nl;
    }
    const p = productByKey.get(productKey);
    if (p) return lang === "ro" ? p.name_ro : p.name_nl;
    return productKey;
  };

  const getLineUnitPrice = (productKey: string): number | null => {
    const p = productByKey.get(productKey);
    return p ? Number(p.price) : null;
  };

  const getDecimals = (productKey: string) => {
    if (isStaticProductKey(productKey)) return 0;
    const p = productByKey.get(productKey);
    return p?.unit === "kg" ? 1 : 0;
  };

  const minimumOk = orderTotal >= DELIVERY_MIN || deliveryMethod === "pickup";

  const pickupIntro =
    lang === "nl"
      ? "Afhalen in de winkel in Zwevezele — snel en persoonlijk."
      : "Ridicare în magazin la Zwevezele — rapid și personal.";
  const deliveryIntro =
    lang === "nl"
      ? "Levering aan huis volgens onderstaande voorwaarden. Minimum voor levering: €50."
      : "Livrare la domiciliu conform condițiilor de mai jos. Minimum pentru livrare: €50.";

  return (
    <div className="space-y-6 md:space-y-8">
      <OrderHero title={heroTitle} subtitle={heroSubtitle} />

      <div className="flex flex-col items-center gap-3">
        <OrderTypeToggle
          value={deliveryMethod}
          onChange={(v) => form.setValue("deliveryMethod", v)}
          pickupLabel={t("order.method.pickup.title")}
          deliveryLabel={t("order.method.delivery.title")}
          size="lg"
          className="max-w-lg w-full"
        />
      </div>

      <QuickOrderPanel
        deliveryMethod={deliveryMethod}
        onDeliveryMethodChange={(v) => form.setValue("deliveryMethod", v)}
        pickupLabel={t("order.method.pickup.title")}
        deliveryLabel={t("order.method.delivery.title")}
        methodLabel={methodLabel}
        primaryCta={quickPrimary}
        secondaryCta={quickSecondary}
        onPrimaryScroll={scrollToProducts}
      />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px] xl:items-start">
        <div className="space-y-6 min-w-0">
          <div id="order-product-list" className="scroll-mt-28 space-y-4">
            <h2 className="font-serif text-xl font-semibold text-foreground sr-only">Assortiment</h2>
            <OrderCategoryTabs active={category} onChange={setCategory} labels={categoryLabels} />

            <div className="space-y-3 pt-2">
              {keysForTab.map((key) => {
                const p = productByKey.get(key);
                if (!p) return null;
                const qty = getQty(key, orderItems);
                const name = lang === "ro" ? p.name_ro : p.name_nl;
                const desc = getProductDescription(key, lang);
                const img = PRODUCT_BROWSE_IMAGES[key];
                const decimals = p.unit === "kg" ? 1 : 0;

                return (
                  <OrderProductRow
                    key={key}
                    title={name}
                    description={desc}
                    imageSrc={img}
                    priceLabel={`€${formatPrice(Number(p.price))}`}
                    quantity={qty}
                    unitLabel={p.unit === "kg" ? (lang === "nl" ? "kg" : "kg") : lang === "nl" ? "stuk" : "buc."}
                    decimals={decimals}
                    onIncrement={() => increment(key)}
                    onDecrement={() => decrement(key)}
                    onRemove={() => removeLine(key)}
                  />
                );
              })}

              {staticForTab.map((row) => {
                const qty = getQty(row.id, orderItems);
                const title = lang === "ro" ? row.ro : row.nl;
                const desc = lang === "ro" ? row.descRo : row.descNl;
                return (
                  <OrderProductRow
                    key={row.id}
                    title={title}
                    description={desc}
                    imageSrc={PRODUCT_BROWSE_IMAGES.tapasVisual}
                    priceLabel={lang === "nl" ? "Prijs op aanvraag" : "Preț la cerere"}
                    quantity={qty}
                    unitLabel=""
                    decimals={0}
                    isStatic
                    badge={lang === "nl" ? "Traiteur" : "Traiteur"}
                    onIncrement={() => incrementStatic(row.id)}
                    onDecrement={() => decrementStatic(row.id)}
                    onRemove={() => removeLine(row.id)}
                  />
                );
              })}
            </div>
          </div>

          <CustomRequestSection
            labels={{
              title: t("order.shop.customSection.title"),
              subtitle: t("order.shop.customSection.subtitle"),
              fieldTitle: t("order.shop.customSection.fieldTitle"),
              fieldQty: t("order.shop.customSection.fieldQty"),
              fieldNote: t("order.shop.customSection.fieldNote"),
              cta: t("order.shop.customSection.cta"),
            }}
            onAdd={addCustomRequest}
          />

          <div className="rounded-xl border border-amber-900/40 bg-amber-950/25 p-4 flex gap-3 text-sm text-amber-100/90">
            <Info className="h-5 w-5 shrink-0 text-amber-400" aria-hidden />
            <div>
              <p className="font-medium text-amber-50">{allergenTitle}</p>
              <p className="mt-1 text-amber-100/85">
                {allergenBody}{" "}
                <LocalizedLink to="/allergens" className="underline font-semibold hover:text-primary">
                  {allergenLink}
                </LocalizedLink>
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <DeliveryInfoCard
            mode={deliveryMethod}
            pickupIntro={pickupIntro}
            deliveryIntro={deliveryIntro}
            minimumLine={t("order.deliveryInfo.minimum")}
            tier1Free={t("order.deliveryInfo.tier1Free")}
            tier1Paid={t("order.deliveryInfo.tier1Paid")}
            minimum100={t("order.deliveryInfo.minimum100")}
            tier2Free={t("order.deliveryInfo.tier2Free")}
            tier2Paid={t("order.deliveryInfo.tier2Paid")}
            schedule={t("order.deliveryInfo.schedule")}
            address={t("order.deliveryInfo.address")}
            phoneDisplay="+32 466 18 64 57"
            phoneHref="tel:+32466186457"
          />

          <CartSummaryPanel
            lines={orderItems}
            customRequests={customRequests}
            customLabels={{
              lineTitle: t("order.shop.cart.customLineTitle"),
              qty: t("order.shop.cart.customQty"),
              note: t("order.shop.cart.customNote"),
            }}
            getLineTitle={getLineTitle}
            getLineUnitPrice={getLineUnitPrice}
            orderTotal={orderTotal}
            deliveryMethod={deliveryMethod}
            minimumOk={minimumOk}
            emptyMessage={cartEmpty}
            title={cartTitle}
            totalLabel={cartTotal}
            ctaLabel={cartCta}
            warningMinimum={cartWarnMin}
            onIncrement={(pk) => (isStaticProductKey(pk) ? incrementStatic(pk) : increment(pk))}
            onDecrement={(pk) => (isStaticProductKey(pk) ? decrementStatic(pk) : decrement(pk))}
            onRemove={removeLine}
            onRemoveCustom={removeCustomRequest}
            onCheckout={onContinue}
            getQuantity={(pk) => getQty(pk, orderItems)}
            getDecimals={getDecimals}
            removeLabel={removeLineLabel}
          />
        </aside>
      </div>

      {/* Mobile sticky checkout */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
        <div className="container mx-auto flex items-center justify-between gap-3 max-w-lg">
          <div>
            <p className="text-xs text-muted-foreground">{cartTotal}</p>
            <p className="text-xl font-bold text-primary">€{orderTotal.toFixed(2)}</p>
          </div>
          <button
            type="button"
            disabled={orderItems.length === 0 && customRequests.length === 0}
            onClick={onContinue}
            className="min-h-[48px] px-6 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-40"
          >
            {cartCta}
          </button>
        </div>
      </div>
      <div className="h-20 xl:hidden" aria-hidden />
    </div>
  );
}
