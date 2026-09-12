import { pick as pickSeo } from "../../../i18n/locale";
import { urlFor } from "../../../sanity/lib/image";
import { sanityFetch } from "../../../sanity/lib/live";
import { HeroVisual } from "../../_components/HeroVisual";
import { ZoomWrapper } from "../../_components/ZoomWrapper";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pick, toLocale, buildAlternates } from "../../../i18n/locale";

const HOME_SEO_QUERY = `*[_type == "home"][0]{ seo }`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.home" });
  const { data } = await sanityFetch({ query: HOME_SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pickSeo(locale, seoData?.metaTitle) || t("title");
  const description = pickSeo(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/"),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const HOME_QUERY = `*[_type == "home"][0]{
  studioLabel,
  heroGroup1,
  heroGroup2,
  availableLabel,
  description,
  newsletterButtonLabel
}`;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: raw } = await sanityFetch({ query: HOME_QUERY });
  const r = raw as any;
  const data = r
    ? {
        studioLabel: pick(locale, r.studioLabel),
        heroGroup1: {
          line1: pick(locale, r.heroGroup1?.line1),
          line2: pick(locale, r.heroGroup1?.line2),
          line3: pick(locale, r.heroGroup1?.line3),
        },
        heroGroup2: {
          line1: pick(locale, r.heroGroup2?.line1),
          line2: pick(locale, r.heroGroup2?.line2),
          line3: pick(locale, r.heroGroup2?.line3),
        },
        availableLabel: pick(locale, r.availableLabel),
        description: pick(locale, r.description),
        newsletterButtonLabel: pick(locale, r.newsletterButtonLabel),
      }
    : null;

  return (
    <main className="w-full flex flex-col items-center">
      {/* Bloque 1 home */}
      <section className="min-h-[110svh] md:min-h-[100svh] w-full flex flex-col items-center justify-center gap-10 px-5 overflow-hidden">
        {data?.studioLabel && (
          <div className="text-center text-[clamp(12px,0.9375vw,18px)] md:fixed md:top-6 md:inset-x-0 md:z-10 md:pointer-events-none">
            {data.studioLabel}
          </div>
        )}

        <ZoomWrapper className="relative flex flex-col items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <HeroVisual />
          </div>

          {(data?.heroGroup1.line1 || data?.heroGroup1.line2 || data?.heroGroup1.line3) && (
            <div className="relative z-10 text-center text-[60px] leading-tight">
              {data.heroGroup1.line1 && <p>{data.heroGroup1.line1}</p>}
              {data.heroGroup1.line2 && <p>{data.heroGroup1.line2}</p>}
              {data.heroGroup1.line3 && <p className="italic">{data.heroGroup1.line3}</p>}
            </div>
          )}

          <div className="h-[280px]" />

          {(data?.heroGroup2.line1 || data?.heroGroup2.line2 || data?.heroGroup2.line3) && (
            <div className="relative z-10 text-center text-[60px] leading-tight">
              {data.heroGroup2.line1 && <p>{data.heroGroup2.line1}</p>}
              {data.heroGroup2.line2 && <p>{data.heroGroup2.line2}</p>}
              {data.heroGroup2.line3 && <p className="italic">{data.heroGroup2.line3}</p>}
            </div>
          )}
        </ZoomWrapper>
      </section>

      {/* Bloque 2 home */}
      <section className="w-full min-h-[50svh] md:min-h-0 md:fixed md:bottom-0 md:inset-x-0 z-20 py-[30px] px-5 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-5 text-center text-[16px]">
          {data?.availableLabel && (
            <div className="md:flex-1 md:text-left">{data.availableLabel}</div>
          )}
          {data?.description && (
            <div className="md:flex-[2] text-[18px]">{data.description}</div>
          )}
          {data?.newsletterButtonLabel && (
            <div className="md:flex-1 flex justify-center md:justify-end">
              <button className="px-4 py-2 text-sm">
                {data.newsletterButtonLabel}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
