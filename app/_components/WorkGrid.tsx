"use client";
import { useMemo, useState } from "react";
import { FadeImage } from "./FadeImage";
import { WorkFilters } from "./WorkFilters";
import { urlFor } from "../../sanity/lib/image";
import { Link, useRouter, usePathname } from "../../i18n/navigation";

export type WorkProject = {
  title: string;
  slug: string;
  category: string;
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

  const filtered = useMemo(
    () => (selected ? projects.filter((p) => p.category === selected) : projects),
    [projects, selected]
  );

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
          {filtered.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="flex flex-col min-[1200px]:h-full min-[1200px]:min-h-0">
              <p className="text-xs mb-2 shrink-0">{p.projectNumber}</p>
              <div className="relative aspect-[3/4] min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:max-w-full min-[1200px]:min-h-0">
                {p.mainImage && (() => {
                  const rawUrl = urlFor(p.mainImage).url();
                  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
                  const src = isGif ? rawUrl : urlFor(p.mainImage).width(1400).url();
                  return (
                    <div className="absolute inset-x-0 top-5 bottom-5">
                      <FadeImage src={src} alt={p.title} fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 22vw, (min-width: 768px) 33vw, 65vw" className="object-contain" />
                    </div>
                  );
                })()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
