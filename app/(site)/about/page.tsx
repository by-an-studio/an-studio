import { Fragment } from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Grid } from "../../_components/Grid";
import { urlFor } from "../../../sanity/lib/image";
import { sanityFetch } from "../../../sanity/lib/live";

const ABOUT_QUERY = `*[_type == "about"][0]{
  ownerSectionLabel,
  ownerImage,
  ownerNameLabel,
  ownerBio,
  ownerImageIndex,
  ownerName,
  ownerRole,
  introText,
  introSubtext,
  introImage,
  awardsTitle,
  awards,
  exhibitionsTitle,
  exhibitions,
  clientsTitle,
  clientColumns[]{title, clients}
}`;

function SanityImg({ image, className }: { image?: any; className?: string }) {
  if (!image) return null;
  const rawUrl = urlFor(image).url();
  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
  const src = isGif ? rawUrl : urlFor(image).width(1000).url();
  return (
    <div className={`relative bg-muted/20 overflow-hidden ${className ?? ""}`}>
      <Image src={src} alt="" fill unoptimized={isGif} quality={80} className="object-cover" />
    </div>
  );
}

const introComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] leading-snug min-[1200px]:leading-tight">
        {children}
      </p>
    ),
  },
};

const ownerBioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[16px] leading-tight mb-4">{children}</p>,
  },
};

export default async function About() {
  const { data: rawData } = await sanityFetch({ query: ABOUT_QUERY });
  const data = rawData as any;

  const columns = data?.clientColumns ?? [];
  const maxRows = Math.max(0, ...columns.map((c: any) => c.clients?.length ?? 0));
  const clientRows = Array.from({ length: maxRows }, (_, i) =>
    columns.map((c: any) => c.clients?.[i] ?? "")
  );

  return (
    <main className="w-full">
      <div className="w-full pt-24 min-[1200px]:pt-[clamp(18px,1.5625vw,30px)] min-[1200px]:pb-[clamp(18px,1.5625vw,30px)] pb-[30px] flex flex-col justify-between min-h-[100svh]">
        <div className="relative mt-16 min-[1200px]:mt-0 min-[1200px]:h-[calc(100svh-2*clamp(18px,1.5625vw,30px))]">
          <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-3 mb-8 min-[1200px]:mb-0">
              {data?.ownerSectionLabel && (
                <p className="text-[32px] min-[1200px]:text-[clamp(24px,2.1vw,40px)]">{data.ownerSectionLabel}</p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-7 min-[1200px]:col-span-11 mb-8 min-[1200px]:mb-0 min-[1200px]:h-full">
              <SanityImg image={data?.ownerImage} className="aspect-[4/5] min-[1200px]:aspect-auto min-[1200px]:h-full" />
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-19 min-[1200px]:col-span-6">
              {data?.ownerNameLabel && <p className="underline decoration-1 mb-6">{data.ownerNameLabel}</p>}
              {data?.ownerBio && <PortableText value={data.ownerBio} components={ownerBioComponents} />}
              {data?.ownerImageIndex && <p className="text-muted text-[12px] mb-4">{data.ownerImageIndex}</p>}
              {data?.ownerName && <p className="text-[12px]">{data.ownerName}</p>}
              {data?.ownerRole && <p className="text-muted text-[12px]">{data.ownerRole}</p>}
            </div>
          </Grid>
        </div>
      </div>
      <section className="w-full pt-24 min-[1200px]:pt-[clamp(18px,1.5625vw,30px)] min-[1200px]:pb-[clamp(18px,1.5625vw,30px)] pb-[30px] flex flex-col min-[1200px]:gap-[30px] min-[1200px]:min-h-0">
        <Grid className="items-start">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-13">
            {data?.introText && <PortableText value={data.introText} components={introComponents} />}
          </div>
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-3 mt-2 min-[1200px]:mt-0">
            {data?.introSubtext && <p className="text-[12px] leading-snug">{data.introSubtext}</p>}
          </div>
        </Grid>
        <Grid className="mt-16 min-[1200px]:mt-0">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
            <SanityImg image={data?.introImage} className="aspect-[3/4]" />
          </div>
        </Grid>
        <div className="mt-16 min-[1200px]:mt-[clamp(40px,8vh,120px)] flex flex-col min-[1200px]:gap-[50px]">
          <Grid className="items-baseline">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
              {data?.awardsTitle && (
                <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">{data.awardsTitle}</p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0">
              <ul className="space-y-1">
                {data?.awards?.map((item: string, i: number) => (
                  <li key={i} className="flex items-baseline gap-3 text-[16px] min-[1200px]:text-[18px] w-full">
                    <span className="text-[10px] shrink-0 -translate-y-[1px]">{i + 1}</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid className="mt-16 min-[1200px]:mt-0 items-baseline">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
              {data?.exhibitionsTitle && (
                <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">{data.exhibitionsTitle}</p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0">
              <ul className="space-y-1">
                {data?.exhibitions?.map((item: string, i: number) => (
                  <li key={i} className="flex items-baseline gap-3 text-[16px] min-[1200px]:text-[18px] w-full">
                    <span className="text-[10px] shrink-0 -translate-y-[1px]">{i + 1}</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid className="mt-16 min-[1200px]:mt-0 items-start">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
              {data?.clientsTitle && (
                <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] leading-tight">
                  {data.clientsTitle}
                </p>
              )}
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0">
              <div className="overflow-x-auto min-[1200px]:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="grid grid-cols-3 gap-x-0 text-[14px] min-w-[500px] min-[1200px]:min-w-0">
                  {columns.map((col: any, i: number) => (
                    <p key={i} className="text-[16px] min-[1200px]:text-[18px] whitespace-nowrap">
                      {col.title}
                    </p>
                  ))}
                  <div className="col-span-3 border-t border-black mt-4" />
                  {clientRows.map((row, i) => (
                    <Fragment key={i}>
                      {row.map((cell: string, j: number) => (
                        <p key={`${i}-${j}`} className="border-b border-black py-1 whitespace-nowrap">
                          {cell}
                        </p>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </section>
    </main>
  );
}
