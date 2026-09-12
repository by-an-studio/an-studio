import { pick as pickSeo } from "../../../../i18n/locale";
import { FadeImage } from "../../../_components/FadeImage";
import { Grid } from "../../../_components/Grid";
import { urlFor } from "../../../../sanity/lib/image";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, toLocale, buildAlternates } from "../../../../i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const SEO_QUERY = `*[_type == "shop"][0]{ seo }`;
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.shop" });
  const { data } = await sanityFetch({ query: SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pickSeo(locale, seoData?.metaTitle) || t("title");
  const description = pickSeo(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/shop"),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const SHOP_QUERY = `*[_type == "shop"][0]{
  title,
  tagline,
  products[]{
    categoryLabel,
    name,
    subtitle,
    comingSoon,
    price,
    format,
    description,
    image,
    gumroadUrl
  }
}`;

function ProductImage({ image }: { image?: any }) {
  if (!image) return null;
  const rawUrl = urlFor(image).url();
  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
  const src = isGif ? rawUrl : urlFor(image).width(1800).url();
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden">
      <FadeImage src={src} alt="" fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 45vw, 60vw" className="object-cover" />
    </div>
  );
}
export default async function Shop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: rawData } = await sanityFetch({ query: SHOP_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        title: pick(locale, raw.title),
        tagline: pick(locale, raw.tagline),
        products: (raw.products ?? []).map((prod: any) => ({
          categoryLabel: pick(locale, prod.categoryLabel),
          name: pick(locale, prod.name),
          subtitle: pick(locale, prod.subtitle),
          comingSoon: prod.comingSoon,
          price: prod.price,
          format: pick(locale, prod.format),
          description: pick(locale, prod.description),
          image: prod.image,
          gumroadUrl: prod.gumroadUrl,
        })),
      }
    : null;

  const product = data?.products?.[0];
  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 flex flex-col justify-between min-h-[100svh]">
      <div className="relative min-[1200px]:mt-0 min-[1200px]:h-[100svh]">
        <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center pb-[30px]">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-6 mb-16 min-[1200px]:mb-0 grid grid-cols-1 min-[1200px]:grid-cols-6">
            {data?.title && (
              <p className="text-[32px] min-[1200px]:text-[36px] min-[1200px]:col-span-6">{data.title}</p>
            )}
            {data?.tagline && (
              <p className="italic text-[24px] leading-tight min-[1200px]:col-span-4">{data.tagline}</p>
            )}
          </div>
          {product && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-13 min-[1200px]:self-end grid grid-cols-2 gap-5 min-[1200px]:grid-cols-13">
              <div className="col-span-2 md:max-[1199px]:col-span-2 min-[1200px]:col-span-5 mb-16 min-[1200px]:mb-0 flex flex-col gap-16 min-[1200px]:gap-0 min-[1200px]:justify-between">
                <div>
                  {product.categoryLabel && (
                    <p className="italic text-[16px] min-[1200px]:text-[18px] mb-2">
                      For <em>{product.categoryLabel}</em>
                    </p>
                  )}
                  {product.name && (
                    <p className="text-[28px] min-[1200px]:text-[40px] underline decoration-2 underline-offset-4">
                      {product.name}
                    </p>
                  )}
                  {product.subtitle && <p className="text-[20px] min-[1200px]:text-[26px]">{product.subtitle}</p>}
                </div>
                <div className="flex flex-col gap-8">
                  {product.comingSoon && <p className="italic text-[16px] min-[1200px]:text-[18px]">Coming Soon!</p>}
                  {product.price && (
                    <div>
                      <p className="text-[16px] min-[1200px]:text-[18px]">PRICE:</p>
                      <p className="italic text-[16px] min-[1200px]:text-[18px]">{product.price}</p>
                    </div>
                  )}
                  {product.format && (
                    <div>
                      <p className="text-[16px] min-[1200px]:text-[18px]">FORMAT:</p>
                      <p className="text-[16px] min-[1200px]:text-[18px]">{product.format}</p>
                    </div>
                  )}
                  {product.description && (
                    <p className="text-[15px] min-[1200px]:text-[18px] leading-snug">{product.description}</p>
                  )}
                </div>
              </div>
              <div className="col-span-2 md:max-[1199px]:col-span-2 min-[1200px]:col-start-6 min-[1200px]:col-span-8">
                <ProductImage image={product.image} />
              </div>
            </div>
          )}
        </Grid>
      </div>
    </main>
  );
}
