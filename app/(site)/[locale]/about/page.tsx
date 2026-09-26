import { pick as pickSeo } from "../../../../i18n/locale";
import { Fragment } from "react";
import { FadeImage } from "../../../_components/FadeImage";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Grid } from "../../../_components/Grid";
import { urlFor } from "../../../../sanity/lib/image";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, pickList, toLocale, pickPortableText, buildAlternates } from "../../../../i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const SEO_QUERY = `*[_type == "about"][0]{ seo }`;
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.about" });
  const { data } = await sanityFetch({ query: SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pickSeo(locale, seoData?.metaTitle) || t("title");
  const description = pickSeo(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const ABOUT_QUERY = `*[_type == "about"][0]{
  ownerSectionLabel,
  ownerImage,
  ownerNameLabel,
  ownerBio,
  ownerImageIndex,
  ownerName,
  ownerRole,
  introText,
  introSubtext,
  introImage,
  awardsTitle,
  awards,
  exhibitionsTitle,
  exhibitions,
  clientsTitle,
  clientColumns[]{title, clients}
}`;


function SanityImg({ image, className }: { image?: any; className?: string }) {
  if (!image) return null;
  const rawUrl = urlFor(image).url();
  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
  const src = isGif ? rawUrl : urlFor(image).width(2200).url();
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <FadeImage src={src} alt="" fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 65vw, 100vw" className="object-cover" />
    </div>
  );
}
const introComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[18px] min-[1200px]:text-[clamp(21px,1.875vw,33px)] leading-snug min-[1200px]:leading-tight">
        {children}
      </p>
    ),
  },
};
const ownerBioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[14px] min-[1200px]:text-[16px] leading-tight mb-4">{children}</p>,
  },
};
export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: rawData } = await sanityFetch({ query: ABOUT_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        ownerSectionLabel: pick(locale, raw.ownerSectionLabel),
        ownerImage: raw.ownerImage,
        ownerNameLabel: pick(locale, raw.ownerNameLabel),
        ownerBio: pickPortableText(locale, raw.ownerBio),
        ownerImageIndex: raw.ownerImageIndex,
        ownerName: raw.ownerName,
        ownerRole: pick(locale, raw.ownerRole),
        introText: pickPortableText(locale, raw.introText),
        introSubtext: pick(locale, raw.introSubtext),
        introImage: raw.introImage,
        awardsTitle: pick(locale, raw.awardsTitle),
        awards: pickList(locale, raw.awards),
        exhibitionsTitle: pick(locale, raw.exhibitionsTitle),
        exhibitions: pickList(locale, raw.exhibitions),
        clientsTitle: pick(locale, raw.clientsTitle),
        clientColumns: (raw.clientColumns ?? []).map((c: any) => ({
          title: pick(locale, c.title),
          clients: pickList(locale, c.clients),
        })),
      }
    : null;

  const columns = data?.clientColumns ?? [];
  const maxRows = Math.max(0, ...columns.map((c: any) => c.clients?.length ?? 0));
  const clientRows = Array.from({ length: maxRows }, (_, i) =>
    columns.map((c: any) => c.clients?.[i] ?? "")
  );
  return (
    <main className="w-full">
      <div className="w-full pt-[150px] min-[1200px]:pt-[clamp(18px,1.5625vw,30px)] min-[1200px]:pb-[clamp(18px,1.5625vw,30px)] pb-[30px] flex flex-col justify-between min-h-[100svh]">
        <div className="relative min-[1200px]:mt-0 min-[1200px]:h-[calc(100svh-2*clamp(18px,1.5625vw,30px))]">
          <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-3 mb-8 min-[1200px]:mb-0 text-center min-[1200px]:text-left">
              <span className="block min-[1200px]:hidden text-[14px]">III</span>
              {data?.ownerSectionLabel && (
                <p className="text-[25px] min-[1200px]:text-[36px]">{data.ownerSectionLabel}</p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-8 min-[1200px]:col-span-10 mb-8 min-[1200px]:mb-0 min-[1200px]:h-full min-[1200px]:flex min-[1200px]:justify-end">
              <SanityImg image={data?.ownerImage} className="aspect-[4/5] min-[1200px]:max-h-full min-[1200px]:max-w-full min-[1200px]:w-auto min-[1200px]:h-auto" />
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-7 min-[1200px]:ml-[1vw] px-5 min-[1200px]:px-0 text-center min-[1200px]:text-left">
              {data?.ownerNameLabel && <p className="hidden min-[1200px]:block underline decoration-1 mb-6">{data.ownerNameLabel}</p>}
              {data?.ownerBio && <PortableText value={data.ownerBio} components={ownerBioComponents} />}
              {data?.ownerImageIndex && <p className="hidden min-[1200px]:block text-[12px] min-[1200px]:text-[10px] mt-8 mb-2">{data.ownerImageIndex}</p>}
              {data?.ownerName && <p className="hidden min-[1200px]:block text-[12px] min-[1200px]:text-[10px]">{data.ownerName}</p>}
              {data?.ownerRole && <p className="hidden min-[1200px]:block text-[12px] min-[1200px]:text-[10px]">{data.ownerRole}</p>}
            </div>
          </Grid>
        </div>
      </div>
      <section className="w-full pt-0 min-[1200px]:pt-[clamp(18px,1.5625vw,30px)] min-[1200px]:pb-[clamp(18px,1.5625vw,30px)] pb-2 flex flex-col min-[1200px]:gap-[30px] min-[1200px]:min-h-0">
        <Grid className="order-2 min-[1200px]:order-none mt-8 min-[1200px]:mt-0 items-start">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-13 text-center min-[1200px]:text-left">
            {data?.introText && <PortableText value={data.introText} components={introComponents} />}
          </div>
          <div className="hidden min-[1200px]:block min-[1200px]:col-start-18 min-[1200px]:col-span-3 min-[1200px]:mt-0">
            {data?.introSubtext && <p className="text-[12px] leading-snug">{data.introSubtext}</p>}
          </div>
        </Grid>
        <Grid className="order-1 min-[1200px]:order-none mt-0 min-[1200px]:mt-0">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 w-[50%] min-[1200px]:w-auto mx-auto min-[1200px]:mx-0">
            <SanityImg image={data?.introImage} className="aspect-[3/4]" />
          </div>
        </Grid>
        <div className="order-3 min-[1200px]:order-none mt-16 min-[1200px]:mt-[clamp(40px,8vh,120px)] flex flex-col min-[1200px]:gap-[50px]">
          <Grid className="items-baseline">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 text-center min-[1200px]:text-left">
              {data?.awardsTitle && (
                <p className="text-[24px] min-[1200px]:text-[clamp(21px,1.875vw,33px)] leading-none">{data.awardsTitle}</p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0 text-center min-[1200px]:text-left">
              <ul className="space-y-1">
                {data?.awards?.map((item: string, i: number) => (
                  <li key={i} className="flex flex-col items-center min-[1200px]:flex-row min-[1200px]:items-baseline justify-center min-[1200px]:justify-start gap-0 min-[1200px]:gap-3 text-[13px] min-[1200px]:text-[16px] leading-tight w-full">
                    <span className="text-[10px] min-[1200px]:text-[8px] shrink-0 min-[1200px]:-translate-y-[1px]">{i + 1}</span>
                    <span className="flex-1 min-[1200px]:flex-1 text-center min-[1200px]:text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid className="mt-16 min-[1200px]:mt-0 items-baseline">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 text-center min-[1200px]:text-left">
              {data?.exhibitionsTitle && (
                <p className="text-[24px] min-[1200px]:text-[clamp(21px,1.875vw,33px)] leading-none">{data.exhibitionsTitle}</p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0 text-center min-[1200px]:text-left">
              <ul className="space-y-1">
                {data?.exhibitions?.map((item: string, i: number) => (
                  <li key={i} className="flex flex-col items-center min-[1200px]:flex-row min-[1200px]:items-baseline justify-center min-[1200px]:justify-start gap-0 min-[1200px]:gap-3 text-[13px] min-[1200px]:text-[16px] leading-tight w-full">
                    <span className="text-[10px] min-[1200px]:text-[8px] shrink-0 min-[1200px]:-translate-y-[1px]">{i + 1}</span>
                    <span className="flex-1 min-[1200px]:flex-1 text-center min-[1200px]:text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid className="mt-16 min-[1200px]:mt-0 items-start">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 text-center min-[1200px]:text-left">
              {data?.clientsTitle && (
                <p className="text-[24px] min-[1200px]:text-[clamp(21px,1.875vw,33px)] leading-none">
                  {data.clientsTitle}
                </p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-12 mt-2 min-[1200px]:mt-0">
              <div className="overflow-x-auto min-[1200px]:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="grid grid-cols-3 min-[1200px]:grid-cols-[auto_auto_auto] min-[1200px]:justify-between gap-x-0 text-[9px] min-[1200px]:text-[11px] min-w-0 min-[1200px]:min-w-0">
                  {columns.map((col: any, i: number) => (
                    <p
                      key={i}
                      className="text-[12px] min-[1200px]:text-[15px] text-center min-[1200px]:text-left whitespace-nowrap translate-y-1 min-[1200px]:translate-y-0"
                    >
                      {col.title}
                    </p>
                  ))}
                  <div className="col-span-3 border-t border-black mt-4" />
                  {clientRows.map((row, i) => (
                    <Fragment key={i}>
                      {row.map((cell: string, j: number) => (
                        <p
                          key={`${i}-${j}`}
                          className="py-1 text-center min-[1200px]:text-left whitespace-nowrap"
                        >
                          {cell}
                        </p>
                      ))}
                      <div className="col-span-3 border-b border-black" />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </section>
    </main>
  );
}
