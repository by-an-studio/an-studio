import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Grid } from "../../../_components/Grid";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, toLocale, pickPortableText } from "../../../../i18n/locale";

const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicy"][0]{
  pageTitle,
  lastUpdated,
  content
}`;

const contentComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
  },
  marks: {
    underline: ({ children }) => <span className="underline decoration-1">{children}</span>,
  },
};

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: rawData } = await sanityFetch({ query: PRIVACY_POLICY_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        pageTitle: pick(locale, raw.pageTitle),
        lastUpdated: pick(locale, raw.lastUpdated),
        content: pickPortableText(locale, raw.content),
      }
    : null;

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px]">
      <Grid className="items-start">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4 min-[1200px]:pt-[50vh] min-[1200px]:-translate-y-10 mb-16 min-[1200px]:mb-0">
          {data?.pageTitle && (
            <p className="text-[32px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">{data.pageTitle}</p>
          )}
          {data?.lastUpdated && (
            <p className="italic text-[20px] min-[1200px]:text-[clamp(18px,1.25vw,24px)]">{data.lastUpdated}</p>
          )}
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-17 min-[1200px]:pt-[50vh] min-[1200px]:-translate-y-10 text-[16px] leading-tight">
          {data?.content && <PortableText value={data.content} components={contentComponents} />}
        </div>
      </Grid>
    </main>
  );
}
