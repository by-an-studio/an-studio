import { pick as pickSeo } from "../../../../i18n/locale";
import { urlFor } from "../../../../sanity/lib/image";
import { ServicesClient } from "../../../_components/ServicesClient";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, pickList, pickPortableText, toLocale, buildAlternates } from "../../../../i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const SEO_QUERY = `*[_type == "services"][0]{ seo }`;
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.services" });
  const { data } = await sanityFetch({ query: SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pickSeo(locale, seoData?.metaTitle) || t("title");
  const description = pickSeo(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/services"),
    openGraph: { title, description, siteName: "An Studio", images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const SERVICES_QUERY = `*[_type == "services"][0]{
  headerLabel,
  headerTagline,
  servicesList[]{
    number,
    label,
    paragraphs,
    timeline,
    featuredImageIndex,
    featuredTags,
    featuredImage,
    featuredTitle
  },
  otherServicesTitle,
  otherServices,
  industryTitle,
  industry,
  contactTitle,
  contactLines
}`;


export default async function Services({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { service: initialService } = await searchParams;
  const { data: rawData } = await sanityFetch({ query: SERVICES_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        headerLabel: pick(locale, raw.headerLabel),
        headerTagline: pick(locale, raw.headerTagline),
        servicesList: (raw.servicesList ?? []).map((s: any) => ({
          number: s.number,
          label: pick(locale, s.label),
          paragraphs: pickPortableText(locale, s.paragraphs),
          timeline: pick(locale, s.timeline),
          featuredImageIndex: s.featuredImageIndex,
          featuredTags: pickList(locale, s.featuredTags),
          featuredImage: s.featuredImage,
          featuredTitle: pick(locale, s.featuredTitle),
        })),
        otherServicesTitle: pick(locale, raw.otherServicesTitle),
        otherServices: pickList(locale, raw.otherServices),
        industryTitle: pick(locale, raw.industryTitle),
        industry: pickList(locale, raw.industry),
        contactTitle: pick(locale, raw.contactTitle),
        contactLines: pickList(locale, raw.contactLines),
      }
    : null;

  return <ServicesClient data={data} initialService={initialService} />;
}
