import type { Metadata } from "next";
import { FadeImage } from "../../../../_components/FadeImage";
import { FadeVideo } from "../../../../_components/FadeVideo";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Link } from "../../../../../i18n/navigation";
import { Grid } from "../../../../_components/Grid";
import { sanityFetch } from "../../../../../sanity/lib/live";
import { urlFor } from "../../../../../sanity/lib/image";
import { pick, toLocale, pickPortableText, buildAlternates, type Loc } from "../../../../../i18n/locale";
const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  title,
  projectNumber,
  category,
  mainImage,
  seo,
  subtitleLine,
  collaboration,
  aboutParagraph,
  projectTags,
  bottomParagraph,
  variant,
  simpleLayout,
  rightIntroText,
  image1,
  image2,
  galleryImages,
  visualIdentityText,
  timelineDuration,
  timelineService,
  timelineText,
  mutedCaption,
  image7,
  image8,
  finalText,
  image9,
  simpleCaptionText,
  simpleImages
}`;
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } });
  const r = data as any;
  if (!r) return {};
  const seoData = r.seo;
  const fallbackTitle = `${r.title} — An Studio`;
  const fallbackDescription =
    locale === "es"
      ? `Proyecto de ${r.category} por An Studio.`
      : `A ${r.category} project by An Studio.`;
  const title = pick(locale, seoData?.metaTitle) || fallbackTitle;
  const description = pick(locale, seoData?.metaDescription) || fallbackDescription;
  const ogImage = seoData?.ogImage ?? r.mainImage;
  const ogImageUrl = ogImage ? urlFor(ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/work/${slug}`),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

