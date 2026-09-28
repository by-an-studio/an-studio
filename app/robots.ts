import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.byanstudio.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El panel de Sanity y las rutas de API no deben aparecer en Google
      disallow: ["/studio", "/api/"],
    },
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/image-sitemap.xml`],
  };
}
