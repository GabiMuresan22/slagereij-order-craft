import { MapPin, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-accent text-accent-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  {t('contact.address.street')}<br />
                  {t('contact.address.city')}, {t('contact.address.country')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+32123456789" className="text-sm hover:underline">
                  +32 12 34 56 789
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">{t('footer.hours')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{t('footer.hours.mon')}</p>
                  <p>{t('footer.hours.tue')}</p>
                  <p>{t('footer.hours.wed')}</p>
                  <p>{t('footer.hours.thu')}</p>
                  <p>{t('footer.hours.fri')}</p>
                  <p>{t('footer.hours.sat')}</p>
                  <p>{t('footer.hours.sun')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">{t('footer.about.title')}</h3>
            <p className="text-sm leading-relaxed">
              {t('footer.about.desc')}
            </p>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t('footer.about.title')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
