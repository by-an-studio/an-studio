"use client";

import { useState } from "react";
import { FadeImage } from "./FadeImage";
import { FadeVideo } from "./FadeVideo";
import { urlFor } from "../../sanity/lib/image";

function GalleryArrow({ flipped }: { flipped?: boolean }) {
  return (
    <svg width="25" height="7" viewBox="0 0 25 7" fill="none" className={flipped ? "rotate-180" : ""}>
      <path d="M1 3.5H24M24 3.5L20 0.7M24 3.5L20 6.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SimpleImage = { image: any; videoUrl?: string; mediaType?: "Img" | "Video"; tags?: string[] };

export function GalleryCarousel({ images, title }: { images: SimpleImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9">
      <div className="relative min-[1200px]:col-span-1">
        {current && (
          <div className="min-[1200px]:absolute min-[1200px]:right-6 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px] min-[1200px]:text-[10px]">
            <span>
              {current.mediaType ?? "Img"}. {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p>{title}</p>
              <div className="text-muted mt-[15px] leading-tight">
                {current.tags?.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        )}
        <button
          type="button"
          aria-label="Previous"
          onClick={goPrev}
          className="hidden min-[1200px]:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer"
        >
          <GalleryArrow flipped />
        </button>
      </div>
      <div className="min-[1200px]:col-span-7">
        <div className="flex overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1200px]:overflow-visible">
          {(current?.image || current?.videoUrl) &&
            (() => {
              if (current.videoUrl) {
                return (
                  <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] overflow-hidden">
                    <FadeVideo
                      src={current.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                );
              }
              const rawUrl = urlFor(current.image).url();
              const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
              const src = isGif ? rawUrl : urlFor(current.image).width(2000).url();
              return (
                <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] overflow-hidden">
                  <FadeImage
                    src={src}
                    alt=""
                    fill
                    unoptimized={isGif}
                    quality={90}
                    sizes="(min-width: 1200px) 28vw, 95vw"
                    className="object-cover"
                  />
                </div>
              );
            })()}
        </div>
      </div>
      <div className="relative min-[1200px]:col-span-1">
        <button
          type="button"
          aria-label="Next"
          onClick={goNext}
          className="hidden min-[1200px]:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer"
        >
          <GalleryArrow />
        </button>
      </div>
    </div>
  );
}
