import { useCallback, useRef, useEffect } from 'react';

type AriaLive = 'polite' | 'assertive' | 'off';

/**
 * Hook to announce messages to screen readers using a live region
 * Creates an invisible live region and updates it with announcements
 */
export function useAnnounce() {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the live region element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('role', 'status');
    announcer.className = 'sr-only';
    announcer.id = 'sr-announcer';
    
    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current);
      }
    };
  }, []);

  const announce = useCallback((message: string, priority: AriaLive = 'polite') => {
    if (!announcerRef.current) return;
    
    // Update aria-live based on priority
    announcerRef.current.setAttribute('aria-live', priority);
    
    // Clear and set message (this triggers the announcement)
    announcerRef.current.textContent = '';
    
    // Use setTimeout to ensure the DOM update triggers the announcement
    setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = message;
      }
    }, 100);
  }, []);

  return { announce };
}
