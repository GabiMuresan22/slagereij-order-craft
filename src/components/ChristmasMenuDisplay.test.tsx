import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ChristmasMenuDisplay from "./ChristmasMenuDisplay";

// Mock the LanguageContext
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "christmas.menu.packages": "Feestmenu's",
        "christmas.menu.catering": "Catering Menu",
        "christmas.menu.prices": "Prijzen",
        "christmas.menu.persons": "pers",
        "christmas.menu.person": "pers",
        "christmas.menu.hapjes": "Hapjes",
        "christmas.menu.tapas": "Tapas",
        "christmas.menu.miniSandwiches": "Mini Broodjes",
        "christmas.menu.perPiece": "per stuk",
        "christmas.menu.socialDining": "Gezellig Tafelen",
        "christmas.menu.mainCourses": "Hoofdgerechten",
        "christmas.menu.warmVegetables": "Warme Groenten",
        "christmas.menu.soups": "Soepen",
        "christmas.menu.liter": "liter",
        "christmas.menu.desserts": "Desserts",
        "christmas.menu.buffets": "Buffetten",
        "christmas.menu.alaCarte": "À la Carte",
      };
      return translations[key] || key;
    },
  }),
}));

describe("ChristmasMenuDisplay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with test id", () => {
    render(<ChristmasMenuDisplay />);
    expect(screen.getByTestId("christmas-menu-display")).toBeInTheDocument();
  });

  it("renders the tabs for packages and catering", () => {
    render(<ChristmasMenuDisplay />);
    expect(screen.getByText("Feestmenu's")).toBeInTheDocument();
    expect(screen.getByText("Catering Menu")).toBeInTheDocument();
  });

  it("renders holiday packages titles", () => {
    render(<ChristmasMenuDisplay />);
    expect(screen.getByText("Meniu Traditional John")).toBeInTheDocument();
    expect(screen.getByText("Meniu Ca La Mama Acasa")).toBeInTheDocument();
    expect(screen.getByText("Meniu Traditia Bunicilor")).toBeInTheDocument();
  });

  it("renders pricing information for packages", () => {
    render(<ChristmasMenuDisplay />);
    // Check for pricing values
    expect(screen.getByText("€195")).toBeInTheDocument();
    expect(screen.getByText("€380")).toBeInTheDocument();
    expect(screen.getByText("€565")).toBeInTheDocument();
  });
});
