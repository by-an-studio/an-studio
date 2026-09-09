import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Grid } from "../../../_components/Grid";
import { sanityFetch } from "../../../../sanity/lib/live";
import { urlFor } from "../../../../sanity/lib/image";

const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  title,
  projectNumber,
  category,
  subtitleLine,
  collaboration,
  aboutParagraph1,
  aboutParagraph2,
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

type ImageWithTags = { image: any; videoUrl?: string; tags?: string[] };
type SimpleImage = { image: any; videoUrl?: string; mediaType?: "Img" | "Video"; tags?: string[] };

type ProjectData = {
  title: string;
  projectNumber: string;
  category: string;
  subtitleLine?: string;
  collaboration?: string;
  aboutParagraph1?: string;
  aboutParagraph2?: string;
  projectTags?: string[];
  bottomParagraph?: string;
  variant: "gallery" | "simple";
  simpleLayout?: "single" | "double" | "gallery" | "singleWide";
  rightIntroText?: string;
  image1?: ImageWithTags;
  image2?: ImageWithTags;
  galleryImages?: ImageWithTags[];
  visualIdentityText?: string;
  timelineDuration?: string;
  timelineService?: string;
  timelineText?: string;
  mutedCaption?: string;
  image7?: ImageWithTags;
  image8?: ImageWithTags;
  finalText?: string;
  image9?: ImageWithTags;
  simpleCaptionText?: string;
  simpleImages?: SimpleImage[];
};

