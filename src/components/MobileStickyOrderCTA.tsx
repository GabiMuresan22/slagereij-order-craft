import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LocalizedLink from "@/components/LocalizedLink";

/**
 * Mobile-only sticky CTA button at the bottom of the viewport
 * Provides quick access to the order page on mobile devices
 */
const MobileStickyOrderCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
      <LocalizedLink
        to="/order"
        className="flex items-center justify-center gap-2 w-full h-[60px] bg-primary text-primary-foreground font-bold text-lg shadow-[0_-4px_20px_rgba(0,0,0,0.15)] hover:bg-primary/90 transition-colors"
        aria-label={t('nav.order')}
      >
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        <span>{t('nav.order')}</span>
      </LocalizedLink>
    </div>
  );
};

export default MobileStickyOrderCTA;
