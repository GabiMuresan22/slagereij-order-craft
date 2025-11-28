import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 tracking component
export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if GA4 measurement ID is configured and analytics consent is given
    // Use environment variable if set, otherwise use default tracking ID
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XGNKV7Y3EY';
    
    if (!measurementId || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    // Check for analytics consent using vanilla-cookieconsent
    const checkConsent = async () => {
      try {
        const cc = await import('vanilla-cookieconsent');
        if (cc.acceptedCategory && cc.acceptedCategory('analytics')) {
          // Track page views on route change
          window.gtag('config', measurementId, {
            page_path: location.pathname + location.search,
            page_title: document.title,
          });
        }
      } catch (error) {
        console.warn('Cookie consent not available:', error);
      }
    };

    checkConsent();
  }, [location]);

  return null;
};

// Custom event tracking functions
export const trackEvent = async (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  // Use environment variable if set, otherwise use default tracking ID
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XGNKV7Y3EY';
  
  if (!measurementId || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  // Check for analytics consent
  try {
    const cc = await import('vanilla-cookieconsent');
    if (cc.acceptedCategory && cc.acceptedCategory('analytics')) {
      window.gtag('event', eventName, eventParams);
    }
  } catch (error) {
    console.warn('Cookie consent not available:', error);
  }
};

// Predefined tracking events for common actions
export const trackOrderSubmit = (orderDetails: {
  items: number;
  pickupDate: string;
}) => {
  trackEvent('order_submit', {
    event_category: 'engagement',
    event_label: 'Order Form Submission',
    value: orderDetails.items,
    pickup_date: orderDetails.pickupDate,
  });
};

export const trackProductView = (productName: string) => {
  trackEvent('view_item', {
    event_category: 'engagement',
    event_label: productName,
  });
};

export const trackMenuDownload = () => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: 'Christmas Menu PDF',
    file_name: 'christmas-menu.pdf',
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    event_category: 'engagement',
    event_label: `Changed to ${language}`,
    language: language,
  });
};

export const trackContactClick = (method: 'phone' | 'email' | 'whatsapp') => {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: `Contact via ${method}`,
    contact_method: method,
  });
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}
