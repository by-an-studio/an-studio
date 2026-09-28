import { BodyBackground } from "../../../../_components/BodyBackground";
import type { Metadata } from "next";
import { FadeImage } from "../../../../_components/FadeImage";
import { FadeVideo } from "../../../../_components/FadeVideo";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Link } from "../../../../../i18n/navigation";
import { Grid } from "../../../../_components/Grid";
import { GalleryCarousel } from "../../../../_components/GalleryCarousel";
import { sanityFetch } from "../../../../../sanity/lib/live";
import { urlFor } from "../../../../../sanity/lib/image";
import { pick, toLocale, pickPortableText, buildAlternates, type Loc } from "../../../../../i18n/locale";
const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug && soon != true][0]{
  title,
  projectNumber,
  categories,
  mainImage,
  seo,
  subtitleLine,
  collaboration,
  imageTag1,
  imageTag2,
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
const ALL_PROJECT_SLUGS_QUERY = `*[_type == "project" && soon != true] | order(order asc, _createdAt asc){
  "slug": slug.current
}`;
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } });
  const r = data as any;
  if (!r) return {};
  const seoData = r.seo;
  const fallbackTitle = `${r.title} — An Studio`;
  const categoryLabel = (r.categories ?? []).join(", ");
  const fallbackDescription =
    locale === "es"
      ? `Proyecto de ${categoryLabel} por An Studio.`
      : `A ${categoryLabel} project by An Studio.`;
  const title = pick(locale, seoData?.metaTitle) || fallbackTitle;
  const description = pick(locale, seoData?.metaDescription) || fallbackDescription;
  const ogImage = seoData?.ogImage ?? r.mainImage;
  const ogImageUrl = ogImage ? urlFor(ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, `/work/${slug}`),
    openGraph: { title, description, siteName: "An Studio", images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

function BackNextArrow({ flipped }: { flipped?: boolean }) {
  return (
    <svg width="10" height="8" viewBox="0 0 16 10" fill="none" className={flipped ? "rotate-180" : ""}>
      <path d="M1 5H15M15 5L10 1M15 5L10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  },
  marks: {
    underline: ({ children }) => <span className="underline decoration-1">{children}</span>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline decoration-1">
        {children}
      </a>
    ),
  },
};
const collaborationComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <span className="underline decoration-1">{children}</span>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
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
type ImageWithTags = { image: any; videoUrl?: string };
type SimpleImage = { image: any; videoUrl?: string; mediaType?: "Img" | "Video"; tags?: string[] };
type ProjectData = {
  title: string;
  projectNumber: string;
  categories?: string[];
  subtitleLine?: string;
  collaboration?: any[];
  imageTag1?: string;
  imageTag2?: string;
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
          className="absolute inset-0 w-full h-full object-contain"
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
  const [{ data: raw }, { data: allSlugsData }] = await Promise.all([
    sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch({ query: ALL_PROJECT_SLUGS_QUERY }),
  ]);
  if (!raw) return notFound();
  const r = raw as any;
  const allSlugs = ((allSlugsData ?? []) as { slug: string }[]).map((s) => s.slug);
  const currentIndex = allSlugs.indexOf(slug);
  const prevSlug = currentIndex === -1 ? null : allSlugs[(currentIndex - 1 + allSlugs.length) % allSlugs.length];
  const nextSlug = currentIndex === -1 ? null : allSlugs[(currentIndex + 1) % allSlugs.length];
  const p: ProjectData = {
    ...r,
    subtitleLine: pick(locale, r.subtitleLine),
    collaboration: pickPortableText(locale, r.collaboration),
    imageTag1: pick(locale, r.imageTag1),
    imageTag2: pick(locale, r.imageTag2),
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
      {/* Un solo H1 por página: el título visible está duplicado (móvil/escritorio) y se marca aria-hidden */}
      <h1 className="sr-only">{p.subtitleLine ? `${p.title} — ${p.subtitleLine}` : p.title}</h1>
      <BodyBackground color="#FFFEFC" />
      <div className="relative min-[1200px]:min-h-[100svh] flex flex-col gap-0 min-[1200px]:gap-[clamp(60px,8vh,150px)]">
        <Grid className="relative z-20">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21 pt-[150px] min-[1200px]:pt-[clamp(110px,11.5vh,165px)] flex justify-between">
            <Link
              href={prevSlug ? `/work/${prevSlug}` : "/work"}
              className="flex items-center gap-3 text-[14px] min-[1200px]:text-[12px] uppercase"
            >
              <BackNextArrow flipped />
              <span>Back</span>
            </Link>
            <Link
              href={nextSlug ? `/work/${nextSlug}` : "/work"}
              className="flex items-center gap-3 text-[14px] min-[1200px]:text-[12px] uppercase"
            >
              <span>Next</span>
              <BackNextArrow />
            </Link>
          </div>
        </Grid>
        {p.variant === "gallery" && (
          <div className="min-[1200px]:hidden -mt-6 px-5 flex flex-col gap-12">
            <div className="text-center">
              <div aria-hidden="true">
                <span className="block text-[25px] leading-tight">({p.projectNumber}.)</span>
                <span className="block text-[25px] leading-tight">{p.title}</span>
                {p.subtitleLine && (
                  <span className="block text-[25px] leading-tight">{p.subtitleLine}</span>
                )}
              </div>
              {hasRichText(p.collaboration) && (
                <p className="italic text-[13px] mt-4">
                  In Collaboration with{" "}
                  <PortableText value={p.collaboration} components={collaborationComponents} />
                </p>
              )}
            </div>
            <RichText value={p.rightIntroText} className="text-[14px] leading-tight text-center px-6" />
            <ProjectImg item={p.image2} className="aspect-[4/5]" sizes="90vw" />
            <div className="text-center">
              {hasRichText(p.aboutParagraph) && (
                <h2 className="underline decoration-1 mb-4 text-[15px]">(About)</h2>
              )}
              <RichText value={p.aboutParagraph} className="text-[14px] leading-tight" />
            </div>
            {p.projectTags && p.projectTags.length > 0 && (
              <div className="text-center">
                <h2 className="underline decoration-1 mb-4 text-[15px]">(Categories)</h2>
                <div className="flex flex-wrap justify-center gap-2 text-[clamp(8px,2.6vw,12px)] uppercase">
                  {p.projectTags.map((t, i) => (
                    <h3 key={i}>{t}</h3>
                  ))}
                </div>
              </div>
            )}
            {p.galleryImages && p.galleryImages.length > 0 && (
              <div className="grid grid-cols-2 gap-5">
                {p.galleryImages.map((img, i) => (
                  <ProjectImg key={i} item={img} className="aspect-[3/4]" sizes="45vw" />
                ))}
              </div>
            )}
            <RichText value={p.visualIdentityText} className="text-[14px] leading-tight text-center" />
            {(p.timelineDuration || p.timelineService || hasRichText(p.timelineText)) && (
              <div className="flex flex-col gap-8">
                <div className="flex justify-center gap-8 text-[12px] uppercase text-center">
                  {p.timelineDuration && (
                    <div>
                      <p>Timeline:</p>
                      <p>{p.timelineDuration}</p>
                    </div>
                  )}
                  {p.timelineService && (
                    <div>
                      <p>Service:</p>
                      <p>{p.timelineService}</p>
                    </div>
                  )}
                </div>
                <RichText value={p.timelineText} className="text-[14px] leading-tight text-center" />
              </div>
            )}
            <RichText value={p.mutedCaption} className="text-muted text-[11px] text-center leading-tight" />
            {p.image9 && <ProjectImg item={p.image9} className="aspect-[4/5]" sizes="90vw" />}
            <RichText value={p.finalText} className="text-[11px] leading-tight text-center px-6" />
          </div>
        )}
        {p.variant === "simple" && (
          <div className="min-[1200px]:hidden -mt-6 px-5 flex flex-col gap-12">
            <div className="text-center">
              <div aria-hidden="true">
                <span className="block text-[25px] leading-tight">({p.projectNumber}.)</span>
                <span className="block text-[25px] leading-tight">{p.title}</span>
                {p.subtitleLine && (
                  <span className="block text-[25px] leading-tight">{p.subtitleLine}</span>
                )}
              </div>
              {hasRichText(p.collaboration) && (
                <p className="italic text-[13px] mt-4">
                  In Collaboration with{" "}
                  <PortableText value={p.collaboration} components={collaborationComponents} />
                </p>
              )}
            </div>
            <RichText value={p.simpleCaptionText} className="text-[14px] leading-tight text-center px-6" />
            {p.simpleLayout === "double" && (
              <div className="flex flex-col gap-5">
                <ProjectImg item={p.simpleImages?.[0]} className="aspect-[4/5]" sizes="90vw" />
                <ProjectImg item={p.simpleImages?.[1]} className="aspect-[4/5]" sizes="90vw" />
              </div>
            )}
            {p.simpleLayout === "gallery" && (
              <GalleryCarousel images={p.simpleImages ?? []} title={p.title} />
            )}
            {p.simpleLayout === "singleWide" && (
              <ProjectImg item={p.simpleImages?.[0]} className="aspect-[9/16]" sizes="90vw" />
            )}
            {p.simpleLayout !== "double" && p.simpleLayout !== "gallery" && p.simpleLayout !== "singleWide" && (
              <ProjectImg item={p.simpleImages?.[0]} className="aspect-[4/5]" sizes="90vw" />
            )}
            <div className="text-center">
              {hasRichText(p.aboutParagraph) && (
                <h2 className="underline decoration-1 mb-4 text-[15px]">(About)</h2>
              )}
              <RichText value={p.aboutParagraph} className="text-[14px] leading-tight" />
            </div>
            {p.projectTags && p.projectTags.length > 0 && (
              <div className="text-center">
                <h2 className="underline decoration-1 mb-4 text-[15px]">(Categories)</h2>
                <div className="flex flex-wrap justify-center gap-2 text-[clamp(8px,2.6vw,12px)] uppercase">
                  {p.projectTags.map((t, i) => (
                    <h3 key={i}>{t}</h3>
                  ))}
                </div>
              </div>
            )}
            <RichText value={p.bottomParagraph} className="text-[14px] leading-tight text-center" />
          </div>
        )}
        <Grid className="hidden min-[1200px]:grid pb-[30px] min-[1200px]:flex-1 min-[1200px]:min-h-0 items-start min-[1200px]:items-center">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:4/15] min-[1400px]:[grid-column:4/14] min-[1600px]:[grid-column:4/13] min-[1800px]:[grid-column:4/12] min-[1200px]:self-stretch mb-8 min-[1200px]:mb-0 flex flex-col">
            <div>
              <div aria-hidden="true">
                <span className="block underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[37px] leading-tight">({p.projectNumber}.)</span>
                <span className="block underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[37px] leading-tight">{p.title}</span>
                {p.subtitleLine && (
                  <span className="block underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[37px] leading-tight mb-8">{p.subtitleLine}</span>
                )}
              </div>
              {hasRichText(p.collaboration) && (
                <p className="italic text-[15px] min-[1200px]:text-[16px] mb-8">
                  In Collaboration with{" "}
                  <PortableText value={p.collaboration} components={collaborationComponents} />
                </p>
              )}
              {hasRichText(p.aboutParagraph) && (
                <p className="underline decoration-1 mb-4 text-[18px] min-[1200px]:text-[15px]">(About)</p>
              )}
              <RichText value={p.aboutParagraph} className="text-[17px] min-[1200px]:text-[16px] leading-tight mb-8" />
              {p.projectTags && p.projectTags.length > 0 && (
                <>
                  <p className="underline decoration-1 mb-16 text-[18px] min-[1200px]:text-[16px]">(Categories)</p>
                  <div className="flex flex-wrap gap-4 min-[1200px]:gap-8 text-[12px] min-[1200px]:text-[10px] uppercase">
                    {p.projectTags.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <RichText
              value={p.bottomParagraph}
              className="text-[14px] min-[1200px]:text-[16px] leading-tight mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8"
            />
          </div>
          {p.variant === "gallery" ? (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
              {hasRichText(p.rightIntroText) && (
                <div className="grid grid-cols-9 gap-5 mb-8">
                  <RichText value={p.rightIntroText} className="col-span-8 text-[14px] min-[1200px]:text-[16px] leading-tight" />
                </div>
              )}
              <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5">
                <div className="col-span-1 min-[1200px]:col-span-3">
                  <ProjectImg item={p.image1} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 18vw, 65vw" />
                  {p.image1 && (
                    <div className="flex gap-2 text-[12px] min-[1200px]:text-[10px]">
                      <span>Img. 01</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[9px] leading-tight">
                          {p.imageTag1 && <p>{p.imageTag1}</p>}
                          {p.imageTag2 && <p>{p.imageTag2}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-1 min-[1200px]:col-start-4 min-[1200px]:col-span-6">
                  <ProjectImg item={p.image2} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 33vw, 65vw" />
                  {p.image2 && (
                    <div className="flex gap-2 text-[12px] min-[1200px]:text-[10px]">
                      <span>Img. 02</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[9px] leading-tight">
                          {p.imageTag1 && <p>{p.imageTag1}</p>}
                          {p.imageTag2 && <p>{p.imageTag2}</p>}
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
        <Grid className="hidden min-[1200px]:grid mt-24">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21">
            <div className="flex overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1200px]:grid min-[1200px]:grid-cols-4 min-[1200px]:overflow-visible">
              {p.galleryImages.map((img, i) => (
                <div key={i} className="shrink-0 w-[75vw] min-[1200px]:w-auto">
                  <ProjectImg item={img} className="aspect-[3/4] mb-4" sizes="(min-width: 1200px) 30vw, 90vw" />
                  <div className="flex gap-2 text-[12px] min-[1200px]:text-[10px]">
                    <span>Img. {String(i + 3).padStart(2, "0")}</span>
                    <div>
                      <p>{p.title}</p>
                      <div className="text-muted mt-[9px] leading-tight">
                        {p.imageTag1 && <p>{p.imageTag1}</p>}
                        {p.imageTag2 && <p>{p.imageTag2}</p>}
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
        <Grid className="hidden min-[1200px]:grid mt-24 items-start">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-8 mb-16 min-[1200px]:mb-0 min-[1200px]:self-stretch flex flex-col">
            <RichText value={p.visualIdentityText} className="text-[14px] min-[1200px]:text-[16px] leading-tight mb-8" />
            {(p.timelineDuration || p.timelineService || hasRichText(p.timelineText)) && (
              <div className="grid grid-cols-8 gap-5 mb-8">
                <div className="col-span-3 min-[1200px]:col-span-2 text-[12px] min-[1200px]:text-[9px] uppercase">
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
                <RichText value={p.timelineText} className="col-span-5 min-[1200px]:col-span-6 text-[14px] min-[1200px]:text-[16px] leading-tight" />
              </div>
            )}
            <RichText value={p.mutedCaption} className="text-muted text-[11px] min-[1200px]:text-[10px]" />
            {(p.image7 || p.image8) && (
              <div className="grid grid-cols-2 min-[1200px]:grid-cols-8 gap-5 mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
                {p.image7 && (
                  <div className="col-span-1 min-[1200px]:col-span-3">
                    <ProjectImg item={p.image7} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 20vw, 65vw" />
                    <div className="flex gap-2 text-[12px] min-[1200px]:text-[10px]">
                      <span>Img. 07</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[9px] leading-tight">
                          {p.imageTag1 && <p>{p.imageTag1}</p>}
                          {p.imageTag2 && <p>{p.imageTag2}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {p.image8 && (
                  <div className="col-span-1 min-[1200px]:col-span-3">
                    <ProjectImg item={p.image8} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 20vw, 65vw" />
                    <div className="flex gap-2 text-[12px] min-[1200px]:text-[10px]">
                      <span>Img. 08</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted mt-[9px] leading-tight">
                          {p.imageTag1 && <p>{p.imageTag1}</p>}
                          {p.imageTag2 && <p>{p.imageTag2}</p>}
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
              <RichText value={p.finalText} className="text-[14px] min-[1200px]:text-[12px] leading-tight" />
            </div>
          )}
          {p.image9 && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-7">
              <ProjectImg item={p.image9} className="aspect-[4/5] mb-4" sizes="(min-width: 1200px) 40vw, 100vw" />
              <div className="flex gap-2 text-[12px] min-[1200px]:text-[10px]">
                <span>Img. 09</span>
                <div>
                  <p>{p.title}</p>
                  <div className="text-muted mt-[9px] leading-tight">
                    {p.imageTag1 && <p>{p.imageTag1}</p>}
                    {p.imageTag2 && <p>{p.imageTag2}</p>}
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
    <div className="min-[1200px]:absolute min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px] min-[1200px]:text-[10px]">
      <span>{item.mediaType ?? "Img"}. {String(idx + 1).padStart(2, "0")}</span>
      <div>
        <p>{p.title}</p>
        <div className="text-muted mt-[15px] leading-tight">
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
              className="text-[14px] min-[1200px]:text-[16px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7"
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
    return (
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
        {hasRichText(p.simpleCaptionText) && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
            <RichText
              value={p.simpleCaptionText}
              className="text-[14px] min-[1200px]:text-[16px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7"
            />
          </div>
        )}
        <GalleryCarousel images={images} title={p.title} />
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
              className="text-[14px] min-[1200px]:text-[16px] leading-tight min-[1200px]:col-start-3 min-[1200px]:col-span-7"
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
