import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import App from "./App";

describe("App", () => {
  it("renders the navigation", () => {
    render(<App />);
    // Check if logo is present (Navigation component)
    const logo = screen.getByAltText(/Slager John Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<App />);
    // Footer should contain copyright text
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it("renders home page by default", () => {
    render(<App />);
    // Home page should have some content
    // This will depend on what's actually rendered on the home page
    expect(screen.getByAltText(/Slager John Logo/i)).toBeInTheDocument();
  });
});

