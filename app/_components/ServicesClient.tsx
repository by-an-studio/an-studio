"use client";
import { useState } from "react";
import { FadeImage } from "./FadeImage";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Grid } from "./Grid";
import { urlFor } from "../../sanity/lib/image";
import { Link, useRouter, usePathname } from "../../i18n/navigation";

type ServiceItem = {
  number: string;
  label: string;
  paragraphs?: any[];
  timeline?: string;
  featuredImageIndex?: string;
  featuredTags?: string[];
  featuredProject?: {
    title?: string;
    mainImage?: any;
  };
};
type ServicesData = {
  headerLabel?: string;
  headerTagline?: string;
  servicesList?: ServiceItem[];
  otherServicesTitle?: string;
  otherServices?: string[];
  industryTitle?: string;
  industry?: string[];
  contactTitle?: string;
  contactLines?: string[];
};
const paragraphComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[15px] leading-tight mb-4 last:mb-0">{children}</p>,
  },
  marks: {
    underline: ({ children }) => <span className="underline decoration-1">{children}</span>,
  },
};
function FeaturedImage({ item }: { item?: any }) {
  if (!item) return null;
  const rawUrl = urlFor(item).url();
  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
  const src = isGif ? rawUrl : urlFor(item).width(1400).url();
  return (
    <div className="relative aspect-[3/4] overflow-hidden">
      <FadeImage src={src} alt="" fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 55vw, 100vw" className="object-cover" />
    </div>
  );
}
export function ServicesClient({
  data,
  initialService,
}: {
  data: ServicesData | null;
  initialService?: string;
}) {
  const services = data?.servicesList ?? [];
  const router = useRouter();
  const pathname = usePathname();

  const initialIndex = initialService ? services.findIndex((s) => s.number === initialService) : -1;
  const [selected, setSelected] = useState(initialIndex !== -1 ? initialIndex : 0);
  const active = services[selected];

  function handleSelect(number: string, index: number) {
    setSelected(index);
    router.replace(`${pathname}?service=${number}`, { scroll: false });
  }

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px] flex flex-col justify-between min-h-[100svh]">
      <Grid className="pt-5 min-h-[70px] min-[1200px]:min-h-0">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-8">
          {data?.headerLabel && <p className="underline decoration-1">{data.headerLabel}</p>}
          {data?.headerTagline && <p className="italic text-[20px]">{data.headerTagline}</p>}
        </div>
      </Grid>
      <Grid className="mt-16 min-[1200px]:mt-0 items-start min-[1200px]:items-center">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-7 mb-16 min-[1200px]:mb-0">
          <ul className="space-y-1">
            {services.map((s, i) => {
              const isSelected = selected === i;
              return (
                <li key={s.number ?? i}>
                  <button
                    type="button"
                    onClick={() => handleSelect(s.number, i)}
                    className={`flex items-baseline gap-4 text-left cursor-pointer ${!isSelected ? "text-muted" : "text-foreground"}`}
                  >
                    <span className="underline decoration-1 text-[16px] min-[1200px]:text-[clamp(12px,0.8333vw,16px)]">
                      ({s.number}.)
                    </span>
                    <span className={`text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]${isSelected ? " italic" : ""}`}>
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex items-baseline gap-4 mt-16">
            <span className="invisible underline decoration-1 text-[16px] min-[1200px]:text-[clamp(12px,0.8333vw,16px)]">
              (00.)
            </span>
            <Link href="/client-application" className="underline decoration-1 text-[18px]">
              Start Your Project Now &rarr;
            </Link>
          </div>
        </div>
        {active && (
          <>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-6">
              {active.paragraphs && (
                <PortableText value={active.paragraphs} components={paragraphComponents} />
              )}
              {active.timeline && <p className="text-muted text-[12px] mt-8">{active.timeline}</p>}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-20 min-[1200px]:col-span-5">
              <FeaturedImage item={active.featuredProject?.mainImage} />
              <div className="mt-4 flex gap-2 text-[12px]">
                {active.featuredImageIndex && <span>Img. {active.featuredImageIndex}</span>}
                <div>
                  {active.featuredProject?.title && <p>{active.featuredProject.title}</p>}
                  <div className="text-muted mt-[15px]">
                    {active.featuredTags?.map((tag, i) => (
                      <p key={i}>{tag}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Grid>
      <Grid className="mt-16 min-[1200px]:mt-0 min-[1200px]:flex-nowrap">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
          {data?.otherServicesTitle && <p className="text-[18px] underline decoration-1 mb-2">{data.otherServicesTitle}</p>}
          <ul className="text-[15px]">
            {data?.otherServices?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-4">
          {data?.industryTitle && <p className="text-[18px] underline decoration-1 mb-2">{data.industryTitle}</p>}
          <ul className="text-[15px]">
            {data?.industry?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-6">
          {data?.contactTitle && <p className="text-[18px] underline decoration-1 mb-2">{data.contactTitle}</p>}
          <ul className="text-[15px]">
            {data?.contactLines?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </Grid>
    </main>
  );
}
