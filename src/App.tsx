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
import PremiumAlert from "./components/PremiumAlert";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";

// 1. Import lazy and Suspense from React
import { lazy, Suspense } from "react";

// 2. Replace static imports with lazy imports
// This tells Vite to split these into separate files (chunks)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Packages = lazy(() => import("./pages/Packages"));
const Catering = lazy(() => import("./pages/Catering"));
const Order = lazy(() => import("./pages/Order"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Allergens = lazy(() => import("./pages/Allergens"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Optional: A simple loading component to show while the new page chunk downloads
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <LanguageProvider>
            <AuthProvider>
              <PremiumAlert />
              <CookieConsentBanner />
              <Analytics />
              <Toaster />
              <Sonner />
              <div className="flex flex-col min-h-screen">
                {/* Navigation stays statically imported so it appears instantly */}
                <Navigation />
                <main className="flex-grow">
                  {/* 3. Wrap your Routes in Suspense */}
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/packages" element={<Packages />} />
                      <Route path="/catering" element={<Catering />} />
                      <Route path="/order" element={<Order />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/my-account" element={<MyAccount />} />
                      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/allergens" element={<Allergens />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
