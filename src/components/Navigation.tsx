import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/about", label: t('nav.about') },
    { path: "/products", label: t('nav.products') },
    { path: "/order", label: t('nav.order') },
    { path: "/contact", label: t('nav.contact') },
  ];

  const toggleLanguage = () => {
    if (language === 'nl') {
      setLanguage('ro');
    } else {
      setLanguage('nl');
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Slager John Logo" 
              className="h-14 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <span className="text-lg">{language === 'nl' ? '🇳🇱' : '🇷🇴'}</span>
              {language.toUpperCase()}
            </Button>
            
            {/* Auth Button */}
            {!loading && (
              <>
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('auth.logout')}</span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center gap-2"
                  >
                    <Link to="/auth">
                      <User className="h-4 w-4" />
                      <span>{t('auth.login')}</span>
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1"
            >
              <span className="text-base">{language === 'nl' ? '🇳🇱' : '🇷🇴'}</span>
              {language.toUpperCase()}
            </Button>
            
            {/* Mobile Auth Button */}
            {!loading && !user && (
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link to="/auth">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
            )}
            
            <button
              className="text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-3 text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Link */}
            {!loading && user && (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-primary"
              >
                {t('auth.logout')}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
