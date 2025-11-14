import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Clock, Award, Download } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/hero-charcuterie.jpg";
import christmasMenu1 from "@/assets/christmas-menu-1.jpg";
import christmasMenu2 from "@/assets/christmas-menu-2.jpg";
import Testimonials from "@/components/Testimonials";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getLocalBusinessSchema, getReviewsSchema } from "@/lib/structuredData";

const Home = () => {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      toast.info('PDF wordt gegenereerd...');

      // Convert images to base64
      const imageToBase64 = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      const [image1Base64, image2Base64] = await Promise.all([
        imageToBase64(christmasMenu1),
        imageToBase64(christmasMenu2)
      ]);

      // Call the edge function with base64 data
      const { data, error } = await supabase.functions.invoke('generate-christmas-menu-pdf', {
        body: { image1Base64, image2Base64 },
      });

      if (error) throw error;

      // Create blob from response
      const blob = new Blob([data], { type: 'application/pdf' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Menu-Kerst-Nieuwjaar-Slagerij-John.pdf';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('PDF gedownload!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Fout bij downloaden van PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const structuredData = [
    getLocalBusinessSchema(),
    getReviewsSchema()
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Premium Kwaliteitsvlees"
        description="Slagerij John in Zwevezele biedt premium kwaliteitsvlees, huisgemaakte specialiteiten en online bestellen. Belgische en Roemeense vleeswaren van topkwaliteit."
        keywords="slagerij, kwaliteitsvlees, Zwevezele, online bestellen, huisgemaakte worst, BBQ vlees, verse vleeswaren"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section 
        className="relative h-[500px] md:h-[600px] flex items-start justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay - dark to transparent from top to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-transparent" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mt-8 md:mt-16">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
          >
            {t('home.hero.title')}
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white mb-6 md:mb-8 font-light"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
          >
            {t('home.hero.subtitle')}
          </p>
          <Link to="/order">
            <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-semibold">
              {t('home.hero.cta')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Christmas Menu Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-foreground">
            Menu Kerst Nieuwjaar
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            November - December - Januari
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-primary/20">
              <CardContent className="p-0">
                <img 
                  src={christmasMenu1} 
                  alt="Menu Kerst Nieuwjaar - Tapas en Desserts"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-primary/20">
              <CardContent className="p-0">
                <img 
                  src={christmasMenu2} 
                  alt="Menu Kerst Nieuwjaar - Hapjes en Hoofdgerechten"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Voor meer info verwelkomen we uw graag in onze winkel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="text-lg px-8 py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                {isDownloading ? 'Downloaden...' : 'Download PDF Menu'}
              </Button>
              <Link to="/order">
                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  {t('home.hero.cta')}
                </Button>
              </Link>
            </div>
          </div>
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