function BackNextArrow({ flipped }: { flipped?: boolean }) {
  return (
    <svg width="10" height="8" viewBox="0 0 16 10" fill="none" className={flipped ? "rotate-180" : ""}>
      <path d="M1 5H15M15 5L10 1M15 5L10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GalleryArrow({ flipped }: { flipped?: boolean }) {
  return (
    <svg width="25" height="7" viewBox="0 0 25 7" fill="none" className={flipped ? "rotate-180" : ""}>
      <path d="M1 3.5H24M24 3.5L20 0.7M24 3.5L20 6.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  },
  marks: {
    underline: ({ children }) => <span className="underline decoration-1">{children}</span>,
  },
};
function RichText({ value, className }: { value?: any[]; className?: string }) {
  if (!value || value.length === 0) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={richTextComponents} />
    </div>
  );
}
function hasRichText(value?: any[]) {
  return Boolean(value && value.length > 0);
}
type ImageWithTags = { image: any; videoUrl?: string; tags?: string[] };
type SimpleImage = { image: any; videoUrl?: string; mediaType?: "Img" | "Video"; tags?: string[] };
type ProjectData = {
  title: string;
  projectNumber: string;
  category: string;
  subtitleLine?: string;
  collaboration?: string;
  aboutParagraph?: any[];
  projectTags?: string[];
  bottomParagraph?: any[];
  variant: "gallery" | "simple";
  simpleLayout?: "single" | "double" | "gallery" | "singleWide";
  rightIntroText?: any[];
  image1?: ImageWithTags;
  image2?: ImageWithTags;
  galleryImages?: ImageWithTags[];
  visualIdentityText?: any[];
  timelineDuration?: string;
  timelineService?: string;
  timelineText?: any[];
  mutedCaption?: any[];
  image7?: ImageWithTags;
  image8?: ImageWithTags;
  finalText?: any[];
  image9?: ImageWithTags;
  simpleCaptionText?: any[];
  simpleImages?: SimpleImage[];
};
function ProjectImg({ item, className, sizes = "(min-width: 1200px) 55vw, 100vw" }: { item?: ImageWithTags | SimpleImage; className?: string; sizes?: string }) {
  if (!item?.image && !item?.videoUrl) return null;
  if (item.videoUrl) {
    const posterUrl = item.image ? urlFor(item.image).width(1600).url() : undefined;
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <FadeVideo
          src={item.videoUrl}
          poster={posterUrl}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }
  if (!item.image) return null;
  const rawUrl = urlFor(item.image).url();
  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
  const src = isGif ? rawUrl : urlFor(item.image).width(2000).url();
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <FadeImage src={src} alt="" fill unoptimized={isGif} quality={90} sizes={sizes} className="object-cover" />
    </div>
  );
}
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: raw } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!raw) return notFound();
  const r = raw as any;
  const p: ProjectData = {
    ...r,
    subtitleLine: pick(locale, r.subtitleLine),
    collaboration: pick(locale, r.collaboration),
    aboutParagraph: pickPortableText(locale, r.aboutParagraph),
    bottomParagraph: pickPortableText(locale, r.bottomParagraph),
    rightIntroText: pickPortableText(locale, r.rightIntroText),
    visualIdentityText: pickPortableText(locale, r.visualIdentityText),
    timelineDuration: pick(locale, r.timelineDuration),
    timelineService: pick(locale, r.timelineService),
    timelineText: pickPortableText(locale, r.timelineText),
    mutedCaption: pickPortableText(locale, r.mutedCaption),
    finalText: pickPortableText(locale, r.finalText),
    simpleCaptionText: pickPortableText(locale, r.simpleCaptionText),
    projectTags: ((r.projectTags ?? []) as Loc[])
      .map((t) => pick(locale, t))
      .filter((t): t is string => Boolean(t)),
  };
  return (
    <main className={`w-full ${p.variant === "gallery" ? "pb-[30px]" : ""}`}>
      <div className="relative min-[1200px]:min-h-[100svh] flex flex-col gap-16 min-[1200px]:gap-[50px]">
        <Grid>
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21 pt-[150px] flex justify-between">
            <Link href="/work" className="flex items-center gap-3 text-[14px] uppercase">
              <BackNextArrow flipped />
              <span>Back</span>
            </Link>
            <Link href="/work" className="flex items-center gap-3 text-[14px] uppercase">
              <span>Next</span>
              <BackNextArrow />
            </Link>
          </div>
        </Grid>
        <Grid className="pb-[30px] min-[1200px]:flex-1 min-[1200px]:min-h-0 items-start min-[1200px]:items-center">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:4/15] min-[1400px]:[grid-column:4/14] min-[1600px]:[grid-column:4/13] min-[1800px]:[grid-column:4/12] min-[1200px]:self-stretch mb-8 min-[1200px]:mb-0 flex flex-col">
            <div>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px]">({p.projectNumber}.)</p>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px]">{p.title}</p>
              {p.subtitleLine && (
                <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px] mb-8">{p.subtitleLine}</p>
              )}
              {p.collaboration && (
                <p className="italic text-[16px] min-[1200px]:text-[18px] mb-8">
                  In Collaboration with <span className="underline decoration-1">{p.collaboration}</span>
                </p>
              )}
              {hasRichText(p.aboutParagraph) && (
                <p className="underline decoration-1 mb-4 text-[18px]">(About)</p>
              )}
              <RichText value={p.aboutParagraph} className="text-[18px] leading-tight mb-8" />
              {p.projectTags && p.projectTags.length > 0 && (
                <>
                  <p className="underline decoration-1 mb-4 text-[18px]">(Categories)</p>
                  <div className="flex flex-wrap gap-4 min-[1200px]:gap-8 text-[12px] uppercase">
                    {p.projectTags.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <RichText
              value={p.bottomParagraph}
              className="text-[16px] min-[1200px]:text-[18px] leading-tight mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8"
            />
          </div>
          {p.variant === "gallery" ? (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
              {hasRichText(p.rightIntroText) && (
                <div className="grid grid-cols-9 gap-5 mb-8">
                  <RichText value={p.rightIntroText} className="col-span-8 text-[16px] min-[1200px]:text-[18px] leading-tight" />
                </div>
              )}
              <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5">
                <div className="col-span-1 min-[1200px]:col-span-3">
                  <ProjectImg item={p.image1} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 18vw, 65vw" />
                  {p.image1 && (
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 01</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[15px]">
                          {p.image1.tags?.map((t, i) => <p key={i}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-1 min-[1200px]:col-start-4 min-[1200px]:col-span-6">
                  <ProjectImg item={p.image2} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 33vw, 65vw" />
                  {p.image2 && (
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 02</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[15px]">
                          {p.image2.tags?.map((t, i) => <p key={i}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <SimpleRight p={p} />
          )}
        </Grid>
      </div>
      {p.variant === "gallery" && p.galleryImages && p.galleryImages.length > 0 && (
        <Grid className="mt-24">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21">
            <div className="flex overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1200px]:grid min-[1200px]:grid-cols-4 min-[1200px]:overflow-visible">
              {p.galleryImages.map((img, i) => (
                <div key={i} className="shrink-0 w-[75vw] min-[1200px]:w-auto">
                  <ProjectImg item={img} className="aspect-[3/4] mb-4" sizes="(min-width: 1200px) 30vw, 90vw" />
                  <div className="flex gap-2 text-[12px]">
                    <span>Img. {String(i + 3).padStart(2, "0")}</span>
                    <div>
                      <p>{p.title}</p>
                      <div className="text-muted mt-[15px]">
                        {img.tags?.map((t, j) => <p key={j}>{t}</p>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      )}
      {p.variant === "gallery" && (
        <Grid className="mt-24 items-start">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-8 mb-16 min-[1200px]:mb-0 min-[1200px]:self-stretch flex flex-col">
            <RichText value={p.visualIdentityText} className="text-[16px] min-[1200px]:text-[18px] leading-tight mb-8" />
            {(p.timelineDuration || p.timelineService || hasRichText(p.timelineText)) && (
              <div className="grid grid-cols-8 gap-5 mb-8">
                <div className="col-span-3 min-[1200px]:col-span-2 text-[12px] uppercase">
                  {p.timelineDuration && (
                    <>
                      <p>Timeline:</p>
                      <p className="mb-4">{p.timelineDuration}</p>
                    </>
                  )}
                  {p.timelineService && (
                    <>
                      <p>Service:</p>
                      <p>{p.timelineService}</p>
                    </>
                  )}
                </div>
                <RichText value={p.timelineText} className="col-span-5 min-[1200px]:col-span-6 text-[16px] min-[1200px]:text-[18px] leading-tight" />
              </div>
            )}
            <RichText value={p.mutedCaption} className="text-muted text-[12px]" />
            {(p.image7 || p.image8) && (
              <div className="grid grid-cols-2 min-[1200px]:grid-cols-8 gap-5 mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
                {p.image7 && (
                  <div className="col-span-1 min-[1200px]:col-span-3">
                    <ProjectImg item={p.image7} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 20vw, 65vw" />
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 07</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[15px]">
                          {p.image7.tags?.map((t, i) => <p key={i}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {p.image8 && (
                  <div className="col-span-1 min-[1200px]:col-span-3">
                    <ProjectImg item={p.image8} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 20vw, 65vw" />
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 08</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[15px]">
                          {p.image8.tags?.map((t, i) => <p key={i}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {hasRichText(p.finalText) && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:13/17] min-[1600px]:[grid-column:13/16] mb-8 min-[1200px]:mb-0">
              <RichText value={p.finalText} className="text-[16px] min-[1200px]:text-[14px] leading-tight" />
            </div>
          )}
          {p.image9 && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-7">
              <ProjectImg item={p.image9} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 40vw, 100vw" />
              <div className="flex gap-2 text-[12px]">
                <span>Img. 09</span>
                <div>
                  <p>{p.title}</p>
                  <div className="text-muted mt-[15px]">
                    {p.image9.tags?.map((t, i) => <p key={i}>{t}</p>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid>
      )}
    </main>
  );
}
function SimpleRight({ p }: { p: ProjectData }) {
  const images = p.simpleImages ?? [];
  const captionBlock = (idx: number, item: SimpleImage) => (
    <div className="min-[1200px]:absolute min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px]">
      <span>{item.mediaType ?? "Img"}. {String(idx + 1).padStart(2, "0")}</span>
      <div>
        <p>{p.title}</p>
        <div className="text-muted mt-[15px]">
          {item.tags?.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </div>
    </div>
  );
  if (p.simpleLayout === "double") {
    const [img1, img2] = images;
    return (
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-14 min-[1200px]:col-span-11 min-[1200px]:self-stretch flex flex-col justify-end">
        {hasRichText(p.simpleCaptionText) && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-11 gap-5 mb-8">
            <RichText
              value={p.simpleCaptionText}
              className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7"
            />
          </div>
        )}
        <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-11 min-[1200px]:items-end">
          <div className="relative min-[1200px]:col-span-1">
            {img1 && captionBlock(0, img1)}
          </div>
          <ProjectImg item={img1} className="aspect-[9/16] min-[1200px]:col-span-5" sizes="(min-width: 1200px) 28vw, 65vw" />
          <ProjectImg item={img2} className="aspect-[9/16] min-[1200px]:col-span-5" sizes="(min-width: 1200px) 28vw, 65vw" />
        </div>
      </div>
    );
  }
  if (p.simpleLayout === "gallery") {
    const first = images[0];
    return (
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
        {hasRichText(p.simpleCaptionText) && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
            <RichText
              value={p.simpleCaptionText}
              className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7"
            />
          </div>
        )}
        <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9">
          <div className="relative min-[1200px]:col-span-1">
            {first && captionBlock(0, first)}
            <button type="button" aria-label="Previous" className="hidden min-[1200px]:flex absolute left-0 top-1/2 -translate-y-1/2">
              <GalleryArrow flipped />
            </button>
          </div>
          <div className="min-[1200px]:col-span-7">
            <div className="flex overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1200px]:overflow-visible">
              {(first?.image || first?.videoUrl) && (() => {
                if (first.videoUrl) {
                  return (
                    <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] rounded-full overflow-hidden">
                      <FadeVideo
                        src={first.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  );
                }
                const rawUrl = urlFor(first.image).url();
                const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
                const src = isGif ? rawUrl : urlFor(first.image).width(2000).url();
                return (
                  <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] rounded-full overflow-hidden">
                    <FadeImage src={src} alt="" fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 28vw, 95vw" className="object-cover" />
                  </div>
                );
              })()}
            </div>
          </div>
          <div className="relative min-[1200px]:col-span-1">
            <button type="button" aria-label="Next" className="hidden min-[1200px]:flex absolute right-0 top-1/2 -translate-y-1/2">
              <GalleryArrow />
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (p.simpleLayout === "singleWide") {
    const first = images[0];
    return (
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
        {hasRichText(p.simpleCaptionText) && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
            <RichText
              value={p.simpleCaptionText}
              className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-3 min-[1200px]:col-span-7"
            />
          </div>
        )}
        <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9">
          <div className="relative min-[1200px]:col-span-2">
            {first && captionBlock(0, first)}
          </div>
          <ProjectImg item={first} className="aspect-[4/5] w-full min-[1200px]:col-start-3 min-[1200px]:col-span-7" sizes="(min-width: 1200px) 40vw, 100vw" />
        </div>
      </div>
    );
  }
  const first = images[0];
  return (
    <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col justify-end">
      <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9 min-[1200px]:items-end">
        <div className="relative min-[1200px]:col-span-4">
          {first && captionBlock(0, first)}
        </div>
        <ProjectImg item={first} className="aspect-[9/16] min-[1200px]:col-span-5" sizes="(min-width: 1200px) 28vw, 100vw" />
      </div>
    </div>
  );
}
