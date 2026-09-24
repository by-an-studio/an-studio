import { pick as pickSeo } from "../../../../i18n/locale";
import { BodyBackground } from "../../../_components/BodyBackground";
import { ShopWaitlistForm } from "../../../_components/ShopWaitlistForm";
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
    gumroadUrl,
    buyButtonLabel,
    waitlistButtonLabel
  }
}`;

function BuyNowArrow() {
  return (
    <svg width="20" height="8" viewBox="0 0 16 10" fill="none">
      <path d="M1 5H15M15 5L10 1M15 5L10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProductCta({
  product,
  className = "self-start flex items-center gap-2 text-[16px] min-[1200px]:text-[15px]",
}: {
  product: { name?: string; gumroadUrl?: string; comingSoon?: boolean; buyButtonLabel?: string; waitlistButtonLabel?: string };
  className?: string;
}) {
  if (product.comingSoon) {
    return (
      <ShopWaitlistForm
        productName={product.name}
        buttonLabel={product.waitlistButtonLabel || "Join the waitlist"}
        className={className}
      />
    );
  }
  if (product.gumroadUrl) {
    return (
      <a href={product.gumroadUrl} target="_blank" rel="noopener noreferrer" className={className}>
        <BuyNowArrow />
        <span className="italic">{product.buyButtonLabel || "Buy now"}</span>
      </a>
    );
  }
  return null;
}
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
          buyButtonLabel: pick(locale, prod.buyButtonLabel),
          waitlistButtonLabel: pick(locale, prod.waitlistButtonLabel),
        })),
      }
    : null;

  const products = (data?.products ?? []) as Array<{
    categoryLabel: string;
    name: string;
    subtitle: string;
    comingSoon: boolean;
    price: string;
    format: string;
    description: string;
    image: any;
    gumroadUrl: string;
    buyButtonLabel: string;
    waitlistButtonLabel: string;
  }>;
  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 flex flex-col justify-between min-h-[100svh]">
      <BodyBackground color="#FFFDE8" />
      <div className="relative min-[1200px]:mt-0">
        <div className="min-[1200px]:hidden px-5 flex flex-col gap-12">
          <div className="text-center">
            <span className="block text-[14px]">VI</span>
            {data?.title && <p className="text-[32px]">{data.title}</p>}
            {data?.tagline && (
              <p className="italic text-[18px] leading-tight mt-4 px-10">{data.tagline}</p>
            )}
          </div>
          {products.length > 0 && (
            <div className="px-5 flex flex-col gap-12">
              {products.map((product, i) => (
                <div key={i} className="border border-black/60 p-5 flex flex-col gap-8">
                  <ProductImage image={product.image} />
                  <div className="text-center flex flex-col gap-8">
                    <div className="leading-tight">
                      {product.categoryLabel && (
                        <p className="not-italic text-[16px] leading-tight mb-0">
                          For <em className="italic">{product.categoryLabel}</em>
                        </p>
                      )}
                      {product.name && (
                        <p className="text-[28px] leading-tight underline decoration-[1.5px] underline-offset-4">
                          {product.name}
                        </p>
                      )}
                      {product.subtitle && <p className="mt-2 text-[16px] leading-tight">{product.subtitle}</p>}
                    </div>
                    {(product.format || product.price) && (
                      <div className="flex justify-center gap-8">
                        {product.format && (
                          <div>
                            <p className="text-[16px]">FORMAT:</p>
                            <p className="text-[16px]">{product.format}</p>
                          </div>
                        )}
                        {product.price && (
                          <div>
                            <p className="text-[16px]">PRICE:</p>
                            <p className="italic text-[16px]">{product.price}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {product.description && (
                      <p className="text-[14px] leading-snug">{product.description}</p>
                    )}
                    <ProductCta product={product} className="self-center flex items-center gap-2 text-[16px]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="hidden min-[1200px]:block min-[1200px]:min-h-[calc(100svh-150px)]">
          <Grid className="min-[1200px]:pt-[150px] min-[1200px]:min-h-[100svh] pb-[30px]">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-3 min-[1200px]:self-start min-[1200px]:h-[calc(100svh-150px)] min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:justify-center min-[1200px]:-mt-16">
              {data?.title && (
                <p className="text-[32px] min-[1200px]:text-[33px] min-[1200px]:col-span-6">{data.title}</p>
              )}
              {data?.tagline && (
                <p className="italic text-[24px] min-[1200px]:text-[21px] leading-tight min-[1200px]:col-span-4">{data.tagline}</p>
              )}
            </div>
            {products.length > 0 && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-14 min-[1200px]:col-span-11 flex flex-col gap-16 min-[1200px]:gap-0">
              {products.map((product, i) => (
                <div
                  key={i}
                  className={
                    i === 0
                      ? "pt-[30px]"
                      : "pt-16 min-[1200px]:pt-[25px] min-[1200px]:mt-[25px] min-[1200px]:border-t-[0.5px] min-[1200px]:border-black"
                  }
                >
                  <div className="grid grid-cols-2 gap-5 min-[1200px]:grid-cols-13">
                    <div className="col-span-2 md:max-[1199px]:col-span-2 min-[1200px]:col-span-6 mb-16 min-[1200px]:mb-0">
                      <ProductImage image={product.image} />
                    </div>
                    <div className="col-span-2 md:max-[1199px]:col-span-2 min-[1200px]:col-start-8 min-[1200px]:col-span-6 min-[1200px]:-ml-10 flex flex-col gap-16 min-[1200px]:gap-16 min-[1200px]:justify-between">
                      <div className="leading-tight">
                        {product.categoryLabel && (
                          <p className="not-italic text-[16px] min-[1200px]:text-[15px] leading-tight mb-0">
                            For <em className="italic">{product.categoryLabel}</em>
                          </p>
                        )}
                        {product.name && (
                          <p className="text-[28px] min-[1200px]:text-[28px] leading-tight underline decoration-[1.5px] underline-offset-4">
                            {product.name}
                          </p>
                        )}
                        {product.subtitle && <p className="mt-2 text-[16px] min-[1200px]:text-[15px] leading-tight">{product.subtitle}</p>}
                      </div>
                      <div className={`flex flex-col gap-8 ${product.comingSoon ? "min-[1200px]:-mt-24" : ""}`}>
                        {product.comingSoon && (
                          <p className="italic text-[16px] min-[1200px]:text-[15px]">Coming Soon!</p>
                        )}
                        {(product.format || product.price) && (
                          <div className="flex gap-8">
                            {product.format && (
                              <div>
                                <p className="text-[16px] min-[1200px]:text-[15px]">FORMAT:</p>
                                <p className="text-[16px] min-[1200px]:text-[15px]">{product.format}</p>
                              </div>
                            )}
                            {product.price && (
                              <div>
                                <p className="text-[16px] min-[1200px]:text-[15px]">PRICE:</p>
                                <p className="italic text-[16px] min-[1200px]:text-[15px]">{product.price}</p>
                              </div>
                            )}
                          </div>
                        )}
                        {product.description && (
                          <p className="text-[14px] min-[1200px]:text-[14px] leading-snug">{product.description}</p>
                        )}
                        <ProductCta product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Grid>
        </div>
      </div>
    </main>
  );
}
