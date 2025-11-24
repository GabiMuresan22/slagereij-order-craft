import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Custom render function with all providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing library
export * from "@testing-library/react";
// Export screen from @testing-library/dom
export { screen };
// Override render with our custom version
export { customRender as render };
