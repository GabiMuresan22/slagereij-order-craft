import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Mail, Phone, MapPin, Scale, ShieldAlert, ExternalLink } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const TermsIdentitySection = ({ t }: { t: (key: string) => string }) => (
  <Card className="mb-8 border-primary/20">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Scale className="w-5 h-5 text-primary" />
        {t('terms.identity.title')}
      </CardTitle>
    </CardHeader>
    <CardContent className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
      <p>{t('terms.identity.name')}</p>
      <p>{t('terms.identity.vat')}</p>
      <p>{t('terms.identity.kbo')}</p>
      <p>{t('terms.identity.address')}</p>
      <p>{t('terms.identity.email')}</p>
      <p>{t('terms.identity.phone')}</p>
    </CardContent>
  </Card>
);

const TermsListSection = ({ t, sectionKey, items }: { t: (key: string) => string; sectionKey: string; items: string[] }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-serif font-semibold mb-4">
      {t(`terms.${sectionKey}.title`)}
    </h2>
    {t(`terms.${sectionKey}.desc`) !== `terms.${sectionKey}.desc` && (
      <p className="text-muted-foreground leading-relaxed mb-4">
        {t(`terms.${sectionKey}.desc`)}
      </p>
    )}
    {items.length > 0 && (
      <ul className="space-y-3 ml-6">
        {items.map((item, i) => (
          <li key={i} className="text-muted-foreground list-disc">
            {t(`terms.${sectionKey}.item${i + 1}`)}
          </li>
        ))}
      </ul>
    )}
  </section>
);

const Terms = () => {
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('nl-BE', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Voorwaarden", url: "/terms" },
  ]);

  return (
    <>
      <SEO
        title={t('terms.title')}
        description={t('terms.subtitle')}
        structuredData={breadcrumbData}
      />
      
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {t('terms.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('terms.updated')}: {currentDate}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <section className="mb-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('terms.intro')}
            </p>
          </section>

          <TermsIdentitySection t={t} />

          <TermsListSection t={t} sectionKey="orders" items={['1','2','3','4']} />
          <TermsListSection t={t} sectionKey="payment" items={['1','2','3','4']} />
          <TermsListSection t={t} sectionKey="pickup" items={['1','2','3','4']} />

          {/* Fresh Food / Withdrawal - highlighted */}
          <section className="mb-10 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-amber-600" />
              {t('terms.freshfood.title')}
            </h2>
            <p className="text-muted-foreground mb-4">{t('terms.freshfood.desc')}</p>
            <ul className="space-y-3 ml-6 mb-4">
              {['1','2','3'].map(i => (
                <li key={i} className="text-muted-foreground list-disc">{t(`terms.freshfood.item${i}`)}</li>
              ))}
            </ul>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-md">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 italic">
                {t('terms.freshfood.legal')}
              </p>
            </div>
          </section>

          <TermsListSection t={t} sectionKey="quality" items={[]} />

          {/* Allergens section */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-semibold mb-4">{t('terms.allergens.title')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t('terms.allergens.desc')}</p>
            <ul className="space-y-3 ml-6 mb-4">
              {['1','2','3','4'].map(i => (
                <li key={i} className="text-muted-foreground list-disc">{t(`terms.allergens.item${i}`)}</li>
              ))}
            </ul>
            <p className="text-sm text-primary">
              <Link to="/allergens" className="underline hover:no-underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {t('allergens.list.title')} →
              </Link>
            </p>
          </section>

          <TermsListSection t={t} sectionKey="liability" items={[]} />

          {/* Liability allergen warning */}
          <div className="mb-10 -mt-6 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900">
            <p className="text-amber-800 dark:text-amber-200 text-sm font-medium leading-relaxed">
              ⚠️ {t('terms.liability.allergens')}
            </p>
          </div>

          {/* Disputes */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-semibold mb-4">{t('terms.disputes.title')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">{t('terms.disputes.desc')}</p>
            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-primary underline hover:no-underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              {t('terms.disputes.odr')}
            </a>
          </section>

          <Separator className="my-8" />

          {/* Contact */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">{t('terms.contact.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('terms.contact.desc')}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@slagerij-john.be" className="text-primary hover:underline">info@slagerij-john.be</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+32466186457" className="text-primary hover:underline">+32 466 18 64 57</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Bruggestraat 146A<br />8750 Zwevezele, België</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms;
