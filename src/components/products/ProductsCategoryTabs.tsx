import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_SECTION_IDS } from "@/lib/productsPageConfig";

export interface TabItem {
  id: string;
  label: string;
}

interface ProductsCategoryTabsProps {
  tabs: TabItem[];
  language: "nl" | "ro";
}

export function ProductsCategoryTabs({ tabs, language }: ProductsCategoryTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = Object.values(CATEGORY_SECTION_IDS);
    sectionIds.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              setActiveId(sectionId);
            }
          });
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="sticky top-14 md:top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm"
      aria-label={language === "nl" ? "Productcategorieën" : "Categorii produse"}
    >
      <div className="container mx-auto px-4">
        <ul className="flex gap-1 overflow-x-auto scrollbar-thin py-2 md:py-3 md:justify-center md:flex-wrap">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => scrollTo(tab.id)}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeId === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
