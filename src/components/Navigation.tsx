import { useLocation } from "react-router-dom";
import { Menu, User, LogOut, Shield, UserCircle, Home, ShoppingBag, Info, Package, UtensilsCrossed, ShoppingCart, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import LocalizedLink from "@/components/LocalizedLink";
import { useLocalizedNavigation } from "@/hooks/useLocalizedNavigation";

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
  const { currentPath } = useLocalizedNavigation();

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

  // Icon mapping for navigation items
  const iconMap = {
    "/": Home,
    "/packages": Package,
    "/about": Info,
    "/products": ShoppingBag,
    "/catering": UtensilsCrossed,
    "/order": ShoppingCart,
    "/contact": Phone,
  };

  const navItems = [
    { path: "/", label: t('nav.home'), icon: iconMap["/"] },
    { path: "/packages", label: t('nav.packages'), icon: iconMap["/packages"] },
    { path: "/about", label: t('nav.about'), icon: iconMap["/about"] },
    { path: "/products", label: t('nav.products'), icon: iconMap["/products"] },
    { path: "/catering", label: t('nav.catering'), icon: iconMap["/catering"] },
    { path: "/order", label: t('nav.order'), icon: iconMap["/order"] },
    { path: "/contact", label: t('nav.contact'), icon: iconMap["/contact"] },
  ];

  const currentLangConfig = languageConfig[language as keyof typeof languageConfig];

  const toggleLanguage = () => {
    if (language === 'nl') {
      setLanguage('ro');
    } else {
      setLanguage('nl');
    }
  };

  // Check if a path is active (compare without language prefix)
  const isActivePath = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <nav 
      className="bg-background border-b border-border sticky top-0 z-50 shadow-sm"
      role="navigation"
      aria-label={t('accessibility.mainNavigation') || 'Main navigation'}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 xl:h-20">
          {/* Logo - Always visible */}
          <LocalizedLink 
            to="/" 
            className="flex-shrink-0 flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            aria-label={t('accessibility.goToHome') || 'Go to home page - Slagerij John'}
          >
            <img 
              src={logo} 
              alt="" 
              aria-hidden="true"
              className="h-10 sm:h-12 xl:h-16 w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                padding: '4px',
                background: 'white',
                borderRadius: '50%',
              }}
            />
          </LocalizedLink>

          {/* Desktop Navigation - Hidden below 1280px (xl) to prevent cramped layout */}
          <div className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => {
              // Make "Order Online" a primary button
              if (item.path === "/order") {
                return (
                  <Button
                    key={item.path}
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
                  >
                    <LocalizedLink to={item.path}>
                      {item.label}
                    </LocalizedLink>
                  </Button>
                );
              }
              
              return (
                <LocalizedLink
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-colors hover:text-primary min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                    isActivePath(item.path)
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                  aria-current={isActivePath(item.path) ? "page" : undefined}
                >
                  {item.label}
                </LocalizedLink>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
              aria-label={`${t('accessibility.changeLanguage') || 'Change language'}: ${currentLangConfig.nativeName}`}
            >
              <span className="text-lg" aria-hidden="true">{currentLangConfig.flag}</span>
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
                      <LocalizedLink to="/my-account">
                        <UserCircle className="h-4 w-4" />
                        <span>{t('nav.myAccount')}</span>
                      </LocalizedLink>
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex items-center gap-2"
                      >
                        <LocalizedLink to="/admin">
                          <Shield className="h-4 w-4" />
                          <span>{t('nav.admin')}</span>
                        </LocalizedLink>
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
                    <LocalizedLink to="/auth">
                      <User className="h-4 w-4" />
                      <span>{t('auth.login')}</span>
                    </LocalizedLink>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Tablet/Mobile Navigation (below 1280px) - Keep "Bestel Online" visible */}
          <div className="xl:hidden flex items-center gap-2">
            {/* Always show Order button as primary CTA */}
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 text-sm"
            >
              <LocalizedLink to="/order">
                {t('nav.order')}
              </LocalizedLink>
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-foreground p-2 min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  aria-label={mobileMenuOpen ? (t('accessibility.closeMenu') || 'Close menu') : (t('accessibility.openMenu') || 'Open menu')}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav-menu"
                >
                  <Menu size={28} aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[85vw] sm:w-[400px] p-0 flex flex-col"
                id="mobile-nav-menu"
                aria-label={t('accessibility.mobileNavigation') || 'Mobile navigation menu'}
              >
                {/* Sheet Header with Branding */}
                <SheetHeader className="px-6 pt-6 pb-4 border-b">
                  <SheetTitle className="text-left text-xl font-serif font-bold">
                    Slagerij John
                  </SheetTitle>
                </SheetHeader>

                {/* Scrollable Menu Links */}
                <ScrollArea className="flex-1 px-4">
                  <nav className="py-4 space-y-1" role="menu" aria-label={t('accessibility.siteNavigation') || 'Site navigation'}>
                    {navItems.map((item) => {
                      // Skip Order button since it's visible in header
                      if (item.path === "/order") {
                        return null;
                      }
                      
                      const Icon = item.icon;
                      const isActive = isActivePath(item.path);
                      
                      return (
                        <LocalizedLink
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                            isActive
                              ? "text-primary font-semibold bg-primary/10"
                              : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                          role="menuitem"
                          aria-current={isActive ? "page" : undefined}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                          <span>{item.label}</span>
                        </LocalizedLink>
                      );
                    })}
                  </nav>
                </ScrollArea>

                {/* Sticky Footer with Language and Auth */}
                <div className="border-t px-4 py-4 space-y-2 mt-auto">
                  <Separator className="mb-2" />
            
                  {/* Language Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleLanguage();
                    }}
                    className="w-full justify-start min-h-[48px]"
                  >
                    <span className="text-lg mr-3">{currentLangConfig.flag}</span>
                    <span>{currentLangConfig.nativeName}</span>
                  </Button>
            
                  {/* Auth Button */}
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          <Button
                            variant="outline"
                            asChild
                            className="w-full justify-start min-h-[48px]"
                          >
                            <LocalizedLink to="/my-account" onClick={() => setMobileMenuOpen(false)}>
                              <UserCircle className="h-4 w-4 mr-3" />
                              {t('nav.myAccount')}
                            </LocalizedLink>
                          </Button>
                          {isAdmin && (
                            <Button
                              variant="outline"
                              asChild
                              className="w-full justify-start min-h-[48px]"
                            >
                              <LocalizedLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                                <Shield className="h-4 w-4 mr-3" />
                                {t('nav.admin')}
                              </LocalizedLink>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => {
                              signOut();
                              setMobileMenuOpen(false);
                            }}
                            className="w-full justify-start min-h-[48px]"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            {t('auth.logout')}
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          asChild
                          className="w-full justify-start min-h-[48px]"
                        >
                          <LocalizedLink to="/auth" onClick={() => setMobileMenuOpen(false)}>
                            <User className="h-4 w-4 mr-3" />
                            {t('auth.login')}
                          </LocalizedLink>
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
