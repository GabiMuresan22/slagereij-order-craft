import React, { createContext, useContext, useState } from 'react';

type Language = 'nl' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over Ons',
    'nav.products': 'Producten',
    'nav.order': 'Bestel Online',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'Kwaliteitsvlees',
    'home.hero.subtitle': 'Traditioneel ambacht met moderne service',
    'home.hero.cta': 'Bestel Nu Online',
    'home.features.online.title': 'Online Bestellen',
    'home.features.online.desc': 'Bestel gemakkelijk online en haal op wanneer het u uitkomt',
    'home.features.quality.title': 'Premium Kwaliteit',
    'home.features.quality.desc': 'Enkel het beste vlees van vertrouwde lokale leveranciers',
    'home.features.fresh.title': 'Verse Bereiding',
    'home.features.fresh.desc': 'Dagelijks vers bereid volgens traditionele recepten',
    'home.specials.title': 'Deze Week in de Aanbieding',
    'home.specials.steak.title': 'Biologische Biefstuk',
    'home.specials.steak.price': '€18,99/kg',
    'home.specials.steak.desc': 'Premium biologische biefstuk van lokale boerderijen',
    'home.specials.sausage.title': 'Huisgemaakte Worst',
    'home.specials.sausage.price': '€12,50/kg',
    'home.specials.sausage.desc': 'Volgens ons geheime familierecept gemaakt',
    'home.specials.order': 'Bestel Nu',
    'home.cta.title': 'Klaar om te Bestellen?',
    'home.cta.subtitle': 'Ontdek ons volledig assortiment en bestel vandaag nog voor afhaling',
    'home.cta.orderBtn': 'Online Bestellen',
    'home.cta.productsBtn': 'Bekijk Producten',
    
    // About Page
    'about.title': 'Over Slagerij John',
    'about.subtitle': 'De nieuwste culinaire aanwinst in Zwevezele',
    'about.story.title': 'Ons Verhaal',
    'about.story.p1': 'Welkom bij Slagerij John, de nieuwste culinaire aanwinst in Zwevezele! In de Bruggestraat 146A, waar vroeger bakkerij Choc-O-Fee en bakkerij Geert gevestigd waren, hebben Ion (John) Nistor (36) en zijn echtgenote Georgiana (31) hun droom waargemaakt met de opening van hun eigen slagerij.',
    'about.story.p2': '"Eigenlijk heet ik Ion, maar iedereen noemt me John," legt de slager uit. "Ion is de Roemeense versie van die naam en toen we destijds naar België kwamen werd ik in de omgang heel snel John genoemd. Die naam is blijven plakken. Zelfs mijn vrouw noemt me zo!"',
    'about.values.experience.title': 'Ervaring & Passie',
    'about.values.experience.desc': 'Al op 16-jarige leeftijd begon John zijn carrière in Roemenië, waar hij ervaring opdeed in slagerijen en slachthuizen.',
    'about.values.culture.title': 'Twee Culturen',
    'about.values.culture.desc': 'Een unieke mix van Belgische en Roemeense specialiteiten, symbolisch vertegenwoordigd door onze ballonfiguren in beide nationale kleuren.',
    'about.values.local.title': 'Lokale Verbondenheid',
    'about.values.local.desc': 'Al 8 jaar thuis in Zwevezele, waar het gezin met drie kinderen in de Laurierstraat woont en volledig ingeburgerd is.',
    'about.specialties.title': 'Onze Specialiteiten',
    'about.specialties.intro': 'In onze toonbank vindt u een breed assortiment aan:',
    'about.specialties.item1': 'Klassieke Belgische vleeswaren en charcuterie',
    'about.specialties.item2': 'Traditionele bereide gerechten zoals stoofvlees en vol-au-vent',
    'about.specialties.item3': 'Roemeense specialiteiten zoals \'Mici\' (gekruide rundergehaktrolletjes)',
    'about.specialties.item4': 'Verse belegde broodjes',
    'about.specialties.item5': 'Huisgemaakte worsten van varkens- en rundsgrehakt',
    'about.team.title': 'Het Team achter Slagerij John',
    'about.team.names': 'Georgiana Nistor & Ion (John) Nistor',
    'about.team.role': 'Eigenaars',
    'about.team.desc': 'Ion (John) en Georgiana staan klaar om u te helpen met advies, speciale wensen of simpelweg een praatje. Met hun passie voor kwaliteitsvlees en persoonlijke service delen ze graag hun kennis over de beste bereidingswijzen en recepten. Kom gerust langs en maak kennis!',
    
    // Products Page
    'products.title': 'Ons Assortiment',
    'products.subtitle': 'Ontdek ons uitgebreide assortiment van kwaliteitsvlees',
    'products.beef.title': 'Rundvlees',
    'products.beef.description': 'Premium biefstukken, gehakt, stoofvlees en meer',
    'products.beef.item1': 'Biefstuk (diverse soorten)',
    'products.beef.item2': 'Rosbief',
    'products.beef.item3': 'Gehakt (rund)',
    'products.beef.item4': 'Stoofvlees',
    'products.beef.item5': 'Riblappen',
    'products.beef.item6': 'Ossenhaas',
    'products.pork.title': 'Varkensvlees',
    'products.pork.description': 'Verse varkensproducten en huisgemaakte specialiteiten',
    'products.pork.item1': 'Varkenshaas',
    'products.pork.item2': 'Koteletten',
    'products.pork.item3': 'Gehakt (varken)',
    'products.pork.item4': 'Speklappen',
    'products.pork.item5': 'Braadworst',
    'products.pork.item6': 'Huisgemaakte worst',
    'products.poultry.title': 'Gevogelte',
    'products.poultry.description': 'Verse kip, kalkoen en gevogelte specialiteiten',
    'products.poultry.item1': 'Hele kip',
    'products.poultry.item2': 'Kipfilet',
    'products.poultry.item3': 'Kippendijen',
    'products.poultry.item4': 'Kalkoenfilet',
    'products.poultry.item5': 'Kipgehakt',
    'products.poultry.item6': 'Gevulde kip',
    'products.specialties.title': 'Onze Specialiteiten',
    'products.specialties.homemade': 'Huisgemaakte Producten',
    'products.specialties.homemade.item1': 'Gehaktballen (speciaal recept)',
    'products.specialties.homemade.item2': 'Verse worst (verschillende smaken)',
    'products.specialties.homemade.item3': 'Kruidenboter',
    'products.specialties.homemade.item4': 'Marinades',
    'products.specialties.bbq': 'BBQ & Grill',
    'products.specialties.bbq.item1': 'BBQ pakketten',
    'products.specialties.bbq.item2': 'Gemarineerde spiesjes',
    'products.specialties.bbq.item3': 'Hamburgers (huisgemaakt)',
    'products.specialties.bbq.item4': 'Spare ribs',
    'products.cta.title': 'Klaar om te Bestellen?',
    'products.cta.subtitle': 'Bekijk ons volledige assortiment en bestel online',
    'products.cta.button': 'Bestel Nu Online',
    
    // Order Page
    'order.title': 'Bestel Online',
    'order.subtitle': 'Plaats uw bestelling en haal deze af in onze winkel',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Kom langs in onze winkel of neem contact met ons op',
    'contact.address.title': 'Adres',
    'contact.address.street': 'Bruggestraat 146/a',
    'contact.address.city': '8750 Wingene',
    'contact.address.country': 'België',
    'contact.phone.title': 'Telefoon',
    'contact.email.title': 'Email',
    'contact.hours.title': 'Openingsuren',
    'contact.hours.mon': 'Maandag: 08:00 - 18:00',
    'contact.hours.tue': 'Dinsdag: 08:00 - 18:00',
    'contact.hours.wed': 'Woensdag: 08:00 - 13:00',
    'contact.hours.thu': 'Donderdag: 08:00 - 18:00',
    'contact.hours.fri': 'Vrijdag: 08:00 - 18:00',
    'contact.hours.sat': 'Zaterdag: 08:00 - 18:00',
    'contact.hours.sun': 'Zondag: Gesloten',
    'contact.cta.title': 'Vragen of Speciale Wensen?',
    'contact.cta.desc': 'Bel ons gerust of kom langs in de winkel. We helpen u graag verder met advies, speciale bestellingen of vragen over bereiding.',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.hours': 'Openingsuren',
    'footer.hours.mon': 'Ma: 08:00 - 18:00',
    'footer.hours.tue': 'Di: 08:00 - 18:00',
    'footer.hours.wed': 'Wo: 08:00 - 13:00',
    'footer.hours.thu': 'Do: 08:00 - 18:00',
    'footer.hours.fri': 'Vr: 08:00 - 18:00',
    'footer.hours.sat': 'Za: 08:00 - 18:00',
    'footer.hours.sun': 'Zo: Gesloten',
    'footer.about.title': 'Slagerij John',
    'footer.about.desc': 'Uw vertrouwde slager voor vers vlees en huisgemaakte specialiteiten. Kwaliteit en service staan bij ons centraal.',
    'footer.rights': 'Alle rechten voorbehouden.',
  },
  ro: {
    // Navigation
    'nav.home': 'Acasă',
    'nav.about': 'Despre Noi',
    'nav.products': 'Produse',
    'nav.order': 'Comandă Online',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'Carne de Calitate',
    'home.hero.subtitle': 'Meșteșug tradițional cu servicii moderne',
    'home.hero.cta': 'Comandă Acum Online',
    'home.features.online.title': 'Comandă Online',
    'home.features.online.desc': 'Comandă ușor online și ridică când îți convine',
    'home.features.quality.title': 'Calitate Premium',
    'home.features.quality.desc': 'Numai cea mai bună carne de la furnizori locali de încredere',
    'home.features.fresh.title': 'Preparare Proaspătă',
    'home.features.fresh.desc': 'Pregătit zilnic proaspăt după rețete tradiționale',
    'home.specials.title': 'Oferte Săptămâna Aceasta',
    'home.specials.steak.title': 'Mușchi Bio',
    'home.specials.steak.price': '€18,99/kg',
    'home.specials.steak.desc': 'Mușchi bio premium de la ferme locale',
    'home.specials.sausage.title': 'Cârnați Casnici',
    'home.specials.sausage.price': '€12,50/kg',
    'home.specials.sausage.desc': 'Făcuți după rețeta noastră secretă de familie',
    'home.specials.order': 'Comandă Acum',
    'home.cta.title': 'Gata să Comenzi?',
    'home.cta.subtitle': 'Descoperă sortimentul nostru complet și comandă astăzi pentru ridicare',
    'home.cta.orderBtn': 'Comandă Online',
    'home.cta.productsBtn': 'Vezi Produsele',
    
    // About Page
    'about.title': 'Despre Măcelăria John',
    'about.subtitle': 'Cea mai nouă achiziție culinară din Zwevezele',
    'about.story.title': 'Povestea Noastră',
    'about.story.p1': 'Bun venit la Măcelăria John, cea mai nouă achiziție culinară din Zwevezele! Pe Bruggestraat 146A, unde odinioară erau brutăriile Choc-O-Fee și Geert, Ion (John) Nistor (36) și soția sa Georgiana (31) și-au îndeplinit visul deschizând propria măcelărie.',
    'about.story.p2': '"De fapt mă numesc Ion, dar toată lumea mă cheamă John," explică măcelarul. "Ion este versiunea românească a numelui și când am venit în Belgia am început să fiu numit John. Numele a rămas. Chiar și soția mea mă cheamă așa!"',
    'about.values.experience.title': 'Experiență & Pasiune',
    'about.values.experience.desc': 'La vârsta de 16 ani, John și-a început cariera în România, unde a dobândit experiență în măcelării și abatoare.',
    'about.values.culture.title': 'Două Culturi',
    'about.values.culture.desc': 'Un amestec unic de specialități belgiene și românești, reprezentat simbolic de figurile noastre cu baloane în ambele culori naționale.',
    'about.values.local.title': 'Conexiune Locală',
    'about.values.local.desc': 'Acasă în Zwevezele de 8 ani, unde familia cu trei copii locuiește pe Laurierstraat și este complet integrată.',
    'about.specialties.title': 'Specialitățile Noastre',
    'about.specialties.intro': 'În vitrina noastră veți găsi o gamă largă de:',
    'about.specialties.item1': 'Mezeluri și charcuterie belgiene clasice',
    'about.specialties.item2': 'Mâncăruri preparate tradițional precum tocană și vol-au-vent',
    'about.specialties.item3': 'Specialități românești precum \'Mici\' (rulouri de carne tocată de vită condimentată)',
    'about.specialties.item4': 'Sandvișuri proaspete',
    'about.specialties.item5': 'Cârnați casnici din carne tocată de porc și vită',
    'about.team.title': 'Echipa din Spatele Măcelăriei John',
    'about.team.names': 'Georgiana Nistor & Ion (John) Nistor',
    'about.team.role': 'Proprietari',
    'about.team.desc': 'Ion (John) și Georgiana sunt gata să vă ajute cu sfaturi, cerințe speciale sau pur și simplu o discuție. Cu pasiunea lor pentru carne de calitate și servicii personalizate, împart cu plăcere cunoștințele despre cele mai bune metode de preparare și rețete. Vino să ne cunoști!',
    
    // Products Page
    'products.title': 'Sortimentul Nostru',
    'products.subtitle': 'Descoperă sortimentul nostru extins de carne de calitate',
    'products.beef.title': 'Carne de Vită',
    'products.beef.description': 'Mușchiuri premium, carne tocată, tocană și multe altele',
    'products.beef.item1': 'Mușchi (diverse sortimente)',
    'products.beef.item2': 'Rosbif',
    'products.beef.item3': 'Carne tocată (vită)',
    'products.beef.item4': 'Carne de tocană',
    'products.beef.item5': 'Coaste de vită',
    'products.beef.item6': 'File de vită',
    'products.pork.title': 'Carne de Porc',
    'products.pork.description': 'Produse proaspete de porc și specialități casnice',
    'products.pork.item1': 'Mușchi de porc',
    'products.pork.item2': 'Cotlete',
    'products.pork.item3': 'Carne tocată (porc)',
    'products.pork.item4': 'Costițe afumate',
    'products.pork.item5': 'Cârnați de grătar',
    'products.pork.item6': 'Cârnați casnici',
    'products.poultry.title': 'Pasăre',
    'products.poultry.description': 'Pui proaspăt, curcan și specialități din pasăre',
    'products.poultry.item1': 'Pui întreg',
    'products.poultry.item2': 'Piept de pui',
    'products.poultry.item3': 'Pulpe de pui',
    'products.poultry.item4': 'Piept de curcan',
    'products.poultry.item5': 'Carne tocată de pui',
    'products.poultry.item6': 'Pui umplut',
    'products.specialties.title': 'Specialitățile Noastre',
    'products.specialties.homemade': 'Produse Casnice',
    'products.specialties.homemade.item1': 'Chiftele (rețetă specială)',
    'products.specialties.homemade.item2': 'Cârnați proaspeți (diverse arome)',
    'products.specialties.homemade.item3': 'Unt cu ierburi',
    'products.specialties.homemade.item4': 'Marinade',
    'products.specialties.bbq': 'BBQ & Grătar',
    'products.specialties.bbq.item1': 'Pachete BBQ',
    'products.specialties.bbq.item2': 'Frigărui marinate',
    'products.specialties.bbq.item3': 'Burgeri (casnici)',
    'products.specialties.bbq.item4': 'Coaste de porc',
    'products.cta.title': 'Gata să Comenzi?',
    'products.cta.subtitle': 'Vezi sortimentul nostru complet și comandă online',
    'products.cta.button': 'Comandă Acum Online',
    
    // Order Page
    'order.title': 'Comandă Online',
    'order.subtitle': 'Plasează comanda și ridică-o din magazinul nostru',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Treci pe la magazinul nostru sau contactează-ne',
    'contact.address.title': 'Adresă',
    'contact.address.street': 'Bruggestraat 146/a',
    'contact.address.city': '8750 Wingene',
    'contact.address.country': 'Belgia',
    'contact.phone.title': 'Telefon',
    'contact.email.title': 'Email',
    'contact.hours.title': 'Program',
    'contact.hours.mon': 'Luni: 08:00 - 18:00',
    'contact.hours.tue': 'Marți: 08:00 - 18:00',
    'contact.hours.wed': 'Miercuri: 08:00 - 13:00',
    'contact.hours.thu': 'Joi: 08:00 - 18:00',
    'contact.hours.fri': 'Vineri: 08:00 - 18:00',
    'contact.hours.sat': 'Sâmbătă: 08:00 - 18:00',
    'contact.hours.sun': 'Duminică: Închis',
    'contact.cta.title': 'Întrebări sau Cerințe Speciale?',
    'contact.cta.desc': 'Sună-ne sau treci pe la magazin. Te ajutăm cu plăcere cu sfaturi, comenzi speciale sau întrebări despre preparare.',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.hours': 'Program',
    'footer.hours.mon': 'Lu: 08:00 - 18:00',
    'footer.hours.tue': 'Ma: 08:00 - 18:00',
    'footer.hours.wed': 'Mi: 08:00 - 13:00',
    'footer.hours.thu': 'Jo: 08:00 - 18:00',
    'footer.hours.fri': 'Vi: 08:00 - 18:00',
    'footer.hours.sat': 'Sâ: 08:00 - 18:00',
    'footer.hours.sun': 'Du: Închis',
    'footer.about.title': 'Măcelăria John',
    'footer.about.desc': 'Măcelarul tău de încredere pentru carne proaspătă și specialități casnice. Calitatea și serviciul sunt prioritatea noastră.',
    'footer.rights': 'Toate drepturile rezervate.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
