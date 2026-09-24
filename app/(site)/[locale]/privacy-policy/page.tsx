import { pick as pickSeo } from "../../../../i18n/locale";
import { urlFor } from "../../../../sanity/lib/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Grid } from "../../../_components/Grid";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, toLocale, pickPortableText, buildAlternates } from "../../../../i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const SEO_QUERY = `*[_type == "privacyPolicy"][0]{ seo }`;
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.privacyPolicy" });
  const { data } = await sanityFetch({ query: SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pickSeo(locale, seoData?.metaTitle) || t("title");
  const description = pickSeo(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/privacy-policy"),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicy"][0]{
  pageTitle,
  lastUpdated,
  content
}`;

const contentComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
  },
  marks: {
    underline: ({ children }) => <span className="underline decoration-1">{children}</span>,
  },
};

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: rawData } = await sanityFetch({ query: PRIVACY_POLICY_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        pageTitle: pick(locale, raw.pageTitle),
        lastUpdated: pick(locale, raw.lastUpdated),
        content: pickPortableText(locale, raw.content),
      }
    : null;

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px]">
      <Grid className="items-start">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 min-[1200px]:pt-[50vh] min-[1200px]:-translate-y-10 mb-16 min-[1200px]:mb-0">
          {data?.pageTitle && (
            <p className="text-[32px] min-[1200px]:text-[clamp(21px,1.875vw,33px)]">{data.pageTitle}</p>
          )}
          {data?.lastUpdated && (
            <p className="italic text-[20px] min-[1200px]:text-[clamp(15px,1.25vw,21px)]">{data.lastUpdated}</p>
          )}
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-17 min-[1200px]:pt-[50vh] min-[1200px]:-translate-y-10 text-[14px] min-[1200px]:text-[13px] leading-tight">
          {data?.content && <PortableText value={data.content} components={contentComponents} />}
        </div>
      </Grid>
    </main>
  );
}
