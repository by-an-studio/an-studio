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
          {projects.map((p) => {
            const isVisible = !selected || p.categories?.includes(selected);
            return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`group flex flex-col min-[1200px]:h-full min-[1200px]:min-h-0 ${isVisible ? "" : "hidden"}`}
              onMouseEnter={(e) => {
                setHoveredSlug(p.slug);
                handleCursorMove(e);
              }}
              onMouseLeave={() => setHoveredSlug(null)}
              onMouseMove={handleCursorMove}
            >
              <p className="text-[12px] min-[1200px]:text-[9px] mb-2 shrink-0 text-center min-[1200px]:text-left">{p.projectNumber}</p>
              <div className="relative aspect-[3/4] min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:max-w-full min-[1200px]:min-h-0">
                {p.mainImage && (() => {
                  const rawUrl = urlFor(p.mainImage).url();
                  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
                  const src = isGif ? rawUrl : urlFor(p.mainImage).width(1400).url();
                  return (
                    <div className="absolute inset-x-0 top-5 bottom-5 opacity-100 min-[1200px]:opacity-40 transition-opacity duration-300 min-[1200px]:group-hover:opacity-100">
                      <FadeImage src={src} alt={p.title} fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 22vw, (min-width: 768px) 33vw, 65vw" className="object-contain" />
                    </div>
                  );
                })()}
              </div>
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
          VIEW
        </span>
      )}
    </>
  );
}
