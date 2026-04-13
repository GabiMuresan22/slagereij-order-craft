import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin, Scale, Globe, Shield } from "lucide-react";

const LegalNotice = () => {
  const { t, language } = useLanguage();

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: t('legalNotice.title'), url: "/legal-notice" },
  ]);

  return (
    <div className="min-h-screen py-12">
      <SEO
        title={language === 'nl'
          ? "Juridische Kennisgeving | Slagerij John"
          : "Aviz Juridic | Măcelăria John"}
        description={language === 'nl'
          ? "Juridische kennisgeving en colofon van Slager John SComm. BTW BE 1012.585.374, KBO 1012.585.374."
          : "Aviz juridic și colofon al Slager John SComm. TVA BE 1012.585.374, KBO 1012.585.374."}
        structuredData={[breadcrumbData]}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">
            {t('legalNotice.heading')}
          </h1>
        </div>

        <div className="space-y-8">
          {/* Business Information */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-primary" />
                {t('legalNotice.businessInfo')}
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">{t('legalNotice.legalName')}</dt>
                  <dd className="text-muted-foreground">{t('legalNotice.legalNameValue')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('legalNotice.vat')}</dt>
                  <dd className="text-muted-foreground">{t('legalNotice.vatValue')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('legalNotice.kbo')}</dt>
                  <dd className="text-muted-foreground">{t('legalNotice.kboValue')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('legalNotice.address')}</dt>
                  <dd className="text-muted-foreground">{t('legalNotice.addressValue')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('legalNotice.email')}</dt>
                  <dd>
                    <a href="mailto:info@slagerij-john.be" className="text-primary hover:underline">
                      {t('legalNotice.emailValue')}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('legalNotice.phone')}</dt>
                  <dd>
                    <a href="tel:+32466186457" className="text-primary hover:underline">
                      {t('legalNotice.phoneValue')}
                    </a>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Responsible Publisher */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                {t('legalNotice.responsibility')}
              </h2>
              <p className="text-muted-foreground">{t('legalNotice.responsibilityValue')}</p>
            </CardContent>
          </Card>

          {/* Professional Association */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-primary" />
                {t('legalNotice.profession')}
              </h2>
              <p className="text-muted-foreground font-semibold mb-2">{t('legalNotice.professionValue')}</p>
              <p className="text-muted-foreground">{t('legalNotice.professionEthics')}</p>
            </CardContent>
          </Card>

          {/* Hosting */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                {t('legalNotice.hostingTitle')}
              </h2>
              <p className="text-muted-foreground">{t('legalNotice.hostingProvider')}</p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">{t('legalNotice.intellectual')}</h2>
              <p className="text-muted-foreground">{t('legalNotice.intellectualText')}</p>
            </CardContent>
          </Card>

          {/* Disputes */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">{t('legalNotice.disputes')}</h2>
              <p className="text-muted-foreground">{t('legalNotice.disputesText')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
