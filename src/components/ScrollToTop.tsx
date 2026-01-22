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
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Reset focus to main content area for accessibility
    // This helps screen readers and keyboard users know where they are
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Use setTimeout to ensure the DOM has updated after route change
      setTimeout(() => {
        mainContent.focus();
        // Remove focus after a brief moment to avoid visible focus ring on page load
        // but still announce the page change to screen readers
        setTimeout(() => {
          mainContent.blur();
        }, 100);
      }, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
