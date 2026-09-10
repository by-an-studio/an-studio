import { pick as pickSeo } from "../../../../i18n/locale";
import { urlFor } from "../../../../sanity/lib/image";
import { ClientApplicationClient } from "../../../_components/ClientApplicationClient";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, pickList, toLocale, buildAlternates } from "../../../../i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const SEO_QUERY = `*[_type == "clientApplication"][0]{ seo }`;
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.clientApplication" });
  const { data } = await sanityFetch({ query: SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pickSeo(locale, seoData?.metaTitle) || t("title");
  const description = pickSeo(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/client-application"),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const CLIENT_APPLICATION_QUERY = `*[_type == "clientApplication"][0]{
  heroTitle,
  heroTagline,
  heroImages,
  headline,
  featuredImages[]{image, imageIndex, caption, tags},
  servicesTitle,
  servicesList
}`;


export default async function ClientApplication({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: rawData } = await sanityFetch({ query: CLIENT_APPLICATION_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        heroTitle: pick(locale, raw.heroTitle),
        heroTagline: pick(locale, raw.heroTagline),
        heroImages: raw.heroImages,
        headline: pick(locale, raw.headline),
        featuredImages: (raw.featuredImages ?? []).map((item: any) => ({
          image: item.image,
          imageIndex: item.imageIndex,
          caption: pick(locale, item.caption),
          tags: item.tags,
        })),
        servicesTitle: pick(locale, raw.servicesTitle),
        servicesList: pickList(locale, raw.servicesList),
      }
    : null;

  return <ClientApplicationClient data={data} />;
}
