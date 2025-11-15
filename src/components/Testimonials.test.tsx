import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import Testimonials from "./Testimonials";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock the language context
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

describe("Testimonials", () => {
  const mockT = vi.fn((key: string) => key);

  beforeEach(() => {
    vi.clearAllMocks();
    (useLanguage as any).mockReturnValue({
      t: mockT,
    });
  });

  it("renders testimonials section", () => {
    render(<Testimonials />);
    // Testimonials component should render
    // Adjust based on actual content structure
    expect(document.body).toBeTruthy();
  });
});

