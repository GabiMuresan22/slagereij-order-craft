import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Mail, Phone, MapPin } from "lucide-react";

const Privacy = () => {
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('nl-BE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <SEO
        title={t('privacy.title')}
        description={t('privacy.subtitle')}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {t('privacy.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('privacy.updated')}: {currentDate}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t('privacy.intro')}
            </p>
          </section>

          {/* Data Collection */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('privacy.collection.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.collection.desc')}
            </p>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('privacy.collection.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.collection.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.collection.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.collection.item4')}
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('privacy.usage.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.usage.desc')}
            </p>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('privacy.usage.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.usage.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.usage.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.usage.item4')}
              </li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('privacy.protection.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('privacy.protection.desc')}
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('privacy.rights.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.rights.desc')}
            </p>
            <ul className="space-y-3 ml-6">
              <li className="text-muted-foreground list-disc">
                {t('privacy.rights.item1')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.rights.item2')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.rights.item3')}
              </li>
              <li className="text-muted-foreground list-disc">
                {t('privacy.rights.item4')}
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-semibold mb-4">
              {t('privacy.contact.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('privacy.contact.desc')}
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

export default Privacy;
