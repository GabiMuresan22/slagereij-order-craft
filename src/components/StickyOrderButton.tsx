import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Sticky order button that appears at the bottom of the screen on mobile devices
 * Provides easy access to the order page without scrolling
 */
export default function StickyOrderButton() {
  const { t } = useLanguage();
  const location = useLocation();
  
  // Hide the button on pages where it's not needed
  const hiddenPaths = ["/order", "/auth", "/admin", "/my-account"];
  const shouldHide = hiddenPaths.includes(location.pathname);
  
  if (shouldHide) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/98 backdrop-blur-md border-t border-border shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300">
      <Button
        asChild
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 min-h-[56px]"
      >
        <Link to="/order" className="flex items-center justify-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span>{t('nav.order')}</span>
        </Link>
      </Button>
    </div>
  );
}
