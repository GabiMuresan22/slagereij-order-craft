import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Updates the <html lang="..."> attribute dynamically based on the selected language.
 * This improves SEO and accessibility for multilingual sites.
 */
export const HtmlLangUpdater = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
};
