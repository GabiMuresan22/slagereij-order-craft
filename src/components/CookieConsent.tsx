import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { config } from '@/lib/cookie-consent-config';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookieConsentBanner() {
  const { language } = useLanguage();

  useEffect(() => {
    // Initialize cookie consent
    CookieConsent.run(config as any);
  }, []);

  useEffect(() => {
    // Update language when it changes
    if (CookieConsent.setLanguage) {
      CookieConsent.setLanguage(language);
    }
  }, [language]);

  return null; // The library injects its own HTML
}
