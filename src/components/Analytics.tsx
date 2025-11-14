import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 tracking component
export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if GA4 measurement ID is configured
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    
    if (!measurementId || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    // Track page views on route change
    window.gtag('config', measurementId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

// Custom event tracking functions
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  
  if (!measurementId || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventParams);
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
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}
