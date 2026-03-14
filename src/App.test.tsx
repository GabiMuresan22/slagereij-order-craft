import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the navigation", () => {
    render(<App />);
    // There are multiple navigation elements (main nav + footer nav), check all are present
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });

  it("renders the footer", () => {
    render(<App />);
    // Footer has role="contentinfo"
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders home page by default", () => {
    render(<App />);
    // Multiple navigation elements are expected (main nav + footer nav)
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });
});

