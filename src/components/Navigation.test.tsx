import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import Navigation from "./Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

// Mock the contexts
vi.mock("@/contexts/LanguageContext", async () => {
  const React = await import("react");
  return {
    useLanguage: vi.fn(),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("@/contexts/AuthContext", async () => {
  const React = await import("react");
  return {
    useAuth: vi.fn(),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc: vi.fn(),
  },
}));

describe("Navigation", () => {
  const mockSetLanguage = vi.fn();
  const mockT = vi.fn((key: string) => key);
  const mockSignOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLanguage as any).mockReturnValue({
      language: "nl",
      setLanguage: mockSetLanguage,
      t: mockT,
    });
    (useAuth as any).mockReturnValue({
      user: null,
      signOut: mockSignOut,
      loading: false,
    });
  });

  it("renders the logo", () => {
    render(<Navigation />);
    // Logo is inside a link with aria-label; the img itself has alt="" (decorative within the labeled link)
    const logoLink = screen.getByRole("link", { name: /accessibility.goToHome/i });
    expect(logoLink).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navigation />);
    // Check for navigation items
    expect(screen.getByText(/nav.home/i)).toBeInTheDocument();
    expect(screen.getByText(/nav.about/i)).toBeInTheDocument();
    expect(screen.getByText(/nav.products/i)).toBeInTheDocument();
    expect(screen.getByText(/nav.order/i)).toBeInTheDocument();
    expect(screen.getByText(/nav.contact/i)).toBeInTheDocument();
  });

  it("renders language toggle button with native name", () => {
    render(<Navigation />);
    // The language button shows the native name abbreviation "NL" for Dutch
    const languageButton = screen.getByText(/^NL$/);
    expect(languageButton).toBeInTheDocument();
  });

  it("renders login button when user is not authenticated", () => {
    render(<Navigation />);
    expect(screen.getByText(/auth.login/i)).toBeInTheDocument();
  });

  it("renders user account button when user is authenticated", () => {
    (useAuth as any).mockReturnValue({
      user: { id: "123", email: "test@example.com" },
      signOut: mockSignOut,
      loading: false,
    });

    render(<Navigation />);
    // The component uses t('nav.myAccount') which returns the translation key via the mock
    expect(screen.getByText(/nav\.myAccount/i)).toBeInTheDocument();
  });
});

