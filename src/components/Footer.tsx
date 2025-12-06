import { MapPin, Phone, Clock, Facebook, Clapperboard, MapPinned } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useBusinessHours } from "@/hooks/useBusinessHours";

const Footer = () => {
  const { t } = useLanguage();
  const { isOpen } = useBusinessHours();

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // Convert Sunday(0) to 6, Monday(1) to 0, etc.

  return (
    <footer className="bg-background text-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  {t('contact.address.street')}<br />
                  {t('contact.address.city')}, {t('contact.address.country')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="tel:+32466186457" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                  +32 466 18 64 57
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('nav.home')}
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('nav.about')}
              </Link>
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('nav.products')}
              </Link>
              <Link to="/catering" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('nav.catering')}
              </Link>
              <Link to="/order" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('nav.order')}
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Opening Hours */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {t('footer.hours')}
              </h3>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isOpen 
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                    : 'bg-red-500/20 text-red-600 dark:text-red-400'
                }`}
              >
                {isOpen ? t('footer.status.open') : t('footer.status.closed')}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              {days.map((day, index) => (
                <div 
                  key={day} 
                  className={`flex justify-between ${index === todayIndex ? 'font-bold text-foreground' : 'text-muted-foreground'}`}
                >
                  <span>{t(`footer.hours.day.${day}`)}</span>
                  <span>{t(`footer.hours.time.${day}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About & Social Media */}
          <div>
            <div className="mb-6">
              <img src={logo} alt={t('footer.about.title')} className="h-16 w-auto brightness-0 invert dark:brightness-100 dark:invert-0" />
            </div>
            <p className="text-sm leading-relaxed mb-8 text-muted-foreground italic">
              {t('footer.about.desc')}
            </p>
            
            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">{t('footer.social')}</h4>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61560710702910" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@traiteur.john" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="TikTok"
                >
                  <Clapperboard className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.google.com/maps/place/Bruggestraat+146A,+8750+Zwevezele"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Google Maps"
                >
                  <MapPinned className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p>&copy; {new Date().getFullYear()} {t('footer.about.title')}. {t('footer.rights')}</p>
              <a 
                href="https://gabimuresan.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {t('footer.credit')}
              </a>
            </div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors min-h-[48px] flex items-center">
                {t('footer.terms')}
              </Link>
              <button 
                type="button"
                data-cc="c-settings"
                className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center"
                aria-label={t('footer.cookies')}
              >
                {t('footer.cookies')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
