import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Mail, Phone, MapPin, Building2, Server } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";

const LegalNotice = () => {
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: t('legalNotice.title'), url: "/legal-notice" },
  ]);

  return (
    <>
      <SEO
        title={t('legalNotice.title')}
        description={t('legalNotice.subtitle')}
        structuredData={breadcrumbData}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('legalNotice.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {t('legalNotice.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('legalNotice.updated')}: {currentDate}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('legalNotice.intro')}
            </p>
          </section>

          {/* Operator Identity */}
          <section className="mb-12 bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('legalNotice.operator.title')}
            </h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium">{t('legalNotice.operator.name')}</p>
              <p>{t('legalNotice.operator.form')}</p>
              <p>{t('legalNotice.operator.vat')}</p>
              <p>{t('legalNotice.operator.kbo')}</p>
              <p>{t('legalNotice.operator.address')}</p>
              <p>
                <a href="mailto:contact@slagerij-john.be" className="text-primary hover:underline">
                  contact@slagerij-john.be
                </a>
              </p>
              <p>
                <a href="tel:+32466186457" className="text-primary hover:underline">
                  +32 466 18 64 57
                </a>
              </p>
            </div>
          </section>

          {/* Hosting */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-2">
              <Server className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('legalNotice.hosting.title')}
            </h2>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('legalNotice.hosting.frontend')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('legalNotice.hosting.backend')}
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4 italic">
              {t('legalNotice.hosting.note')}
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('legalNotice.ip.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('legalNotice.ip.desc')}
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('legalNotice.disclaimer.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('legalNotice.disclaimer.desc')}
            </p>
          </section>

          {/* External Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('legalNotice.links.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('legalNotice.links.desc')}
            </p>
          </section>

          {/* Applicable Law */}
          <section className="mb-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('legalNotice.law.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('legalNotice.law.desc')}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('legalNotice.contact.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('legalNotice.contact.desc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                <a
                  href="mailto:contact@slagerij-john.be"
                  className="text-primary hover:underline"
                >
                  contact@slagerij-john.be
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                <a
                  href="tel:+32466186457"
                  className="text-primary hover:underline"
                >
                  +32 466 18 64 57
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
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

export default LegalNotice;
