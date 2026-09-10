import type { MetadataRoute } from "next";
// TODO: cuando publiquéis con el dominio definitivo, cambiar disallow: "/" por allow: "/"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
