import { BodyBackground } from "../../_components/BodyBackground";
import { Link } from "../../../i18n/navigation";
import { toLocale } from "../../../i18n/locale";
import { getTranslations } from "next-intl/server";

export default async function NotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  const rawLocale = (await params)?.locale;
  const locale = toLocale(rawLocale ?? "en");
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <main className="w-full pt-0 pb-0 min-[1200px]:pb-[30px] flex flex-col items-center justify-center gap-4 min-h-[100svh] text-center px-5">
      <BodyBackground color="#FFFDF7" />
      <p className="text-[25px] min-[1200px]:text-[clamp(21px,1.875vw,33px)]">404</p>
      <p className="text-[15px]">{t("description")}</p>
      <Link href="/work" className="text-[15px] underline decoration-1 underline-offset-2">
        {t("workLink")}
      </Link>
    </main>
  );
}
