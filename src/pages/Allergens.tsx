import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Info, Phone, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Allergens = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            {t('allergens.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('allergens.subtitle')}
          </p>
        </div>

        {/* Main Warning / Disclaimer */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Info className="w-6 h-6 text-primary" />
            <CardTitle className="text-lg">{t('allergens.disclaimer.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-foreground/80">
              {t('allergens.disclaimer.text')}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Cross Contamination - Crucial for Butchers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              {t('allergens.risk.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('allergens.risk.text')}
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                {t('allergens.risk.warning')}
              </p>
            </div>
          </div>

          {/* Communication Policy */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              {t('allergens.policy.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('allergens.policy.text')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>{t('allergens.policy.item1')}</li>
              <li>{t('allergens.policy.item2')}</li>
              <li>{t('allergens.policy.item3')}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* The 14 Major Allergens */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center">{t('allergens.list.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              'gluten', 'crustaceans', 'eggs', 'fish', 
              'peanuts', 'soy', 'milk', 'nuts', 
              'celery', 'mustard', 'sesame', 'sulphites', 
              'lupin', 'molluscs'
            ].map((allergen) => (
              <div key={allergen} className="flex items-center gap-2 p-3 bg-card rounded-md border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary/60" />
                <span>{t(`allergens.item.${allergen}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-muted p-8 rounded-xl text-center">
          <h3 className="text-2xl font-serif font-semibold mb-4">{t('allergens.contact.title')}</h3>
          <p className="text-muted-foreground mb-6">
            {t('allergens.contact.text')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button asChild size="lg">
              <a href="tel:+32466186457" className="gap-2">
                <Phone className="w-4 h-4" />
                {t('contact.phone.title')}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                {t('nav.contact')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allergens;

