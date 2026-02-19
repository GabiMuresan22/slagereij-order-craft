import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import Accessibility from "./Accessibility";

describe("Accessibility", () => {
  it("renders accessibility statement heading", () => {
    render(<Accessibility />);
    const heading = screen.getByRole("heading", { level: 1, name: /Toegankelijkheidsverklaring/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders WCAG compliance information", () => {
    render(<Accessibility />);
    const wcagLink = screen.getByRole("link", { name: /Web Content Accessibility Guidelines/i });
    expect(wcagLink).toBeInTheDocument();
    expect(wcagLink).toHaveAttribute("href", "https://www.w3.org/WAI/WCAG21/quickref/");
  });

  it("renders contact email for feedback", () => {
    render(<Accessibility />);
    const emailLink = screen.getByRole("link", { name: /info@slagerij-john.be/i });
    expect(emailLink).toBeInTheDocument();
  });

  it("renders key accessibility features", () => {
    render(<Accessibility />);
    // Check for section heading
    expect(screen.getByRole("heading", { name: /Toegankelijkheidsfuncties/i })).toBeInTheDocument();
    // Check for some feature headings
    expect(screen.getByText(/✓ Skip Link/i)).toBeInTheDocument();
    expect(screen.getByText(/✓ ARIA Labels/i)).toBeInTheDocument();
  });
});
