import { BodyBackground } from "../../../_components/BodyBackground";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { pick, pickPortableText, toLocale, buildAlternates } from "../../../../i18n/locale";
import { urlFor } from "../../../../sanity/lib/image";
import { Grid } from "../../../_components/Grid";
import { WorkGrid, type WorkProject } from "../../../_components/WorkGrid";
import { sanityFetch } from "../../../../sanity/lib/live";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const WORK_SEO_QUERY = `*[_type == "workPage"][0]{ seo }`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.work" });
  const { data } = await sanityFetch({ query: WORK_SEO_QUERY });
  const seoData = (data as any)?.seo;
  const title = pick(locale, seoData?.metaTitle) || t("title");
  const description = pick(locale, seoData?.metaDescription) || t("description");
  const ogImageUrl = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/work"),
    openGraph: { title, description, images: ogImageUrl ? [{ url: ogImageUrl }] : undefined },
  };
}

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt asc){
  title,
  "slug": slug.current,
  categories,
  projectNumber,
  mainImage
}`;

const WORK_PAGE_QUERY = `*[_type == "workPage"][0]{
  noteLabel,
  noteText,
  categoriesLabel,
  categoryBrandIdentity,
  categoryPackaging,
  categoryWebDesign,
  categorySocialMedia
}`;

const noteComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    underline: ({ children }) => <span className="underline decoration-1">{children}</span>,
  },
};

export default async function Work({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const projectList = (projects ?? []) as WorkProject[];
  const { category: initialCategory } = await searchParams;

  const { data: rawWorkPage } = await sanityFetch({ query: WORK_PAGE_QUERY });
  const w = rawWorkPage as any;
  const noteLabel = pick(locale, w?.noteLabel);
  const noteText = pickPortableText(locale, w?.noteText);
  const categoriesLabel = pick(locale, w?.categoriesLabel);
  const categories = [
    { value: "Brand Identity", label: pick(locale, w?.categoryBrandIdentity) || "Brand Identity" },
    { value: "Packaging", label: pick(locale, w?.categoryPackaging) || "Packaging" },
    { value: "Web Design", label: pick(locale, w?.categoryWebDesign) || "Web Design" },
    { value: "Social Media", label: pick(locale, w?.categorySocialMedia) || "Social Media" },
  ];

  const navT = await getTranslations("nav");
  const pageTitle = navT("work");

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px] flex flex-col justify-between min-h-[100svh]">
      <BodyBackground color="#FFFEFC" />
      <div className="min-[1200px]:hidden px-5 mb-0 text-center">
        <span className="block text-[14px]">I</span>
        <span className="block text-[25px]">{pageTitle}</span>
      </div>
      {(noteLabel || noteText) && (
        <Grid className="hidden min-[1200px]:grid pt-5 min-h-[70px] min-[1200px]:min-h-0">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-11 flex gap-2">
            {noteLabel && <span className="text-[12px] min-[1200px]:text-[9px] underline mt-[6px] shrink-0">{noteLabel}</span>}
            {noteText && (
              <div className="text-[20px] min-[1200px]:text-[17px] leading-snug">
                <PortableText value={noteText} components={noteComponents} />
              </div>
            )}
          </div>
        </Grid>
      )}
      <div className="relative mt-8 min-[1200px]:mt-0 min-[1200px]:h-[78svh]">
        <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center">
          <WorkGrid
            projects={projectList}
            initialCategory={initialCategory ?? null}
            categoriesLabel={categoriesLabel}
            categories={categories}
          />
        </Grid>
      </div>
    </main>
  );
}