function ProjectImg({ item, className }: { item?: ImageWithTags | SimpleImage; className?: string }) {
  if (!item?.image && !item?.videoUrl) return null;

  if (item.videoUrl) {
    return (
      <div className={`relative bg-muted/20 overflow-hidden ${className ?? ""}`}>
        <video
          src={item.videoUrl}
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
  const src = isGif ? rawUrl : urlFor(item.image).width(1200).url();
  return (
    <div className={`relative bg-muted/20 overflow-hidden ${className ?? ""}`}>
      <Image src={src} alt="" fill unoptimized={isGif} quality={80} className="object-cover" />
    </div>
  );
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!project) return notFound();

  const p = project as ProjectData;

  return (
    <main className="w-full pb-[30px]">
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
              {(p.aboutParagraph1 || p.aboutParagraph2) && (
                <p className="underline decoration-1 mb-4 text-[18px]">(About)</p>
              )}
              {p.aboutParagraph1 && <p className="text-[18px] leading-tight mb-4">{p.aboutParagraph1}</p>}
              {p.aboutParagraph2 && <p className="text-[18px] leading-tight mb-8">{p.aboutParagraph2}</p>}
              {p.projectTags && p.projectTags.length > 0 && (
                <>
                  <p className="underline decoration-1 mb-4 text-[18px]">(Categories)</p>
                  <div className="flex flex-wrap gap-4 min-[1200px]:gap-8 text-[12px] uppercase">
                    {p.projectTags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            {p.bottomParagraph && (
              <p className="text-[16px] min-[1200px]:text-[18px] leading-tight mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
                {p.bottomParagraph}
              </p>
            )}
          </div>

          {p.variant === "gallery" ? (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
              {p.rightIntroText && (
                <div className="grid grid-cols-9 gap-5 mb-8">
                  <p className="col-span-8 text-[16px] min-[1200px]:text-[18px] leading-tight">{p.rightIntroText}</p>
                </div>
              )}
              <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5">
                <div className="col-span-1 min-[1200px]:col-span-3">
                  <ProjectImg item={p.image1} className="aspect-[4/5] mb-4" />
                  {p.image1 && (
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 01</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted">
                          {p.image1.tags?.map((t) => <p key={t}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-1 min-[1200px]:col-start-4 min-[1200px]:col-span-6">
                  <ProjectImg item={p.image2} className="aspect-[4/5] mb-4" />
                  {p.image2 && (
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 02</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted">
                          {p.image2.tags?.map((t) => <p key={t}>{t}</p>)}
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
                  <ProjectImg item={img} className="aspect-[3/4] mb-4" />
                  <div className="flex gap-2 text-[12px]">
                    <span>Img. {String(i + 3).padStart(2, "0")}</span>
                    <div>
                      <p>{p.title}</p>
                      <div className="text-muted">
                        {img.tags?.map((t) => <p key={t}>{t}</p>)}
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
            {p.visualIdentityText && (
              <p className="text-[16px] min-[1200px]:text-[18px] leading-tight mb-8">{p.visualIdentityText}</p>
            )}
            {(p.timelineDuration || p.timelineService || p.timelineText) && (
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
                {p.timelineText && (
                  <p className="col-span-5 min-[1200px]:col-span-6 text-[16px] min-[1200px]:text-[18px] leading-tight">
                    {p.timelineText}
                  </p>
                )}
              </div>
            )}
            {p.mutedCaption && <p className="text-muted text-[12px]">{p.mutedCaption}</p>}
            {(p.image7 || p.image8) && (
              <div className="grid grid-cols-2 min-[1200px]:grid-cols-8 gap-5 mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
                {p.image7 && (
                  <div className="col-span-1 min-[1200px]:col-span-3">
                    <ProjectImg item={p.image7} className="aspect-[4/5] mb-4" />
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 07</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted">
                          {p.image7.tags?.map((t) => <p key={t}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {p.image8 && (
                  <div className="col-span-1 min-[1200px]:col-span-3">
                    <ProjectImg item={p.image8} className="aspect-[4/5] mb-4" />
                    <div className="flex gap-2 text-[12px]">
                      <span>Img. 08</span>
                      <div>
                        <p>{p.title}</p>
                        <div className="text-muted">
                          {p.image8.tags?.map((t) => <p key={t}>{t}</p>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {p.finalText && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:13/17] min-[1600px]:[grid-column:13/16] mb-8 min-[1200px]:mb-0">
              <p className="text-[16px] min-[1200px]:text-[14px] leading-tight">{p.finalText}</p>
            </div>
          )}
          {p.image9 && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-7">
              <ProjectImg item={p.image9} className="aspect-[4/5] mb-4" />
              <div className="flex gap-2 text-[12px]">
                <span>Img. 09</span>
                <div>
                  <p>{p.title}</p>
                  <div className="text-muted">
                    {p.image9.tags?.map((t) => <p key={t}>{t}</p>)}
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
        <div className="text-muted">
          {item.tags?.map((t) => <p key={t}>{t}</p>)}
        </div>
      </div>
    </div>
  );

  if (p.simpleLayout === "double") {
    const [img1, img2] = images;
    return (
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-14 min-[1200px]:col-span-11 min-[1200px]:self-stretch flex flex-col justify-end">
        {p.simpleCaptionText && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-11 gap-5 mb-8">
            <p className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7">
              {p.simpleCaptionText}
            </p>
          </div>
        )}
        <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-11 min-[1200px]:items-end">
          <div className="relative min-[1200px]:col-span-1">
            {img1 && captionBlock(0, img1)}
          </div>
          <ProjectImg item={img1} className="aspect-[9/16] min-[1200px]:col-span-5" />
          <ProjectImg item={img2} className="aspect-[9/16] min-[1200px]:col-span-5" />
        </div>
      </div>
    );
  }

  if (p.simpleLayout === "gallery") {
    const first = images[0];
    return (
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
        {p.simpleCaptionText && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
            <p className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7">
              {p.simpleCaptionText}
            </p>
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
                    <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] bg-muted/20 rounded-full overflow-hidden">
                      <video
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
                const src = isGif ? rawUrl : urlFor(first.image).width(1200).url();
                return (
                  <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] bg-muted/20 rounded-full overflow-hidden">
                    <Image src={src} alt="" fill unoptimized={isGif} quality={80} className="object-cover" />
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
        {p.simpleCaptionText && (
          <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
            <p className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-3 min-[1200px]:col-span-7">
              {p.simpleCaptionText}
            </p>
          </div>
        )}
        <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9">
          <div className="relative min-[1200px]:col-span-2">
            {first && captionBlock(0, first)}
          </div>
          <ProjectImg item={first} className="aspect-[4/5] w-full min-[1200px]:col-start-3 min-[1200px]:col-span-7" />
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
        <ProjectImg item={first} className="aspect-[9/16] min-[1200px]:col-span-5" />
      </div>
    </div>
  );
}
