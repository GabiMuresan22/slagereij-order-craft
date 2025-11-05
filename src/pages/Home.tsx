import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-butcher.jpg";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-foreground mb-6">
            Kwaliteitsvlees
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light">
            Traditioneel ambacht met moderne service
          </p>
          <Link to="/order">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
              Bestel Nu Online
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-serif font-semibold mb-3">Online Bestellen</h3>
                <p className="text-muted-foreground">
                  Bestel gemakkelijk online en haal op wanneer het u uitkomt
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-serif font-semibold mb-3">Premium Kwaliteit</h3>
                <p className="text-muted-foreground">
                  Enkel het beste vlees van vertrouwde lokale leveranciers
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-serif font-semibold mb-3">Verse Bereiding</h3>
                <p className="text-muted-foreground">
                  Dagelijks vers bereid volgens traditionele recepten
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekly Specials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-foreground">
            Deze Week in de Aanbieding
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-primary/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-3 text-primary">
                  Biologische Biefstuk
                </h3>
                <p className="text-3xl font-bold text-accent mb-2">€18,99/kg</p>
                <p className="text-muted-foreground mb-4">
                  Premium biologische biefstuk van lokale boerderijen
                </p>
                <Link to="/order">
                  <Button className="w-full">Bestel Nu</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-3 text-primary">
                  Huisgemaakte Worst
                </h3>
                <p className="text-3xl font-bold text-accent mb-2">€12,50/kg</p>
                <p className="text-muted-foreground mb-4">
                  Volgens ons geheime familierecept gemaakt
                </p>
                <Link to="/order">
                  <Button className="w-full">Bestel Nu</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Klaar om te Bestellen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ontdek ons volledig assortiment en bestel vandaag nog voor afhaling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Online Bestellen
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Bekijk Producten
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
