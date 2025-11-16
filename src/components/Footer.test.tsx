import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import Footer from "./Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock the language context
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

describe("Footer", () => {
  const mockT = vi.fn((key: string) => key);

  beforeEach(() => {
    vi.clearAllMocks();
    (useLanguage as any).mockReturnValue({
      t: mockT,
    });
  });

  it("renders footer contact section", () => {
    render(<Footer />);
    expect(screen.getByText(/footer.contact/i)).toBeInTheDocument();
  });

  it("renders footer hours section", () => {
    render(<Footer />);
    expect(screen.getByText(/footer.hours/i)).toBeInTheDocument();
  });

  it("renders footer about section", () => {
    render(<Footer />);
    expect(screen.getByText(/footer.about.title/i)).toBeInTheDocument();
  });

  it("renders phone number link", () => {
    render(<Footer />);
    const phoneLink = screen.getByRole("link", { name: /\+32 466 18 64 57/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:+32466186457");
  });

  it("renders social media links", () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText(/Facebook/i);
    const tiktokLink = screen.getByLabelText(/TikTok/i);
    const mapsLink = screen.getByLabelText(/Google Maps/i);

    expect(facebookLink).toBeInTheDocument();
    expect(tiktokLink).toBeInTheDocument();
    expect(mapsLink).toBeInTheDocument();
    
    // Verify the social media heading text
    expect(screen.getByText(/footer.social/i)).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});

