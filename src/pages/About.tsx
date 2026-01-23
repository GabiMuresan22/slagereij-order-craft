import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Beef, Flame, Sparkles } from "lucide-react";
import teamPortrait from "@/assets/team-portrait.webp"; 
import storefront from "@/assets/storefront.webp";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/LocalizedLink";

const About = () => {
  const { language } = useLanguage();
  
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Over Ons", url: "/about" },
  ]);

  return (
    <div className="min-h-screen bg-background pb-[60px] lg:pb-0">
      <SEO
        title={language === 'nl' 
          ? "Over Ons | Familieslagerij met Belgische & Roemeense Specialiteiten" 
          : "Despre Noi | Măcelărie Artizanală cu Specialități Românești"}
        description={language === 'nl' 
          ? "Maak kennis met Ion (John) en Georgiana, uw ambachtelijke slagers in Zwevezele. Belgische kwaliteit gecombineerd met Roemeense tradities. Mici, stoofvlees en meer!"
          : "Cunoașteți-i pe Ion (John) și Georgiana, măcelarii voștri artizanali din Zwevezele. Calitate belgiană combinată cu tradiții românești. Mici, cârnați și multe altele!"}
        keywords={language === 'nl'
          ? "over ons, slagerij Zwevezele, familieslagerij, ambachtelijk vlees, Roemeense specialiteiten, Mici, Ion John, kwaliteitsslager"
          : "despre noi, măcelărie Zwevezele, măcelărie de familie, carne artizanală, specialități românești, Mici, Ion John"}
        structuredData={breadcrumbData}
      />

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Header Section */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            {language === 'nl' 
              ? 'Ambacht en Passie in de Bruggestraat'
              : 'Meșteșug și Pasiune pe Bruggestraat'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === 'nl'
              ? 'Waar vroeger de geur van vers brood hing, proeft u nu de eerlijke smaak van kwaliteitsvlees. Welkom bij uw nieuwe familieslager in Zwevezele.'
              : 'Unde odinioară mirosea a pâine proaspătă, acum simțiți gustul autentic al cărnii de calitate. Bine ați venit la noua măcelărie de familie din Zwevezele.'}
          </p>
        </header>

        {/* Story Section */}
        <section className="mb-16 md:mb-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img 
                src={storefront} 
                alt="Slagerij John winkel in Bruggestraat Zwevezele"
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                {language === 'nl' 
                  ? 'Van Roemeense roots tot Zwevezeelse trots'
                  : 'De la rădăcini românești la mândria din Zwevezele'}
              </h2>
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  {language === 'nl'
                    ? 'In de Bruggestraat 146A, het vertrouwde pand van de vroegere bakkerij, hebben Ion (John) en zijn echtgenote Georgiana hun droom waargemaakt.'
                    : 'Pe strada Bruggestraat 146A, în clădirea de încredere a fostei brutării, Ion (John) și soția sa Georgiana și-au îndeplinit visul.'}
                </p>
                <p>
                  {language === 'nl'
                    ? '"Mijn naam is Ion, maar in de volksmond werd dat al snel John," vertelt de slager met een glimlach. "Die naam staat nu voor kwaliteit. Ik ben al sinds mijn 16de gepassioneerd door het slagersvak. Het is een stiel die je met liefde moet doen, of niet moet doen."'
                    : '"Numele meu este Ion, dar în limbajul popular a devenit rapid John," povestește măcelarul cu un zâmbet. "Acest nume reprezintă acum calitate. Sunt pasionat de meseria de măcelar încă de la 16 ani. Este o meserie pe care trebuie să o faci cu dragoste, sau să nu o faci deloc."'}
                </p>
                
                <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground">
                  {language === 'nl'
                    ? '"Wij wonen al 8 jaar met ons gezin in Zwevezele. We zijn trots dat we nu ook onze eigen zaak hier mogen openen voor onze buren."'
                    : '"Locuim cu familia noastră în Zwevezele de 8 ani. Suntem mândri că putem deschide acum propria noastră afacere aici, pentru vecinii noștri."'}
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="mb-16 md:mb-20 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                {language === 'nl' 
                  ? 'Het Beste van Twee Werelden'
                  : 'Cel Mai Bun din Două Lumi'}
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-8">
                {language === 'nl'
                  ? 'Bij Slagerij John kiezen we voor kwaliteit zonder compromissen. Voor de Belgische klant betekent dat: vertrouwd vlees van topkwaliteit, versneden zoals het hoort.'
                  : 'La Măcelăria John alegem calitatea fără compromisuri. Pentru clientul belgian, aceasta înseamnă: carne de încredere de cea mai bună calitate, tăiată cum trebuie.'}
              </p>
              
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Beef className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 max-w-md lg:max-w-none">
                    <h3 className="font-semibold text-foreground">
                      {language === 'nl' ? 'Belgische Klassiekers' : 'Clasice Belgiene'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'nl' 
                        ? 'Huisgemaakt stoofvlees, vol-au-vent en vers gehakt van de dag.'
                        : 'Tocăniță de casă, vol-au-vent și carne tocată proaspătă zilnic.'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 max-w-md lg:max-w-none">
                    <h3 className="font-semibold text-foreground">
                      {language === 'nl' ? 'Authentieke Ontdekkingen' : 'Descoperiri Autentice'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'nl'
                        ? "Proef onze specialiteit: de 'Mici' (gekruide gehaktrolletjes) – een aanrader voor op de BBQ!"
                        : "Gustați specialitatea noastră: Micii – o recomandare pentru grătar!"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 max-w-md lg:max-w-none">
                    <h3 className="font-semibold text-foreground">
                      {language === 'nl' ? 'Versheid Gegarandeerd' : 'Prospețime Garantată'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'nl'
                        ? 'Alles wordt met zorg en passie in eigen atelier bereid.'
                        : 'Totul este preparat cu grijă și pasiune în atelierul propriu.'}
                    </p>
                  </div>
                </li>
              </ul>

              <div className="flex justify-center lg:justify-start">
                <LocalizedLink to="/order">
                  <Button size="lg" className="w-full sm:w-auto">
                    {language === 'nl' ? 'Bekijk ons Aanbod' : 'Vezi Oferta Noastră'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-xl order-first md:order-last">
              <img 
                src={teamPortrait} 
                alt="John en Georgiana in de slagerij"
                className="w-full h-auto"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
          </div>
        </section>

        {/* Call to Action Footer */}
        <section className="text-center bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {language === 'nl' ? 'Kom eens langs in de winkel' : 'Vizitați-ne în magazin'}
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            {language === 'nl'
              ? 'Of u nu komt voor een pond gehakt of voor een uitgebreide gourmetschotel: bij ons wordt u altijd geholpen met een glimlach.'
              : 'Fie că veniți pentru o jumătate de kilogram de carne tocată sau pentru un platou gourmet complet: la noi sunteți întotdeauna întâmpinați cu un zâmbet.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink to="/contact">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {language === 'nl' ? 'Openingsuren & Adres' : 'Program & Adresă'}
              </Button>
            </LocalizedLink>
            <LocalizedLink to="/order">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                {language === 'nl' ? 'Bestel Online' : 'Comandă Online'}
              </Button>
            </LocalizedLink>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
