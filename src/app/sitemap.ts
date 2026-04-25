import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studios.com.ar";

const routes = [
  "/",
  "/en",
  "/tour",
  "/en/tour",
  "/check-in",
  "/panel",
  "/crm",
  "/estadisticas",
  "/finanzas",
  "/equipo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" || path === "/en" ? 1 : 0.8,
  }));
}
