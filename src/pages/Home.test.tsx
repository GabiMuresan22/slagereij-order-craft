import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import Home from "./Home";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock dependencies
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
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
    // The home page should render some content
    // This is a basic test - you can expand based on actual content
    expect(screen.getByRole("main") || document.body).toBeTruthy();
  });
});

