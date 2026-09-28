import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import { routing } from "../../i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.byanstudio.com";

type ImageWithTags = { image?: any; videoUrl?: string };

const QUERY = `{
  "home": *[_type == "home"][0]{ heroImages },
  "about": *[_type == "about"][0]{ ownerImage, introImage },
  "services": *[_type == "services"][0]{ servicesList[]{ featuredImage } },
  "clientApplication": *[_type == "clientApplication"][0]{
    heroImages,
    featuredImages[]{ image }
  },
  "shop": *[_type == "shop"][0]{ products[]{ image } },
  "projects": *[_type == "project"]{
    "slug": slug.current,
    mainImage,
    image1,
    image2,
    galleryImages,
    image7,
    image8,
    image9,
    simpleImages
  }
}`;

function imageUrl(source: any): string | null {
  if (!source) return null;
  try {
    return urlFor(source).url();
  } catch {
    return null;
  }
}

// Solo cuenta como imagen si no lleva vídeo asociado (en ese caso la imagen
// es únicamente el poster del vídeo, no una imagen de la página en sí).
function imagesFromWithTags(items: ImageWithTags[] | ImageWithTags | undefined | null): string[] {
  const list = Array.isArray(items) ? items : items ? [items] : [];
  return list
    .filter((item) => item?.image && !item?.videoUrl)
    .map((item) => imageUrl(item.image))
    .filter((url): url is string => Boolean(url));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type PageImages = { path: string; images: string[] };

export async function GET() {
  const { data } = await sanityFetch({ query: QUERY });

  const home = (data as any)?.home;
  const about = (data as any)?.about;
  const services = (data as any)?.services;
  const clientApplication = (data as any)?.clientApplication;
  const shop = (data as any)?.shop;
  const projects = ((data as any)?.projects ?? []) as any[];

  const pages: PageImages[] = [];

  pages.push({
    path: "",
    images: (home?.heroImages ?? []).map(imageUrl).filter((u: string | null): u is string => Boolean(u)),
  });

  pages.push({
    path: "/about",
    images: [imageUrl(about?.ownerImage), imageUrl(about?.introImage)].filter(
      (u): u is string => Boolean(u)
    ),
  });

  pages.push({
    path: "/services",
    images: (services?.servicesList ?? [])
      .map((item: any) => imageUrl(item?.featuredImage))
      .filter((u: string | null): u is string => Boolean(u)),
  });

  pages.push({
    path: "/client-application",
    images: [
      ...(clientApplication?.heroImages ?? []).map(imageUrl),
      ...(clientApplication?.featuredImages ?? []).map((item: any) => imageUrl(item?.image)),
    ].filter((u: string | null): u is string => Boolean(u)),
  });

  pages.push({
    path: "/shop",
    images: (shop?.products ?? [])
      .map((item: any) => imageUrl(item?.image))
      .filter((u: string | null): u is string => Boolean(u)),
  });

  pages.push({
    path: "/work",
    images: projects
      .map((p) => imageUrl(p?.mainImage))
      .filter((u: string | null): u is string => Boolean(u)),
  });

  for (const p of projects) {
    if (!p?.slug) continue;
    const images = [
      imageUrl(p.mainImage),
      ...imagesFromWithTags(p.image1),
      ...imagesFromWithTags(p.image2),
      ...imagesFromWithTags(p.galleryImages),
      ...imagesFromWithTags(p.image7),
      ...imagesFromWithTags(p.image8),
      ...imagesFromWithTags(p.image9),
      ...imagesFromWithTags(p.simpleImages),
    ].filter((u): u is string => Boolean(u));
    pages.push({ path: `/work/${p.slug}`, images });
  }

  const urlEntries = pages
    .filter((p) => p.images.length > 0)
    .map((p) => {
      // Deduplicamos por página para no listar la misma imagen dos veces
      // (ej: mainImage repetida en la variante gallery/simple).
      const uniqueImages = Array.from(new Set(p.images));
      const loc = `${BASE_URL}/${routing.defaultLocale}${p.path}`;
      const imageTags = uniqueImages
        .map((img) => `    <image:image>\n      <image:loc>${escapeXml(img)}</image:loc>\n    </image:image>`)
        .join("\n");
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n${imageTags}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlEntries}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
