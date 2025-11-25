import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls the window to the top whenever the route changes.
 * This ensures that when users navigate to a new page, they start at the top
 * rather than maintaining the previous scroll position.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
