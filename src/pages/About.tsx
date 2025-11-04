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
            Al meer dan 35 jaar uw vertrouwde adres voor vers vlees en huisgemaakte specialiteiten
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
                  In 1985 opende John zijn eerste slagerij in het hart van Leuven. 
                  Met een passie voor kwaliteit en een diep respect voor het ambacht, 
                  bouwde hij een reputatie op die generaties overstijgt.
                </p>
                <p>
                  Vandaag de dag blijven we trouw aan onze roots: traditionele bereidingen, 
                  persoonlijke service en een onwrikbare toewijding aan kwaliteit. We werken 
                  samen met lokale boeren die dezelfde waarden delen en zorgen ervoor dat 
                  elk stuk vlees aan onze hoge standaarden voldoet.
                </p>
                <p>
                  Of u nu op zoek bent naar een perfect stuk biefstuk voor een bijzondere 
                  gelegenheid of onze beroemde huisgemaakte worst voor een gezellig BBQ, 
                  bij Slagereij John vindt u altijd wat u zoekt.
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
                Ons ervaren team van slagers staat klaar om u te helpen met advies, 
                speciale wensen of simpelweg een praatje. We kennen ons vak door en door 
                en delen graag onze kennis over de beste bereidingswijzen en recepten. 
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
