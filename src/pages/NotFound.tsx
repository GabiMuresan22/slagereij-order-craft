import { useLocation, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist."
        noIndex={true}
      />
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-xl text-muted-foreground">
            Oops! De pagina <code className="text-sm bg-muted px-2 py-1 rounded">{location.pathname}</code> bestaat niet.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ga terug
          </Button>
          <Link to="/">
            <Button className="gap-2 w-full">
              <Home className="h-4 w-4" />
              Naar startpagina
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
