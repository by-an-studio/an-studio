"use client";
import { useEffect, useRef, useState } from "react";
import { FadeImage } from "./FadeImage";
import { WorkFilters } from "./WorkFilters";
import { urlFor } from "../../sanity/lib/image";
import { Link, useRouter, usePathname } from "../../i18n/navigation";

export type WorkProject = {
  title: string;
  slug: string;
  categories: string[];
  projectNumber: string;
  mainImage?: any;
  soon?: boolean;
};

type Category = { value: string; label: string };
export function WorkGrid({
  projects,
  initialCategory,
  categoriesLabel,
  categories,
}: {
  projects: WorkProject[];
  initialCategory: string | null;
  categoriesLabel?: string;
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(initialCategory);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoveredIsSoon, setHoveredIsSoon] = useState(false);

  useEffect(() => {
    setSelected(initialCategory);
  }, [initialCategory]);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);

  function handleCursorMove(e: React.MouseEvent) {
    const el = cursorLabelRef.current;
    if (el) {
      el.style.left = `${e.clientX + 16}px`;
      el.style.top = `${e.clientY - 6}px`;
    }
  }

  function handleSelect(label: string | null) {
    setSelected(label);
    router.replace(label ? `${pathname}?category=${encodeURIComponent(label)}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-5 mb-16 min-[1200px]:mb-0 min-[1200px]:-translate-y-22">
        <WorkFilters selected={selected} onSelect={handleSelect} categoriesLabel={categoriesLabel} categories={categories} />
      </div>
      <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-16 min-[1200px]:h-full">
        <div className="grid grid-cols-2 md:max-[1199px]:grid-cols-4 min-[1200px]:grid-cols-5 min-[1200px]:grid-rows-3 gap-x-5 gap-y-16 min-[1200px]:h-full">
          {projects.map((p, index) => {
            const isVisible = !selected || p.categories?.includes(selected);
            const content = (
              <>
                <p className="text-[12px] min-[1200px]:text-[9px] mb-2 shrink-0 text-center min-[1200px]:text-left">{p.projectNumber}</p>
                <div className="relative aspect-[3/4] min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:max-w-full min-[1200px]:min-h-0">
                  {p.mainImage && (() => {
                    const rawUrl = urlFor(p.mainImage).url();
                    const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
                    const src = isGif ? rawUrl : urlFor(p.mainImage).width(1400).url();
                    return (
                      <div className={`absolute inset-x-0 top-5 bottom-5 transition-opacity duration-300 min-[1200px]:opacity-40 min-[1200px]:group-hover:opacity-100 ${p.soon ? "opacity-40" : "opacity-100"}`}>
                        <FadeImage src={src} alt={p.title} fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 22vw, (min-width: 768px) 33vw, 65vw" className="object-contain" priority={index < 5} />
                      </div>
                    );
                  })()}
                  {p.soon && (
                    <div className="min-[1200px]:hidden absolute inset-0 flex items-center justify-center pointer-events-none opacity-100">
                      <span className="text-[12px] uppercase tracking-wide">SOON</span>
                    </div>
                  )}
                </div>
              </>
            );
            if (p.soon) {
              return (
                <div
                  key={p.slug}
                  role="button"
                  className={`group flex flex-col min-[1200px]:h-full min-[1200px]:min-h-0 ${isVisible ? "" : "hidden"}`}
                  onMouseEnter={(e) => {
                    setHoveredSlug(p.slug);
                    setHoveredIsSoon(true);
                    handleCursorMove(e);
                  }}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onMouseMove={handleCursorMove}
                >
                  {content}
                </div>
              );
            }
            return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`group flex flex-col min-[1200px]:h-full min-[1200px]:min-h-0 ${isVisible ? "" : "hidden"}`}
              onMouseEnter={(e) => {
                setHoveredSlug(p.slug);
                setHoveredIsSoon(false);
                handleCursorMove(e);
              }}
              onMouseLeave={() => setHoveredSlug(null)}
              onMouseMove={handleCursorMove}
            >
              {content}
            </Link>
            );
          })}
        </div>
      </div>
      {hoveredSlug && (
        <span
          ref={cursorLabelRef}
          className="hidden min-[1200px]:block fixed pointer-events-none z-50 text-[12px] uppercase text-[#FFFFFF]"
        >
          {hoveredIsSoon ? "SOON" : "VIEW"}
        </span>
      )}
    </>
  );
}
