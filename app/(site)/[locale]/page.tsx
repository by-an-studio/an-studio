import { pick as pickSeo } from "../../../i18n/locale";
import { urlFor } from "../../../sanity/lib/image";
import { sanityFetch } from "../../../sanity/lib/live";
import { HeroVisual } from "../../_components/HeroVisual";
import { HomeNewsletterForm } from "../../_components/HomeNewsletterForm";
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
  heroImages,
  studioLabel,
  heroGroup1,
  heroGroup2,
  availableLabel,
  description,
  newsletterButtonLabel,
  emailPlaceholder,
  comingSoonLabel
}`;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: raw } = await sanityFetch({ query: HOME_QUERY });
  const r = raw as any;
  const heroImages: string[] = Array.isArray(r?.heroImages) && r.heroImages.length > 0
    ? r.heroImages.map((img: any) => urlFor(img).width(2000).quality(95).url())
    : Array.from({ length: 8 }, (_, i) => `/pages/home/${i + 1}.webp`);

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
        emailPlaceholder: pick(locale, r.emailPlaceholder),
        comingSoonLabel: pick(locale, r.comingSoonLabel),
      }
    : null;

  return (
      <main className="relative w-full flex flex-col items-center">
      {/* Bloque 1 home */}
      <section className="h-[100svh] w-full flex flex-col items-center justify-center gap-4 md:gap-10 px-5 overflow-hidden">
        {data?.studioLabel && (
          <div className="text-center text-[clamp(12px,0.9375vw,18px)] md:text-[clamp(9px,0.9375vw,15px)] md:fixed md:top-6 md:inset-x-0 md:z-10 md:pointer-events-none">
            {data.studioLabel}
          </div>
        )}

        <ZoomWrapper className="relative flex flex-col items-center justify-center md:-translate-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <HeroVisual images={heroImages} />
          </div>

          {(data?.heroGroup1.line1 || data?.heroGroup1.line2 || data?.heroGroup1.line3) && (
            <div className="relative z-10 text-center text-[18px] md:text-[57px] md:whitespace-nowrap leading-[1.12] md:leading-[1.05]">
              <p>
                {data.heroGroup1.line1 && <span className="md:block">{data.heroGroup1.line1} </span>}
                {data.heroGroup1.line2 && <span className="md:block">{data.heroGroup1.line2} </span>}
                {data.heroGroup1.line3 && <span className="italic md:block">{data.heroGroup1.line3}</span>}
              </p>
            </div>
          )}

          <div className="h-[390px] md:h-[280px]" />

          {(data?.heroGroup2.line1 || data?.heroGroup2.line2 || data?.heroGroup2.line3) && (
            <div className="relative z-10 text-center text-[18px] md:text-[57px] md:whitespace-nowrap leading-[1.12] md:leading-[1.05]">
              <p>
                {data.heroGroup2.line1 && <span className="md:block">{data.heroGroup2.line1} </span>}
                {data.heroGroup2.line2 && <span className="md:block">{data.heroGroup2.line2} </span>}
                {data.heroGroup2.line3 && <span className="italic md:block">{data.heroGroup2.line3}</span>}
              </p>
            </div>
          )}
        </ZoomWrapper>
      </section>

      {/* Bloque 2 home */}
      <section className="w-full min-h-[18svh] md:min-h-0 mt-10 md:mt-0 md:py-[30px] md:fixed md:bottom-0 md:inset-x-0 z-20 px-5 flex flex-col justify-start md:justify-center">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-5 text-center text-[15px] md:text-[13px]">
          <div className="flex flex-col gap-14 md:gap-2 md:contents">
            {data?.availableLabel && (
              <div className="order-2 md:order-none md:flex-1 text-[15px] md:text-[clamp(10px,0.8333vw,13px)] md:text-left">{data.availableLabel}</div>
            )}
            {data?.description && (
              <div className="order-1 md:order-none md:flex-[2] w-full whitespace-nowrap md:whitespace-normal md:max-w-none md:mx-0 text-[clamp(7px,calc((100vw-40px)*0.0298),16px)] md:text-[clamp(11px,0.9375vw,15px)]">{data.description}</div>
            )}
          </div>
          {data?.newsletterButtonLabel && (
            <div className="md:flex-1 flex justify-center md:justify-end">
              <div className="md:rotate-0 md:origin-center">
                <div className="md:rotate-0">
                  <HomeNewsletterForm
                    buttonLabel={data.newsletterButtonLabel}
                    emailPlaceholder={data.emailPlaceholder}
                    comingSoonLabel={data.comingSoonLabel}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      </main>
  );
}
