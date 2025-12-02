import { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PremiumAlert = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    setIsVisible(false);
    // Clear any existing dismiss timer
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 500);
  };

  // Show alert on mount and when language changes
  useEffect(() => {
    // Reset dismissed state when language changes to show alert again
    setIsDismissed(false);
    setIsVisible(false);

    // Small delay to allow CSS transition to work
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-dismiss after 30 seconds
    dismissTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsDismissed(true);
      }, 500);
    }, 30000);

    return () => {
      clearTimeout(showTimer);
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = null;
      }
    };
  }, [language]); // Re-run when language changes

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`
        fixed left-0 w-full z-[99999]
        bg-neutral-900 border-b-2 border-primary
        text-white shadow-[0_4px_15px_rgba(0,0,0,0.6)]
        font-sans transition-[top] duration-500 ease-in-out
        ${isVisible ? 'top-0' : '-top-[100px]'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-5 py-3">
        <div className="flex items-center gap-4">
          <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
          <div className="flex flex-col md:flex-row md:items-center md:gap-3">
            <strong className="text-primary uppercase text-xs md:text-sm tracking-wider mb-0.5 md:mb-0">
              {t('home.alert.title')}
            </strong>
            <span className="text-[13px] md:text-sm text-neutral-100">
              {t('home.alert.description')}
            </span>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="bg-transparent border-none text-primary text-[28px] leading-none cursor-pointer px-2.5 ml-2.5 transition-colors duration-300 hover:text-white"
          aria-label="Close alert"
        >
          <X className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default PremiumAlert;
