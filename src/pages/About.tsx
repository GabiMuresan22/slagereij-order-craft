import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Over Slagereij John
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
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-foreground">
            Onze Waarden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-serif font-semibold mb-3">Kwaliteit</h3>
                <p className="text-muted-foreground">
                  Alleen het beste vlees van vertrouwde, lokale leveranciers komt bij ons in de winkel
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-serif font-semibold mb-3">Passie</h3>
                <p className="text-muted-foreground">
                  Ons ambacht zit in ons bloed. Elke dag bereiden we met liefde en toewijding
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-serif font-semibold mb-3">Gemeenschap</h3>
                <p className="text-muted-foreground">
                  We kennen onze klanten bij naam en staan altijd klaar met advies en een glimlach
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-center text-foreground">
                Ons Team
              </h2>
              <p className="text-lg text-center text-foreground/90 leading-relaxed">
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
