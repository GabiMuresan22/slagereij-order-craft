import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Site configuration
const BASE_URL = "https://slagerij-john.be";

// Route definitions with SEO metadata
interface RouteConfig {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  // Priority modifier for Romanian version (usually slightly lower)
  roPriorityModifier?: number;
}

const routes: RouteConfig[] = [
  // Homepage - highest priority
  { path: "", changefreq: "weekly", priority: 1.0, roPriorityModifier: -0.05 },
  // Commercial pages - high priority (SEO-optimized)
  { path: "order", changefreq: "weekly", priority: 0.95, roPriorityModifier: -0.05 },
  { path: "products", changefreq: "weekly", priority: 0.9, roPriorityModifier: -0.05 },
  { path: "catering", changefreq: "weekly", priority: 0.9, roPriorityModifier: -0.05 },
  { path: "traiteur-catering", changefreq: "weekly", priority: 0.85, roPriorityModifier: -0.05 },
  // Brand & trust pages - medium-high priority (SEO-optimized)
  { path: "about", changefreq: "monthly", priority: 0.75, roPriorityModifier: -0.05 },
  { path: "contact", changefreq: "monthly", priority: 0.75, roPriorityModifier: -0.05 },
  // Informational pages - lower priority
  { path: "allergens", changefreq: "monthly", priority: 0.5, roPriorityModifier: -0.1 },
  { path: "privacy", changefreq: "yearly", priority: 0.3, roPriorityModifier: -0.1 },
  { path: "terms", changefreq: "yearly", priority: 0.3, roPriorityModifier: -0.1 },
];

function generateUrlEntry(
  nlPath: string,
  roPath: string,
  lastmod: string,
  changefreq: string,
  priority: number
): string {
  const nlUrl = nlPath ? `${BASE_URL}/${nlPath}` : `${BASE_URL}/`;
  const roUrl = roPath ? `${BASE_URL}/${roPath}` : `${BASE_URL}/ro`;

  return `  <url>
    <loc>${nlUrl}</loc>
    <xhtml:link rel="alternate" hreflang="nl" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="ro" href="${roUrl}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

function generateSitemap(): string {
  // Use current date for lastmod
  const today = new Date().toISOString().split("T")[0];

  const urlEntries: string[] = [];

  // Generate Dutch (default) URLs
  urlEntries.push("  <!-- Dutch (Default) URLs -->");
  for (const route of routes) {
    const nlPath = route.path;
    const roPath = route.path ? `ro/${route.path}` : "ro";
    urlEntries.push(
      generateUrlEntry(nlPath, roPath, today, route.changefreq, route.priority)
    );
  }

  // Generate Romanian URLs
  urlEntries.push("");
  urlEntries.push("  <!-- Romanian URLs -->");
  for (const route of routes) {
    const nlPath = route.path;
    const roPath = route.path ? `ro/${route.path}` : "ro";
    const roUrl = roPath ? `${BASE_URL}/${roPath}` : `${BASE_URL}/ro`;
    const nlUrl = nlPath ? `${BASE_URL}/${nlPath}` : `${BASE_URL}/`;
    const roPriority = Math.max(0.1, route.priority + (route.roPriorityModifier || -0.1));

    urlEntries.push(`  <url>
    <loc>${roUrl}</loc>
    <xhtml:link rel="alternate" hreflang="nl" href="${nlUrl}" />
    <xhtml:link rel="alternate" hreflang="ro" href="${roUrl}" />
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${roPriority.toFixed(1)}</priority>
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const sitemap = generateSitemap();

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400", // Cache for 1 hour client, 1 day CDN
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
