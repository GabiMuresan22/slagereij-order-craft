import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-butcher.jpg";
import Testimonials from "@/components/Testimonials";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

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
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary-foreground mb-6">
            Kwaliteitsvlees
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 font-light">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/order">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
              {t('home.hero.cta')}
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
                <h3 className="text-xl font-serif font-semibold mb-3">{t('home.features.online.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.features.online.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-serif font-semibold mb-3">{t('home.features.quality.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.features.quality.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-serif font-semibold mb-3">{t('home.features.fresh.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.features.fresh.desc')}
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
            {t('home.specials.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-primary/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-3 text-primary">
                  {t('home.specials.steak.title')}
                </h3>
                <p className="text-3xl font-bold text-accent mb-2">{t('home.specials.steak.price')}</p>
                <p className="text-muted-foreground mb-4">
                  {t('home.specials.steak.desc')}
                </p>
                <Link to="/order">
                  <Button className="w-full">{t('home.specials.order')}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-3 text-primary">
                  {t('home.specials.sausage.title')}
                </h3>
                <p className="text-3xl font-bold text-accent mb-2">{t('home.specials.sausage.price')}</p>
                <p className="text-muted-foreground mb-4">
                  {t('home.specials.sausage.desc')}
                </p>
                <Link to="/order">
                  <Button className="w-full">{t('home.specials.order')}</Button>
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
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                {t('home.cta.orderBtn')}
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t('home.cta.productsBtn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
