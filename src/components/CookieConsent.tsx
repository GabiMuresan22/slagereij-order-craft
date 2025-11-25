import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { config } from '@/lib/cookie-consent-config';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookieConsentBanner() {
  const { language } = useLanguage();

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Initialize cookie consent after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      CookieConsent.run(config as any);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update language when it changes
    if (typeof window !== 'undefined' && CookieConsent.setLanguage) {
      CookieConsent.setLanguage(language);
    }
  }, [language]);

  return null; // The library injects its own HTML
}
