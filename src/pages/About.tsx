import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Over Slagerij John
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De nieuwste culinaire aanwinst in Zwevezele
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-border">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-foreground">
                Ons Verhaal
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
                <p>
                  Welkom bij Slagerij John, de nieuwste culinaire aanwinst in Zwevezele! In de Bruggestraat 146A, 
                  waar vroeger bakkerij Choc-O-Fee en bakkerij Geert gevestigd waren, hebben Ion (John) Nistor (36) 
                  en zijn echtgenote Georgiana (31) hun droom waargemaakt met de opening van hun eigen slagerij.
                </p>
                <p className="italic border-l-4 border-primary pl-4 text-foreground/80">
                  "Eigenlijk heet ik Ion, maar iedereen noemt me John," legt de slager uit. "Ion is de Roemeense 
                  versie van die naam en toen we destijds naar België kwamen werd ik in de omgang heel snel John 
                  genoemd. Die naam is blijven plakken. Zelfs mijn vrouw noemt me zo!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow bg-muted/30">
              <CardContent className="p-8">
                <Award className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Ervaring & Passie</h3>
                <p className="text-foreground/80">
                  Al op 16-jarige leeftijd begon John zijn carrière in Roemenië, 
                  waar hij ervaring opdeed in slagerijen en slachthuizen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow bg-muted/30">
              <CardContent className="p-8">
                <Globe className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">Twee Culturen</h3>
                <p className="text-foreground/80">
                  Een unieke mix van Belgische en Roemeense specialiteiten, 
                  symbolisch vertegenwoordigd door onze ballonfiguren in beide nationale kleuren.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow bg-muted/30">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Lokale Verbondenheid</h3>
                <p className="text-foreground/80">
                  Al 8 jaar thuis in Zwevezele, waar het gezin met drie kinderen 
                  in de Laurierstraat woont en volledig ingeburgerd is.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-8 text-primary">
            Onze Specialiteiten
          </h2>
          <Card className="border-border">
            <CardContent className="p-8">
              <p className="text-lg font-semibold mb-6">
                In onze toonbank vindt u een breed assortiment aan:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span className="text-foreground">Klassieke Belgische vleeswaren en charcuterie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-3">•</span>
                  <span className="text-foreground">Traditionele bereide gerechten zoals stoofvlees en vol-au-vent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span className="text-foreground">Roemeense specialiteiten zoals 'Mici' (gekruide rundergehaktrolletjes)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground font-bold mr-3">•</span>
                  <span className="text-foreground">Verse belegde broodjes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground font-bold mr-3">•</span>
                  <span className="text-foreground">Huisgemaakte worsten van varkens- en rundsgrehakt</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-primary">
            Het Team achter Slagerij John
          </h2>
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Georgiana Nistor & Ion (John) Nistor
              </h3>
              <p className="text-muted-foreground text-lg mb-6">Eigenaars</p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Ion (John) en Georgiana staan klaar om u te helpen met advies, speciale wensen 
                of simpelweg een praatje. Met hun passie voor kwaliteitsvlees en persoonlijke 
                service delen ze graag hun kennis over de beste bereidingswijzen en recepten. 
                Kom gerust langs en maak kennis!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
