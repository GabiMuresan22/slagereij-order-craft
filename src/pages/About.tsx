import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import shopInterior from "@/assets/shop-interior.jpg";
import meatDisplay from "@/assets/meat-display.jpg";
import teamWorking from "@/assets/team-working.jpg";

const About = () => {
  const { t } = useLanguage();

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Over Ons', url: '/about' }
  ]);

  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Over Ons"
        description="Ontdek het verhaal achter Slagerij John. Een unieke mix van Belgische en Roemeense specialiteiten, gedreven door passie voor kwaliteitsvlees en persoonlijke service in Zwevezele."
        keywords="over ons, slagerij geschiedenis, Belgisch-Roemeens, kwaliteit vlees, ambachtelijk"
        structuredData={breadcrumbData}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Tagline Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-8 md:p-12 text-center">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                {t('about.tagline')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-border">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-foreground">
                {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
                <p>
                  {t('about.story.p1')}
                </p>
                <p className="italic border-l-4 border-primary pl-4 text-foreground/80">
                  {t('about.story.p2')}
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
                <h3 className="text-2xl font-bold mb-3">{t('about.values.experience.title')}</h3>
                <p className="text-foreground/80">
                  {t('about.values.experience.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow bg-muted/30">
              <CardContent className="p-8">
                <Globe className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">{t('about.values.culture.title')}</h3>
                <p className="text-foreground/80">
                  {t('about.values.culture.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow bg-muted/30">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">{t('about.values.local.title')}</h3>
                <p className="text-foreground/80">
                  {t('about.values.local.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-8 text-primary">
            {t('about.specialties.title')}
          </h2>
          <Card className="border-border">
            <CardContent className="p-8">
              <p className="text-lg font-semibold mb-6">
                {t('about.specialties.intro')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span className="text-foreground">{t('about.specialties.item1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-3">•</span>
                  <span className="text-foreground">{t('about.specialties.item2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span className="text-foreground">{t('about.specialties.item3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground font-bold mr-3">•</span>
                  <span className="text-foreground">{t('about.specialties.item4')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground font-bold mr-3">•</span>
                  <span className="text-foreground">{t('about.specialties.item5')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-8 text-primary text-center">
            {t('about.gallery.title')}
          </h2>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <Card className="border-border overflow-hidden">
                  <img 
                    src={shopInterior} 
                    alt="Slagerij John shop interior" 
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="border-border overflow-hidden">
                  <img 
                    src={meatDisplay} 
                    alt="Fresh meat display" 
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="border-border overflow-hidden">
                  <img 
                    src={teamWorking} 
                    alt="Team working at Slagerij John" 
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-primary">
            {t('about.team.title')}
          </h2>
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                {t('about.team.names')}
              </h3>
              <p className="text-muted-foreground text-lg mb-6">{t('about.team.role')}</p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {t('about.team.desc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
