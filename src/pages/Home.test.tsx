import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import Home from "./Home";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock dependencies
vi.mock("@/contexts/LanguageContext", async () => {
  const React = await import("react");
  return {
    useLanguage: vi.fn(),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("@/components/ChristmasMenu", () => ({
  default: () => <div data-testid="christmas-menu-mock">ChristmasMenu Mock</div>,
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
  },
}));

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/components/Analytics", () => ({
  trackMenuDownload: vi.fn(),
}));

describe("Home", () => {
  const mockT = vi.fn((key: string) => key);

  beforeEach(() => {
    vi.clearAllMocks();
    (useLanguage as any).mockReturnValue({
      t: mockT,
    });
  });

  it("renders home page content", () => {
    render(<Home />);
    // The home page should render some content - verify the hero title is present
    expect(screen.getByText("home.hero.title")).toBeInTheDocument();
  });

  it("renders the closure alert with destructive variant", () => {
    render(<Home />);
    // Check that the alert is present
    expect(screen.getByRole("alert")).toBeInTheDocument();
    // Check for the alert title
    expect(screen.getByText("Belangrijke Mededeling")).toBeInTheDocument();
    // Check for the alert description
    expect(screen.getByText("Wij zijn tijdelijk gesloten. Excuses voor het ongemak.")).toBeInTheDocument();
  });
});

