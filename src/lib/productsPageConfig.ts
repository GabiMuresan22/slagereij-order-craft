/**
 * Products / Webshop page: category → product keys (Supabase `products.key`)
 * and appetizing short descriptions for conversion copy.
 */

export const CATEGORY_SECTION_IDS = {
  populair: "populaire-keuzes",
  colli: "collis-voordeelpakketten",
  bbq: "bbq-gourmet",
  tapas: "tapas-hapjes",
  warm: "warme-gerechten-soepen",
} as const;

/** Product keys per category (each key appears in one primary section) */
export const PRODUCT_KEYS_BY_CATEGORY: Record<string, string[]> = {
  populair: [
    "steak",
    "homemadeSausage",
    "ribs",
    "chickenBreast",
    "beef",
    "pork",
  ],
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
    "sausages",
    "bacon",
    "lamb",
    "mincedPork",
    "meatballs",
    "chickenThighs",
    "wholeChicken",
    "groundBeef",
  ],
};

/** Short, specific descriptions per product key (NL / RO) */
export const PRODUCT_CARD_COPY: Record<
  string,
  { nl: string; ro: string }
> = {
  steak: {
    nl: "Malse biefstuk voor op de grill of in de pan — een klassieker voor liefhebbers van puur rund.",
    ro: "Friptură fragedă la grătar sau la tigaie — o alegere clasică pentru iubitorii de vită.",
  },
  homemadeSausage: {
    nl: "Huisgemaakte worst met eigen kruiden — perfect voor bij de bbq of in de pan.",
    ro: "Cârnați de casă cu condimente proprii — ideali la grătar sau la tigaie.",
  },
  ribs: {
    nl: "Spareribs om langzaam te garen — vol smaak voor een geslaagde barbecue.",
    ro: "Coaste pentru gătire lentă — pline de gust pentru un grătar reușit.",
  },
  chickenBreast: {
    nl: "Dagvers kipfilet — veelzijdig voor wok, oven of lichte maaltijden.",
    ro: "Piept de pui proaspăt — versatil pentru wok, cuptor sau mese ușoare.",
  },
  beef: {
    nl: "Kwaliteitsrund voor stoofpot, gehakt of klassieke bereidingen.",
    ro: "Vită de calitate pentru tocăni, tocătură sau preparate clasice.",
  },
  pork: {
    nl: "Vers varkensvlees voor braadstuk, stoof of huisgemaakte gerechten.",
    ro: "Carne de porc proaspătă pentru friptură, tocăni sau preparate de casă.",
  },
  colliPork1: {
    nl: "Voordelig varkenspakket — ideaal om de voorraad aan te vullen.",
    ro: "Pachet avantajos de porc — ideal pentru reaprovizionare.",
  },
  colliPork2: {
    nl: "Uitgebreider varkenscolli met variatie voor het hele gezin.",
    ro: "Colli porc mai bogat, cu varietate pentru întreaga familie.",
  },
  colliChicken: {
    nl: "Kippakket met selectie — handig voor weekmenu’s en maaltijdbox.",
    ro: "Pachet pui cu selecție — practic pentru meniuri săptămânale.",
  },
  colliMixed: {
    nl: "Gemengd colli — smaak en variatie in één pakket.",
    ro: "Colli mixt — gust și varietate într-un singur pachet.",
  },
  colliBBQ: {
    nl: "Alles voor de barbecue in één voordelig pakket.",
    ro: "Tot ce trebuie pentru grătar într-un pachet avantajos.",
  },
  colliJohn: {
    nl: "Ons premium familiepakket — de meest complete keuze.",
    ro: "Pachetul nostru premium pentru familie — cea mai completă alegere.",
  },
  bbqPackage: {
    nl: "BBQ-pakket klaar om te grillen — gemak en smaak samen.",
    ro: "Pachet BBQ gata de grătar — comoditate și gust la un loc.",
  },
  sausages: {
    nl: "Smaakvolle worstjes voor op de grill of in de pan.",
    ro: "Crenvurști aromati la grătar sau la tigaie.",
  },
  bacon: {
    nl: "Krokant spek voor ontbijt, salade of bijgerecht.",
    ro: "Bacon crocant pentru mic dejun, salată sau garnitură.",
  },
  lamb: {
    nl: "Lamsvlees voor een feestelijke maaltijd of stoof.",
    ro: "Carne de miel pentru o masă festivă sau tocăniță.",
  },
  mincedPork: {
    nl: "Vers gehakt varken voor sauzen, gehaktballen of vulling.",
    ro: "Carne tocată de porc proaspătă pentru sosuri, chiftele sau umpluturi.",
  },
  meatballs: {
    nl: "Huisgemaakte gehaktballen — snel een warme, huiselijke maaltijd.",
    ro: "Chiftele de casă — repede o masă caldă și reconfortantă.",
  },
  chickenThighs: {
    nl: "Kippendijen vol smaak — ideaal voor oven, grill of stoofpot.",
    ro: "Pulpe de pui pline de gust — ideale la cuptor, grătar sau tocăniță.",
  },
  wholeChicken: {
    nl: "Hele kip om te braden of te grillen — perfect voor het weekend.",
    ro: "Pui întreg la cuptor sau grătar — perfect pentru weekend.",
  },
  groundBeef: {
    nl: "Rundgehakt voor burgers, pasta of ovenschotels.",
    ro: "Carne tocată de vită pentru burgeri, paste sau la cuptor.",
  },
};

export function getProductDescription(key: string, lang: "nl" | "ro"): string {
  const copy = PRODUCT_CARD_COPY[key];
  if (!copy) {
    return lang === "nl"
      ? "Ambachtelijk bereid en eenvoudig online te bestellen bij Slagerij John."
      : "Pregătit cu grijă și ușor de comandat online la Slagerij John.";
  }
  return lang === "ro" ? copy.ro : copy.nl;
}
