import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    const heading = screen.getByText(/404/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders page not found message", () => {
    render(<NotFound />);
    const message = screen.getByText(/Oops! Page not found/i);
    expect(message).toBeInTheDocument();
  });

  it("renders link to home page", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /Return to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});

