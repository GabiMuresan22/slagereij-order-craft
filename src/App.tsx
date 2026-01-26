import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Analytics } from "./components/Analytics";
import CookieConsentBanner from "./components/CookieConsent";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipLink from "./components/SkipLink";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";
import RoadworksAlert from "./components/RoadworksAlert";
import AnniversaryBanner from "./components/AnniversaryBanner";

// 1. Import Suspense from React
import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

// 2. Lazy imports with retry logic for chunk loading failures
const Home = lazyWithRetry(() => import("./pages/Home"));
const About = lazyWithRetry(() => import("./pages/About"));
const Products = lazyWithRetry(() => import("./pages/Products"));
const Catering = lazyWithRetry(() => import("./pages/Catering"));
const TraiteurCatering = lazyWithRetry(() => import("./pages/TraiteurCatering"));
const Order = lazyWithRetry(() => import("./pages/Order"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const Auth = lazyWithRetry(() => import("./pages/Auth"));
const MyAccount = lazyWithRetry(() => import("./pages/MyAccount"));
const AdminDashboard = lazyWithRetry(() => import("./pages/admin/Dashboard"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Terms = lazyWithRetry(() => import("./pages/Terms"));
const Allergens = lazyWithRetry(() => import("./pages/Allergens"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Optional: A simple loading component to show while the new page chunk downloads
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Shared routes configuration
const AppRoutes = () => (
  <Routes>
    {/* Dutch routes (default, no prefix) */}
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/products" element={<Products />} />
    <Route path="/catering" element={<Catering />} />
    <Route path="/traiteur-catering" element={<TraiteurCatering />} />
    <Route path="/order" element={<Order />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/my-account" element={<MyAccount />} />
    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/allergens" element={<Allergens />} />
    
    {/* Romanian routes (with /ro prefix) */}
    <Route path="/ro" element={<Home />} />
    <Route path="/ro/about" element={<About />} />
    <Route path="/ro/products" element={<Products />} />
    <Route path="/ro/catering" element={<Catering />} />
    <Route path="/ro/traiteur-catering" element={<TraiteurCatering />} />
    <Route path="/ro/order" element={<Order />} />
    <Route path="/ro/contact" element={<Contact />} />
    <Route path="/ro/auth" element={<Auth />} />
    <Route path="/ro/my-account" element={<MyAccount />} />
    <Route path="/ro/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="/ro/privacy" element={<Privacy />} />
    <Route path="/ro/terms" element={<Terms />} />
    <Route path="/ro/allergens" element={<Allergens />} />
    
    {/* Legacy redirect for /packages */}
    <Route path="/packages" element={<Products />} />
    <Route path="/ro/packages" element={<Products />} />
    
    {/* 404 fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <ScrollToTop />
            <LanguageProvider>
              <AuthProvider>
                
                <CookieConsentBanner />
                <Analytics />
                <Toaster />
                <Sonner />
                <div className="flex flex-col min-h-screen">
                  <SkipLink />
                  <RoadworksAlert />
                  <AnniversaryBanner />
                  {/* Navigation stays statically imported so it appears instantly */}
                  <Navigation />
                  <main id="main-content" className="flex-grow" role="main" tabIndex={-1}>
                    {/* 3. Wrap your Routes in Suspense */}
                    <Suspense fallback={<PageLoader />}>
                      <AppRoutes />
                    </Suspense>
                  </main>
                  <Footer />
                  
                </div>
              </AuthProvider>
            </LanguageProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
