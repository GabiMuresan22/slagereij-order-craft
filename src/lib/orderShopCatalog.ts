/**
 * Order page: product keys per category tab (Supabase `products.key`).
 * Static rows use keys prefixed with `static_` (not in DB; price €0, confirmed manually).
 */

export type OrderCategoryId = "colli" | "bbq" | "tapas" | "desserts";

export const ORDER_CATEGORY_ORDER: OrderCategoryId[] = ["colli", "bbq", "tapas", "desserts"];

export const ORDER_PRODUCT_KEYS: Record<OrderCategoryId, string[]> = {
  colli: [
    "colliPork1",
    "colliPork2",
    "colliChicken",
    "colliMixed",
    "colliBBQ",
    "colliJohn",
    "bbqPackage",
  ],
  bbq: [
    "steak",
    "ribs",
    "sausages",
    "bacon",
    "lamb",
    "mincedPork",
    "meatballs",
    "chickenThighs",
    "wholeChicken",
    "groundBeef",
    "beef",
    "pork",
    "chickenBreast",
    "homemadeSausage",
  ],
  tapas: [],
  desserts: [],
};

/** Static catalog lines (not in products table) */
export const STATIC_ORDER_ROWS: {
  id: string;
  nl: string;
  ro: string;
  descNl: string;
  descRo: string;
}[] = [
  {
    id: "static_tapas",
    nl: "Tapas & hapjes (assortiment)",
    ro: "Tapas & aperitive (sortiment)",
    descNl: "Koude schotels en hapjes — details in opmerkingen of telefonisch.",
    descRo: "Platouri reci și aperitive — detalii la observații sau telefonic.",
  },
  {
    id: "static_tapas_schotel",
    nl: "Tapas schotel (familie)",
    ro: "Platou tapas (familie)",
    descNl: "Grote schotel voor gezelschap; samenstelling in overleg.",
    descRo: "Platou mare pentru grup; compoziția se stabilește în consultare.",
  },
  {
    id: "static_dessert",
    nl: "Desserts & extra’s (seizoen)",
    ro: "Deserturi & extra (sezon)",
    descNl: "Zoetigheden en extra’s — vraag naar het actuele aanbod.",
    descRo: "Deserturi și extra — întrebați despre oferta curentă.",
  },
];

export function isStaticProductKey(key: string): boolean {
  return key.startsWith("static_");
}

export const STATIC_ROWS_BY_CATEGORY: Record<OrderCategoryId, typeof STATIC_ORDER_ROWS> = {
  colli: [],
  bbq: [],
  tapas: [STATIC_ORDER_ROWS[0], STATIC_ORDER_ROWS[1]],
  desserts: [STATIC_ORDER_ROWS[2]],
};
