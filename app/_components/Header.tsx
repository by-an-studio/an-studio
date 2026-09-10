"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LiveDateTime } from "./LiveDateTime";
import { Link, usePathname } from "../../i18n/navigation";

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-20 py-5 px-5">
      <div className="flex flex-row items-center justify-between text-[clamp(12px,0.9375vw,18px)] font-normal">
        <Link href="/">
          <Image
            src="/logo/an-studio.svg"
            alt="An Studio"
            width={140}
            height={24}
            style={{ width: "140px", height: "24px" }}
            priority
          />
        </Link>
        <div className="flex flex-col items-end gap-1 md:flex-row md:items-start md:gap-8">
          <div className="flex gap-2">
            <Link href={pathname} locale="es" className={locale === "es" ? "" : "opacity-40"}>
              ES
            </Link>
            <Link href={pathname} locale="en" className={locale === "en" ? "" : "opacity-40"}>
              EN
            </Link>
          </div>
          <LiveDateTime />
        </div>
      </div>
    </header>
  );
}
