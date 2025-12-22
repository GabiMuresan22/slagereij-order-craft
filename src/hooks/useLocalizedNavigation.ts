import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export type Language = 'nl' | 'ro';

export const SUPPORTED_LANGUAGES: Language[] = ['nl', 'ro'];
export const DEFAULT_LANGUAGE: Language = 'nl';

/**
 * Extracts the language prefix from a pathname.
 * Returns the language and the path without the language prefix.
 */
export function parseLocalizedPath(pathname: string): { lang: Language; path: string } {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0] as Language)) {
    const lang = segments[0] as Language;
    const path = '/' + segments.slice(1).join('/') || '/';
    return { lang, path };
  }
  
  // No language prefix - default to Dutch
  return { lang: DEFAULT_LANGUAGE, path: pathname || '/' };
}

/**
 * Builds a localized path with the appropriate language prefix.
 * Dutch (default) has no prefix, Romanian uses /ro prefix.
 */
export function buildLocalizedPath(path: string, lang: Language): string {
  // Normalize the path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Dutch is default - no prefix
  if (lang === 'nl') {
    return normalizedPath;
  }
  
  // Other languages get a prefix
  return `/${lang}${normalizedPath === '/' ? '' : normalizedPath}`;
}

/**
 * Hook for language-aware navigation.
 */
export function useLocalizedNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { lang: currentLang, path: currentPath } = parseLocalizedPath(location.pathname);
  
  /**
   * Navigate to a path in the current language
   */
  const navigateTo = useCallback((path: string) => {
    const localizedPath = buildLocalizedPath(path, currentLang);
    navigate(localizedPath);
  }, [navigate, currentLang]);
  
  /**
   * Switch to a different language, keeping the current path
   */
  const switchLanguage = useCallback((newLang: Language) => {
    const newPath = buildLocalizedPath(currentPath, newLang);
    navigate(newPath, { replace: true });
  }, [navigate, currentPath]);
  
  /**
   * Get a localized href for Link components
   */
  const getLocalizedHref = useCallback((path: string): string => {
    return buildLocalizedPath(path, currentLang);
  }, [currentLang]);
  
  return {
    currentLang,
    currentPath,
    navigateTo,
    switchLanguage,
    getLocalizedHref,
  };
}
