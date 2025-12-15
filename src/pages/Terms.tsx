import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Mail, Phone, MapPin } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";

const Terms = () => {
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('nl-BE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
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
        {/* Header */}
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

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('terms.intro')}
            </p>
          </section>

          {/* Orders */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.orders.title')}
            </h2>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('terms.orders.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.orders.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.orders.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.orders.item4')}
              </li>
            </ul>
          </section>

          {/* Payment */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.payment.title')}
            </h2>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('terms.payment.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.payment.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.payment.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.payment.item4')}
              </li>
            </ul>
          </section>

          {/* Pickup */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.pickup.title')}
            </h2>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('terms.pickup.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.pickup.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.pickup.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.pickup.item4')}
              </li>
            </ul>
          </section>

          {/* Product Quality */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.quality.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('terms.quality.desc')}
            </p>
          </section>

          {/* Right of Withdrawal */}
          <section className="mb-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.withdrawal.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('terms.withdrawal.desc')}
            </p>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('terms.withdrawal.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.withdrawal.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.withdrawal.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('terms.withdrawal.item4')}
              </li>
            </ul>
          </section>

          {/* Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.liability.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('terms.liability.desc')}
            </p>
            {/* Added Allergen Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium leading-relaxed">
                ⚠️ {t('terms.liability.allergens')}
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('terms.contact.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('terms.contact.desc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href="mailto:contact@slagerij-john.be" 
                  className="text-primary hover:underline"
                >
                  contact@slagerij-john.be
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:+32466186457" 
                  className="text-primary hover:underline"
                >
                  +32 466 18 64 57
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Bruggestraat 146A<br />
                  8750 Zwevezele, België
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms;
