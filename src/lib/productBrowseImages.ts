import porkProducts from "@/assets/pork-products.webp";
import chicken from "@/assets/chicken.webp";
import specialtyPlatter from "@/assets/specialty-platter.webp";
import bbqGrillMeats from "@/assets/bbq-grill-meats.webp";
import luxeGourmetSchotel from "@/assets/luxe-gourmet-schotel-10-soorten-vlees.webp";
import fondueVlees from "@/assets/fondue-bourguignonne-meat-platter-beef-chicken.webp";
import tapasJohnPlatter from "@/assets/tapas-john-family-platter.webp";
import steengrillPlatter from "@/assets/steengrill-vleesschotel-assortiment.webp";

/** Hero / browse visuals for product keys (Supabase) */
export const PRODUCT_BROWSE_IMAGES: Record<string, string> = {
  beef: porkProducts,
  pork: porkProducts,
  chickenBreast: chicken,
  steak: steengrillPlatter,
  ribs: bbqGrillMeats,
  sausages: bbqGrillMeats,
  bacon: porkProducts,
  lamb: specialtyPlatter,
  groundBeef: porkProducts,
  mincedPork: porkProducts,
  homemadeSausage: bbqGrillMeats,
  meatballs: porkProducts,
  chickenThighs: chicken,
  wholeChicken: chicken,
  bbqPackage: bbqGrillMeats,
  colliPork1: porkProducts,
  colliPork2: porkProducts,
  colliChicken: chicken,
  colliMixed: specialtyPlatter,
  colliBBQ: bbqGrillMeats,
  colliJohn: luxeGourmetSchotel,
  tapasVisual: tapasJohnPlatter,
  fondueVisual: fondueVlees,
  gourmetVisual: luxeGourmetSchotel,
};
