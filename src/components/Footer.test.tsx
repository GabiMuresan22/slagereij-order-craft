import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import Footer from "./Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock the language context
vi.mock("@/contexts/LanguageContext", async () => {
  const React = await import("react");
  return {
    useLanguage: vi.fn(),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

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
    // The hours heading has translation key "footer.hours" - use the heading role to be specific
    expect(screen.getByRole("heading", { name: /footer\.hours/i })).toBeInTheDocument();
  });

  it("renders footer about section", () => {
    render(<Footer />);
    expect(screen.getByText(/footer.about.title/i)).toBeInTheDocument();
  });

  it("renders phone number link", () => {
    render(<Footer />);
    // Find phone link by its href attribute
    const phoneLink = screen.getByRole("link", { name: /accessibility\.callPhone/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:+32466186457");
  });

  it("renders quick links navigation", () => {
    render(<Footer />);
    expect(screen.getByText(/footer.quickLinks/i)).toBeInTheDocument();
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

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByText(/footer.privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/footer.terms/i)).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it("renders website credit link", () => {
    render(<Footer />);
    const creditLink = screen.getByText(/footer.credit/i);
    expect(creditLink).toBeInTheDocument();
    expect(creditLink).toHaveAttribute("href", "https://gabimuresan.com/");
    expect(creditLink).toHaveAttribute("target", "_blank");
    expect(creditLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

