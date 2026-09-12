import type { MetadataRoute } from "next";
import { sanityFetch } from "../sanity/lib/live";
import { routing } from "../i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://an-studio-six.vercel.app";

const STATIC_PATHS = ["", "/work", "/services", "/about", "/client-application", "/shop", "/privacy-policy"];

const PROJECT_SLUGS_QUERY = `*[_type == "project"]{ "slug": slug.current }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({ query: PROJECT_SLUGS_QUERY });
  const projectSlugs = ((data ?? []) as { slug: string }[])
    .map((p) => p.slug)
    .filter(Boolean);

  const allPaths = [...STATIC_PATHS, ...projectSlugs.map((slug) => `/work/${slug}`)];

  return allPaths.map((path) => ({
    url: `${BASE_URL}/${routing.defaultLocale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
      ),
    },
  }));
}
