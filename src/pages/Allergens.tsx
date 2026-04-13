import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Info, Phone, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';

const ALLERGEN_KEYS = [
  'gluten', 'crustaceans', 'eggs', 'fish',
  'peanuts', 'soy', 'milk', 'nuts',
  'celery', 'mustard', 'sesame', 'sulphites',
  'lupin', 'molluscs'
] as const;

// Allergen presence per category: ✓ = present, ~ = traces possible (PAL), empty = not expected
const ALLERGEN_MATRIX: Record<string, Record<string, string>> = {
  freshMeat:  { gluten: '~', crustaceans: '', eggs: '~', fish: '', peanuts: '', soy: '~', milk: '~', nuts: '~', celery: '~', mustard: '~', sesame: '~', sulphites: '~', lupin: '', molluscs: '' },
  marinades:  { gluten: '✓', crustaceans: '', eggs: '~', fish: '', peanuts: '~', soy: '✓', milk: '~', nuts: '~', celery: '✓', mustard: '✓', sesame: '✓', sulphites: '✓', lupin: '', molluscs: '' },
  sausages:   { gluten: '✓', crustaceans: '', eggs: '✓', fish: '', peanuts: '~', soy: '✓', milk: '✓', nuts: '~', celery: '✓', mustard: '✓', sesame: '~', sulphites: '✓', lupin: '~', molluscs: '' },
  prepared:   { gluten: '✓', crustaceans: '~', eggs: '✓', fish: '~', peanuts: '~', soy: '✓', milk: '✓', nuts: '~', celery: '✓', mustard: '✓', sesame: '~', sulphites: '✓', lupin: '~', molluscs: '~' },
  gourmet:    { gluten: '✓', crustaceans: '', eggs: '✓', fish: '', peanuts: '~', soy: '✓', milk: '✓', nuts: '~', celery: '✓', mustard: '✓', sesame: '~', sulphites: '✓', lupin: '', molluscs: '' },
  bread:      { gluten: '✓', crustaceans: '', eggs: '✓', fish: '', peanuts: '~', soy: '~', milk: '✓', nuts: '~', celery: '~', mustard: '✓', sesame: '✓', sulphites: '~', lupin: '', molluscs: '' },
};

const CATEGORY_KEYS = Object.keys(ALLERGEN_MATRIX);

const Allergens = () => {
  const { t } = useLanguage();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Allergenen", url: "/allergens" },
  ]);

  return (
    <>
      <SEO
        title={t('allergens.title')}
        description={t('allergens.subtitle')}
        structuredData={breadcrumbData}
      />

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              {t('allergens.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('allergens.subtitle')}
            </p>
          </div>

          {/* Disclaimer */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Info className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg">{t('allergens.disclaimer.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-foreground/80">{t('allergens.disclaimer.text')}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Cross Contamination */}
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                {t('allergens.risk.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{t('allergens.risk.text')}</p>
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">{t('allergens.risk.warning')}</p>
              </div>
            </div>

            {/* Policy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                {t('allergens.policy.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{t('allergens.policy.text')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                <li>{t('allergens.policy.item1')}</li>
                <li>{t('allergens.policy.item2')}</li>
                <li>{t('allergens.policy.item3')}</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          {/* 14 Allergens Grid */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">{t('allergens.list.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {ALLERGEN_KEYS.map((allergen) => (
                <div key={allergen} className="flex items-center gap-2 p-3 bg-card rounded-md border shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary/60" />
                  <span>{t(`allergens.item.${allergen}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Allergen Matrix per Product Category */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-semibold mb-2 text-center flex items-center justify-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              {t('allergens.matrix.title')}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">{t('allergens.matrix.subtitle')}</p>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-2 sm:p-3 font-semibold border-b min-w-[140px]">{t('allergens.matrix.category')}</th>
                    {ALLERGEN_KEYS.map(a => (
                      <th key={a} className="p-1 sm:p-2 text-center font-medium border-b whitespace-nowrap" title={t(`allergens.item.${a}`)}>
                        <span className="hidden md:inline">{t(`allergens.item.${a}`)}</span>
                        <span className="md:hidden">{t(`allergens.item.${a}`).slice(0, 3)}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CATEGORY_KEYS.map((cat, idx) => (
                    <tr key={cat} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="p-2 sm:p-3 font-medium border-b">{t(`allergens.matrix.${cat}`)}</td>
                      {ALLERGEN_KEYS.map(a => (
                        <td key={a} className="p-1 sm:p-2 text-center border-b">
                          {ALLERGEN_MATRIX[cat][a] === '✓' && <span className="text-red-600 font-bold">✓</span>}
                          {ALLERGEN_MATRIX[cat][a] === '~' && <span className="text-amber-500">~</span>}
                          {ALLERGEN_MATRIX[cat][a] === '' && <span className="text-muted-foreground/30">–</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Category notes */}
            <div className="mt-6 space-y-3">
              {CATEGORY_KEYS.map(cat => (
                <div key={cat} className="text-sm">
                  <span className="font-medium">{t(`allergens.matrix.${cat}`)}:</span>{' '}
                  <span className="text-muted-foreground">{t(`allergens.matrix.${cat}.note`)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Responsibility */}
          <Card className="mb-8 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <CardTitle className="text-lg">{t('allergens.responsibility.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/80 leading-relaxed">{t('allergens.responsibility.text')}</p>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">{t('allergens.responsibility.warning')}</p>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-muted p-8 rounded-xl text-center">
            <h3 className="text-2xl font-serif font-semibold mb-4">{t('allergens.contact.title')}</h3>
            <p className="text-muted-foreground mb-6">{t('allergens.contact.text')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <a href="tel:+32466186457" className="gap-2">
                  <Phone className="w-4 h-4" />
                  {t('contact.phone.title')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">{t('nav.contact')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allergens;
