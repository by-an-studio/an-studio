import { BodyBackground } from "../../../_components/BodyBackground";
import { toLocale, buildAlternates } from "../../../../i18n/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "seo.journal" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/journal"),
    openGraph: { title, description },
  };
}

export default async function Journal() {
  return (
    <main className="w-full pt-0 pb-0 min-[1200px]:pb-[30px] flex items-center justify-center min-h-[100svh]">
      <BodyBackground color="#FFFDF7" />
      <p className="text-[25px] min-[1200px]:text-[clamp(21px,1.875vw,33px)]">Coming soon!</p>
    </main>
  );
}
