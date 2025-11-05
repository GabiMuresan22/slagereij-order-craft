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
    'home.hero.title': 'Kwaliteitsvlees Sinds 1985',
    'home.hero.subtitle': 'Traditioneel ambacht met moderne service',
    'home.hero.cta': 'Bestel Nu Online',
    'home.features.online.title': 'Online Bestellen',
    'home.features.online.desc': 'Bestel gemakkelijk online en haal af in de winkel',
    'home.features.quality.title': 'Premium Kwaliteit',
    'home.features.quality.desc': 'Alleen het beste vlees van lokale leveranciers',
    'home.features.fresh.title': 'Verse Bereiding',
    'home.features.fresh.desc': 'Dagelijks vers bereid in onze eigen slagerij',
    'home.specials.title': 'Deze Week in de Aanbieding',
    'home.specials.order': 'Bestel Nu',
    'home.cta.title': 'Klaar om te Bestellen?',
    'home.cta.subtitle': 'Ontdek ons ruime assortiment van kwaliteitsvlees en verse producten',
    'home.cta.orderBtn': 'Online Bestellen',
    'home.cta.productsBtn': 'Bekijk Producten',
    
    // About Page
    'about.title': 'Over Ons',
    'about.subtitle': 'Leer meer over onze geschiedenis en passie voor kwaliteitsvlees',
    'about.story.title': 'Ons Verhaal',
    'about.values.experience.title': 'Ervaring & Passie',
    'about.values.experience.desc': 'Meer dan 40 jaar ervaring in het vak',
    'about.values.culture.title': 'Twee Culturen',
    'about.values.culture.desc': 'Het beste van Nederlandse en Roemeense tradities',
    'about.values.local.title': 'Lokale Verbondenheid',
    'about.values.local.desc': 'Geworteld in de gemeenschap van Hoofddorp',
    'about.specialties.title': 'Onze Specialiteiten',
    'about.team.title': 'Het Team achter Slagerij John',
    'about.team.role': 'Eigenaar',
    
    // Products Page
    'products.title': 'Ons Assortiment',
    'products.subtitle': 'Ontdek ons uitgebreide assortiment van kwaliteitsvlees',
    'products.beef': 'Rundvlees',
    'products.pork': 'Varkensvlees',
    'products.poultry': 'Gevogelte',
    'products.specialties.title': 'Onze Specialiteiten',
    'products.specialties.homemade': 'Huisgemaakte Producten',
    'products.specialties.bbq': 'BBQ & Grill',
    'products.cta.title': 'Klaar om te Bestellen?',
    'products.cta.subtitle': 'Bekijk ons volledige assortiment en bestel online',
    'products.cta.button': 'Bestel Nu Online',
    
    // Order Page
    'order.title': 'Bestel Online',
    'order.subtitle': 'Plaats uw bestelling en haal deze af in onze winkel',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Neem contact met ons op voor vragen of bestellingen',
    'contact.info.title': 'Contactinformatie',
    'contact.hours.title': 'Openingsuren',
    'contact.hours.mon': 'Maandag: 08:00 - 18:00',
    'contact.hours.tue': 'Dinsdag: 08:00 - 18:00',
    'contact.hours.wed': 'Woensdag: 08:00 - 13:00',
    'contact.hours.thu': 'Donderdag: 08:00 - 18:00',
    'contact.hours.fri': 'Vrijdag: 08:00 - 18:00',
    'contact.hours.sat': 'Zaterdag: 08:00 - 18:00',
    'contact.hours.sun': 'Zondag: Gesloten',
    'contact.visit.title': 'Bezoek Ons',
    'contact.form.title': 'Stuur ons een bericht',
    'contact.form.name': 'Naam',
    'contact.form.email': 'E-mail',
    'contact.form.phone': 'Telefoon',
    'contact.form.message': 'Bericht',
    'contact.form.submit': 'Verstuur Bericht',
    
    // Footer
    'footer.hours': 'Openingstijden',
    'footer.hours.mon': 'Ma: 08:00 - 18:00',
    'footer.hours.tue': 'Di: 08:00 - 18:00',
    'footer.hours.wed': 'Wo: 08:00 - 13:00',
    'footer.hours.thu': 'Do: 08:00 - 18:00',
    'footer.hours.fri': 'Vr: 08:00 - 18:00',
    'footer.hours.sat': 'Za: 08:00 - 18:00',
    'footer.hours.sun': 'Zo: Gesloten',
    'footer.links': 'Snelle Links',
    'footer.connect': 'Volg Ons',
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
    'home.hero.title': 'Carne de Calitate Din 1985',
    'home.hero.subtitle': 'Meșteșug tradițional cu servicii moderne',
    'home.hero.cta': 'Comandă Acum Online',
    'home.features.online.title': 'Comandă Online',
    'home.features.online.desc': 'Comandă ușor online și ridică din magazin',
    'home.features.quality.title': 'Calitate Premium',
    'home.features.quality.desc': 'Numai cea mai bună carne de la furnizori locali',
    'home.features.fresh.title': 'Preparare Proaspătă',
    'home.features.fresh.desc': 'Pregătit zilnic proaspăt în propria noastră măcelărie',
    'home.specials.title': 'Oferte Săptămâna Aceasta',
    'home.specials.order': 'Comandă Acum',
    'home.cta.title': 'Gata să Comenzi?',
    'home.cta.subtitle': 'Descoperă sortimentul nostru larg de carne de calitate și produse proaspete',
    'home.cta.orderBtn': 'Comandă Online',
    'home.cta.productsBtn': 'Vezi Produsele',
    
    // About Page
    'about.title': 'Despre Noi',
    'about.subtitle': 'Află mai multe despre istoria și pasiunea noastră pentru carne de calitate',
    'about.story.title': 'Povestea Noastră',
    'about.values.experience.title': 'Experiență & Pasiune',
    'about.values.experience.desc': 'Peste 40 de ani de experiență în meserie',
    'about.values.culture.title': 'Două Culturi',
    'about.values.culture.desc': 'Cel mai bun din tradițiile olandeze și românești',
    'about.values.local.title': 'Conexiune Locală',
    'about.values.local.desc': 'Înrădăcinați în comunitatea din Hoofddorp',
    'about.specialties.title': 'Specialitățile Noastre',
    'about.team.title': 'Echipa din Spatele Măcelăriei John',
    'about.team.role': 'Proprietar',
    
    // Products Page
    'products.title': 'Sortimentul Nostru',
    'products.subtitle': 'Descoperă sortimentul nostru extins de carne de calitate',
    'products.beef': 'Carne de Vită',
    'products.pork': 'Carne de Porc',
    'products.poultry': 'Pasăre',
    'products.specialties.title': 'Specialitățile Noastre',
    'products.specialties.homemade': 'Produse Casnice',
    'products.specialties.bbq': 'BBQ & Grătar',
    'products.cta.title': 'Gata să Comenzi?',
    'products.cta.subtitle': 'Vezi sortimentul nostru complet și comandă online',
    'products.cta.button': 'Comandă Acum Online',
    
    // Order Page
    'order.title': 'Comandă Online',
    'order.subtitle': 'Plasează comanda și ridică-o din magazinul nostru',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Contactează-ne pentru întrebări sau comenzi',
    'contact.info.title': 'Informații de Contact',
    'contact.hours.title': 'Program',
    'contact.hours.mon': 'Luni: 08:00 - 18:00',
    'contact.hours.tue': 'Marți: 08:00 - 18:00',
    'contact.hours.wed': 'Miercuri: 08:00 - 13:00',
    'contact.hours.thu': 'Joi: 08:00 - 18:00',
    'contact.hours.fri': 'Vineri: 08:00 - 18:00',
    'contact.hours.sat': 'Sâmbătă: 08:00 - 18:00',
    'contact.hours.sun': 'Duminică: Închis',
    'contact.visit.title': 'Vizitează-ne',
    'contact.form.title': 'Trimite-ne un mesaj',
    'contact.form.name': 'Nume',
    'contact.form.email': 'E-mail',
    'contact.form.phone': 'Telefon',
    'contact.form.message': 'Mesaj',
    'contact.form.submit': 'Trimite Mesajul',
    
    // Footer
    'footer.hours': 'Program',
    'footer.hours.mon': 'Lu: 08:00 - 18:00',
    'footer.hours.tue': 'Ma: 08:00 - 18:00',
    'footer.hours.wed': 'Mi: 08:00 - 13:00',
    'footer.hours.thu': 'Jo: 08:00 - 18:00',
    'footer.hours.fri': 'Vi: 08:00 - 18:00',
    'footer.hours.sat': 'Sâ: 08:00 - 18:00',
    'footer.hours.sun': 'Du: Închis',
    'footer.links': 'Link-uri Rapide',
    'footer.connect': 'Urmărește-ne',
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
