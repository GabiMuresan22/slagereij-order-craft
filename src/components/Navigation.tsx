import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { path: "/about", label: t('nav.about') },
    { path: "/products", label: t('nav.products') },
    { path: "/catering", label: t('nav.catering') },
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

  const isHomePage = location.pathname === "/";

  return (
    <nav className={`border-b sticky top-0 z-50 transition-all duration-300 ${
      isHomePage && !isScrolled 
        ? 'bg-transparent border-transparent' 
        : 'bg-card/95 backdrop-blur-sm border-border shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Slager John Logo" 
              className="h-16 md:h-20 w-auto drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors ${
                  isHomePage && !isScrolled
                    ? 'text-white hover:text-white/80 drop-shadow-lg'
                    : 'text-foreground hover:text-primary'
                } ${
                  location.pathname === item.path
                    ? isHomePage && !isScrolled 
                      ? "font-bold text-white" 
                      : "text-primary font-semibold"
                    : ""
                }`}
                style={
                  isHomePage && !isScrolled
                    ? { textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }
                    : {}
                }
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className={`flex items-center gap-2 ${
                isHomePage && !isScrolled
                  ? 'bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30'
                  : ''
              }`}
            >
              <span className="text-lg">{language === 'nl' ? '🇳🇱' : '🇷🇴'}</span>
              {language.toUpperCase()}
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
                      className={`flex items-center gap-2 ${
                        isHomePage && !isScrolled
                          ? 'bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30'
                          : ''
                      }`}
                    >
                      <Link to="/my-account">
                        <UserCircle className="h-4 w-4" />
                        <span>My Account</span>
                      </Link>
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className={`flex items-center gap-2 ${
                          isHomePage && !isScrolled
                            ? 'bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30'
                            : ''
                        }`}
                      >
                        <Link to="/admin">
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut()}
                      className={`flex items-center gap-2 ${
                        isHomePage && !isScrolled
                          ? 'text-white hover:bg-white/20'
                          : ''
                      }`}
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
                    className={`flex items-center gap-2 ${
                      isHomePage && !isScrolled
                        ? 'bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30'
                        : ''
                    }`}
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
              <>
                <Link
                  to="/my-account"
                  className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserCircle className="h-4 w-4" />
                  My Account
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 py-3 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-primary"
                >
                  {t('auth.logout')}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
