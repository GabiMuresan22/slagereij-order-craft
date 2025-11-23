import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    sitemap({
      hostname: "https://slagerijjohn.be",
      dynamicRoutes: [
        "/about",
        "/products",
        "/packages",
        "/catering",
        "/order",
        "/contact",
        "/privacy",
        "/terms",
      ],
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0],
      exclude: ["/auth", "/my-account", "/admin"],
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
