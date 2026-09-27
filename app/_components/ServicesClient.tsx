"use client";
import { BodyBackground } from "./BodyBackground";
import { useEffect, useState } from "react";
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
  featuredImage?: any;
  featuredTitle?: string;
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
    normal: ({ children }) => <p className="text-[14px] min-[1200px]:text-[16px] leading-tight mb-4 last:mb-0">{children}</p>,
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
      <FadeImage key={src} src={src} alt="" fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 55vw, 100vw" className="object-cover" />
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

  useEffect(() => {
    const idx = initialService ? services.findIndex((s) => s.number === initialService) : -1;
    setSelected(idx !== -1 ? idx : 0);
  }, [initialService, services]);
  const active = services[selected];


  function handleSelect(number: string, index: number) {
    setSelected(index);
    router.replace(`${pathname}?service=${number}`, { scroll: false });
  }

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px] flex flex-col justify-between min-h-[100svh]">
      {data?.headerLabel && <h1 className="sr-only">{data.headerLabel.replace(/:\s*$/, "")}</h1>}
      <BodyBackground color="#FFFEFC" />
      <div className="min-[1200px]:hidden px-5 mb-4 text-center">
        <span className="block text-[14px]">II</span>
        <p aria-hidden="true" className="block text-[25px]">{data?.headerLabel?.replace(/:\s*$/, "")}</p>
      </div>
      <Grid className="pt-0 min-[1200px]:pt-5 min-h-0">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-8">
          {data?.headerLabel && <p aria-hidden="true" className="hidden min-[1200px]:block underline decoration-1">{data.headerLabel}</p>}
          {data?.headerTagline && <p className="italic text-[17px] min-[1200px]:text-[17px] text-center min-[1200px]:text-left">{data.headerTagline}</p>}
        </div>
      </Grid>
      <Grid className="mt-0 min-[1200px]:mt-24 items-start min-[1200px]:items-center">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-7 mb-6 min-[1200px]:mb-0">
          <ul className="mt-10 min-[1200px]:mt-0 space-y-[16px] min-[1200px]:space-y-0">
            {services.map((s, i) => {
              const isSelected = selected === i;
              return (
                <li key={s.number ?? i} className="flex flex-col items-center text-center min-[1200px]:flex-row min-[1200px]:items-baseline min-[1200px]:text-left gap-1 min-[1200px]:gap-4">
                  <h2>
                  <button
                    type="button"
                    onClick={() => handleSelect(s.number, i)}
                    className={`flex flex-col items-center text-center min-[1200px]:flex-row min-[1200px]:items-baseline min-[1200px]:text-left gap-1 min-[1200px]:gap-4 text-left cursor-pointer transition-colors duration-200 ${!isSelected ? "text-muted hover:text-[#808080]!" : "text-foreground"}`}
                  >
                    <span className="underline decoration-[0.5px] min-[1200px]:decoration-1 text-[12px] min-[1200px]:text-[clamp(9px,0.8333vw,13px)]">
                      ({s.number}.)
                    </span>
                    <span className={`text-[17px] min-[1200px]:text-[clamp(21px,1.875vw,33px)]${isSelected ? " italic" : ""}`}>
                      {s.label}
                    </span>
                  </button>
                  </h2>
                </li>
              );
            })}
          </ul>
          <div className="hidden min-[1200px]:flex items-baseline gap-4 mt-16">
            <span className="invisible underline decoration-1 text-[clamp(9px,0.8333vw,13px)]">
              (00.)
            </span>
            <Link href="/client-application" className="underline decoration-1 text-[15px]">
              Start Your Project Now &rarr;
            </Link>
          </div>
        </div>
        {active && (
          <>
            <div className="order-2 min-[1200px]:order-none col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-6 text-center min-[1200px]:text-left">
              {active.paragraphs && (
                <PortableText value={active.paragraphs} components={paragraphComponents} />
              )}
              {active.timeline && <p className="text-muted text-[12px] min-[1200px]:text-[10px] mt-8">{active.timeline}</p>}
            </div>
            <div className="order-1 min-[1200px]:order-none col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-20 min-[1200px]:col-span-5 w-[50%] min-[1200px]:w-auto mx-auto min-[1200px]:mx-0 mb-8 min-[1200px]:mb-0">
              <FeaturedImage item={active.featuredImage} />
              <div className="hidden min-[1200px]:flex mt-4 gap-2 text-[12px] min-[1200px]:text-[10px]">
                {active.featuredImageIndex && <span>Img. {active.featuredImageIndex}</span>}
                <div>
                  {active.featuredTitle && <p>{active.featuredTitle}</p>}
                  <div className="text-muted mt-[15px] leading-tight">
                    {active.featuredTags?.map((tag, i) => (
                      <p key={i}>{tag}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="order-3 min-[1200px]:hidden col-span-8 md:max-[1199px]:col-span-24 flex items-baseline gap-4 mt-8 justify-center">
          <Link href="/client-application" className="underline decoration-1 text-[15px]">
            Start Your Project Now &rarr;
          </Link>
        </div>
      </Grid>
      <div className="min-[1200px]:hidden flex justify-center gap-8 mt-16 px-5">
        <div className="text-center">
          {data?.otherServicesTitle && <h2 className="text-[13px] underline decoration-1 mb-2">{data.otherServicesTitle}</h2>}
          <ul className="text-[10px]">
            {data?.otherServices?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="text-center">
          {data?.industryTitle && <h2 className="text-[13px] underline decoration-1 mb-2">{data.industryTitle}</h2>}
          <ul className="text-[10px]">
            {data?.industry?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <Grid className="hidden min-[1200px]:grid mt-16 min-[1200px]:mt-0 min-[1200px]:flex-nowrap">
        <div className="min-[1200px]:col-start-4 min-[1200px]:col-span-4">
          {data?.otherServicesTitle && <p className="text-[16px] underline decoration-1 mb-2">{data.otherServicesTitle}</p>}
          <ul className="text-[12px]">
            {data?.otherServices?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="min-[1200px]:col-start-12 min-[1200px]:col-span-4">
          {data?.industryTitle && <p className="text-[16px] underline decoration-1 mb-2">{data.industryTitle}</p>}
          <ul className="text-[12px]">
            {data?.industry?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="min-[1200px]:col-start-16 min-[1200px]:col-span-6">
          {data?.contactTitle && <h2 className="text-[16px] underline decoration-1 mb-2">{data.contactTitle}</h2>}
          <ul className="text-[12px]">
            {data?.contactLines?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </Grid>
    </main>
  );
}
