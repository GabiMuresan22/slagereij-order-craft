import { useLocation, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, ShoppingCart, Package, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const popularPages = [
    { path: "/", label: t('nav.home') || "Home", icon: Home },
    { path: "/order", label: t('nav.order') || "Bestellen", icon: ShoppingCart },
    { path: "/products", label: t('nav.products') || "Producten", icon: Package },
    { path: "/catering", label: t('nav.catering') || "Catering", icon: UtensilsCrossed },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist."
        noIndex={true}
      />
      <div className="text-center space-y-8 max-w-2xl w-full">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {t('notFound.message') || "Oops! De pagina"} <code className="text-sm bg-muted px-2 py-1 rounded">{location.pathname}</code> {t('notFound.notExist') || "bestaat niet."}
          </p>
          <p className="text-muted-foreground">
            {t('notFound.helpText') || "De pagina die u zoekt kan zijn verplaatst, verwijderd of bestaat niet."}
          </p>
        </div>

        {/* Popular Pages Links */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {t('notFound.popularPages') || "Populaire pagina's:"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link key={page.path} to={page.path}>
                    <Button
                      variant="outline"
                      className="w-full h-auto flex flex-col items-center gap-2 p-4 hover:bg-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{page.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('notFound.goBack') || "Ga terug"}
          </Button>
          <Link to="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              {t('notFound.goHome') || "Naar startpagina"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
