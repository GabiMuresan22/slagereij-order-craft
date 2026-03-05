import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls the window to the top and resets focus whenever the route changes.
 * This ensures that when users navigate to a new page, they start at the top
 * rather than maintaining the previous scroll position, and focus is properly managed
 * for keyboard navigation accessibility.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    
    // Also scroll after a short delay to handle lazy-loaded content
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, 50);
    
    // Reset focus to main content area for accessibility
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      setTimeout(() => {
        mainContent.focus();
        setTimeout(() => {
          mainContent.blur();
        }, 100);
      }, 0);
    }
    
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
