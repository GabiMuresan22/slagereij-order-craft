import { MapPin, Phone, Clock, Facebook, Clapperboard, MapPinned } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/LocalizedLink";
import logo from "@/assets/logo.svg";
import tooGoodToGoLogo from "@/assets/too-good-to-go-logo.jpg";
import { useBusinessHours } from "@/hooks/useBusinessHours";

const Footer = () => {
  const { t } = useLanguage();
  const { isOpen } = useBusinessHours();

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // Convert Sunday(0) to 6, Monday(1) to 0, etc.

  return (
    <footer 
      className="bg-background text-foreground mt-20"
      role="contentinfo"
      aria-label={t('accessibility.siteFooter') || 'Site footer'}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6" id="footer-contact">{t('footer.contact')}</h3>
            <address className="space-y-4 not-italic" aria-labelledby="footer-contact">
              <a 
                href="https://www.google.be/maps/dir/?api=1&destination=Bruggestraat+146A,+8750+Zwevezele,+Belgium"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-primary transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                aria-label={`${t('contact.address.street')}, ${t('contact.address.city')} - ${t('accessibility.openInMaps') || 'Open in Google Maps'}`}
              >
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm text-muted-foreground group-hover:text-primary">
                  {t('contact.address.street')}<br />
                  {t('contact.address.city')}, {t('contact.address.country')}
                </p>
              </a>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <a 
                  href="tel:+32466186457" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  aria-label={t('accessibility.callPhone') || 'Call phone number +32 466 18 64 57'}
                >
                  +32 466 18 64 57
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6" id="footer-links">{t('footer.quickLinks')}</h3>
            <nav className="space-y-2" aria-labelledby="footer-links">
              <LocalizedLink to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
                {t('nav.home')}
              </LocalizedLink>
              <LocalizedLink to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
                {t('nav.about')}
              </LocalizedLink>
              <LocalizedLink to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
                {t('nav.products')}
              </LocalizedLink>
              <LocalizedLink to="/catering" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
                {t('nav.catering')}
              </LocalizedLink>
              <LocalizedLink to="/order" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
                {t('nav.order')}
              </LocalizedLink>
              <LocalizedLink to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md">
                {t('nav.contact')}
              </LocalizedLink>
            </nav>
          </div>

          {/* Opening Hours */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-semibold flex items-center gap-2" id="footer-hours">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                {t('footer.hours')}
              </h3>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isOpen 
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                    : 'bg-red-500/20 text-red-600 dark:text-red-400'
                }`}
                role="status"
                aria-live="polite"
              >
                {isOpen ? t('footer.status.open') : t('footer.status.closed')}
              </span>
            </div>
            <dl className="space-y-3 text-sm" aria-labelledby="footer-hours">
              {days.map((day, index) => (
                <div 
                  key={day} 
                  className={`flex justify-between ${index === todayIndex ? 'font-bold text-foreground' : 'text-muted-foreground'}`}
                >
                  <dt>{t(`footer.hours.day.${day}`)}</dt>
                  <dd>{t(`footer.hours.time.${day}`)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* About & Social Media */}
          <div>
            <div className="mb-6">
              <img 
                src={logo} 
                alt="" 
                aria-hidden="true"
                className="h-16 w-auto brightness-0 invert dark:brightness-100 dark:invert-0" 
              />
            </div>
            <p className="text-sm leading-relaxed mb-8 text-muted-foreground italic">
              {t('footer.about.desc')}
            </p>
            
            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4" id="footer-social">{t('footer.social')}</h4>
              <div className="flex items-center gap-4" role="list" aria-labelledby="footer-social">
                <a 
                  href="https://www.facebook.com/profile.php?id=61560710702910" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Facebook - ${t('accessibility.openNewTab') || 'Opens in new tab'}`}
                  role="listitem"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://www.tiktok.com/@traiteur.john" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`TikTok - ${t('accessibility.openNewTab') || 'Opens in new tab'}`}
                  role="listitem"
                >
                  <Clapperboard className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://www.google.be/maps/dir/?api=1&destination=Bruggestraat+146A,+8750+Zwevezele,+Belgium"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Google Maps - ${t('accessibility.openNewTab') || 'Opens in new tab'}`}
                  role="listitem"
                >
                  <MapPinned className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
            
            {/* Too Good To Go */}
            <div className="mt-6">
              <a 
                href="https://www.toogoodtogo.com/nl-be/find/wingene/slagerijjohn/meal/verassingspakket-114243663079363392" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                aria-label="Too Good To Go - Opens in new tab"
              >
                <img 
                  src={tooGoodToGoLogo} 
                  alt="Too Good To Go logo" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {t('footer.tooGoodToGo')}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 md:pt-10">
          {/* Local SEO Text */}
          <p className="text-xs text-muted-foreground/70 text-center mb-6 px-2">
            {t('footer.localSeo')}
          </p>
          
          <div className="flex flex-col items-center gap-6 text-sm text-muted-foreground">
            {/* Legal Links - Mobile optimized */}
            <nav 
              className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm" 
              aria-label={t('accessibility.legalLinks') || 'Legal links'}
            >
              <LocalizedLink to="/privacy" className="hover:text-primary transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1">
                {t('footer.privacy')}
              </LocalizedLink>
              <LocalizedLink to="/terms" className="hover:text-primary transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1">
                {t('footer.terms')}
              </LocalizedLink>
              <LocalizedLink to="/allergens" className="hover:text-primary transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1">
                {t('footer.allergens')}
              </LocalizedLink>
              <button 
                type="button"
                data-cc="show-preferencesModal"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1"
                aria-label={t('footer.cookies')}
              >
                {t('footer.cookies')}
              </button>
            </nav>
            
            {/* Copyright */}
            <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground/70">
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
          </div>
        </div>
      </div>
      
      {/* Spacer for mobile sticky CTA */}
      <div className="h-[60px] lg:hidden" aria-hidden="true" />
    </footer>
  );
};

export default Footer;
