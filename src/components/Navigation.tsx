import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Language configuration with flags and native names
const languageConfig = {
  nl: { 
    name: "Dutch", 
    nativeName: "Nederlands", 
    flag: "🇳🇱" 
  },
  ro: { 
    name: "Romanian", 
    nativeName: "Română", 
    flag: "🇷🇴" 
  }
};

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data } = await (supabase as any)
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });
        setIsAdmin(!!data);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/packages", label: t('nav.packages') },
    { path: "/about", label: t('nav.about') },
    { path: "/products", label: t('nav.products') },
    { path: "/catering", label: t('nav.catering') },
    { path: "/order", label: t('nav.order') },
    { path: "/contact", label: t('nav.contact') },
  ];

  const currentLangConfig = languageConfig[language as keyof typeof languageConfig];

  const toggleLanguage = () => {
    if (language === 'nl') {
      setLanguage('ro');
    } else {
      setLanguage('nl');
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Slagerij John Logo" 
              className="h-12 lg:h-16 w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                padding: '4px',
                background: 'white',
                borderRadius: '50%',
              }}
            />
          </Link>

          {/* Desktop Navigation - Hidden below 950px */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              // Make "Order Online" a primary button
              if (item.path === "/order") {
                return (
                  <Button
                    key={item.path}
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6"
                  >
                    <Link to={item.path}>
                      {item.label}
                    </Link>
                  </Button>
                );
              }
              
              return (
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
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <span className="text-lg">{currentLangConfig.flag}</span>
              <span className="hidden sm:inline">{currentLangConfig.nativeName}</span>
            </Button>
            
            {/* Auth Button */}
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex items-center gap-2"
                    >
                      <Link to="/my-account">
                        <UserCircle className="h-4 w-4" />
                        <span>{t('nav.myAccount')}</span>
                      </Link>
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex items-center gap-2"
                      >
                        <Link to="/admin">
                          <Shield className="h-4 w-4" />
                          <span>{t('nav.admin')}</span>
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut()}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('auth.logout')}</span>
                    </Button>
                  </div>
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

          {/* Tablet/Mobile Navigation (below 950px) - Keep "Bestel Online" visible */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Always show Order button as primary CTA */}
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 text-sm"
            >
              <Link to="/order">
                {t('nav.order')}
              </Link>
            </Button>
            
            <button
              className="text-foreground p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation - Hamburger Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2">
            {navItems.map((item) => {
              // Skip Order button since it's visible in header
              if (item.path === "/order") {
                return null;
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 text-base font-medium transition-colors hover:text-primary min-h-[44px] flex items-center ${
                    location.pathname === item.path
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Language Toggle in Menu */}
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary min-h-[44px] w-full"
            >
              <span className="text-lg">{currentLangConfig.flag}</span>
              {currentLangConfig.nativeName}
            </button>
            
            {/* Mobile Auth Links */}
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      to="/my-account"
                      className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary min-h-[44px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="h-4 w-4" />
                      {t('nav.myAccount')}
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        {t('nav.admin')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary min-h-[44px] w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('auth.logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary min-h-[44px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    {t('auth.login')}
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
