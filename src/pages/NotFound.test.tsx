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
    // The component renders the translation key since notFound.message is not translated
    const message = screen.getByText(/notFound\.message/i);
    expect(message).toBeInTheDocument();
  });

  it("renders link to home page", () => {
    render(<NotFound />);
    // Find the home link by its href attribute
    const homeLinks = screen.getAllByRole("link");
    const homeLink = homeLinks.find((link) => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });
});

