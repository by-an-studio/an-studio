"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LiveDateTime } from "./LiveDateTime";
import { useMobileNav } from "./MobileNavContext";
import { Link, usePathname } from "../../i18n/navigation";

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const { open, toggle } = useMobileNav();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-5 px-5 transform-gpu">
      <div
        aria-hidden
        className="fixed top-0 inset-x-0 z-40 bg-background pointer-events-none transform-gpu"
        style={{ height: "env(safe-area-inset-top)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-20 -z-10 pointer-events-none bg-gradient-to-b from-white via-white/95 via-50% to-transparent md:hidden"
      />
      <div className="relative flex flex-row items-center justify-between md:h-[45px] text-[clamp(12px,0.9375vw,18px)] font-normal">
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
        <div className="flex flex-row items-start gap-4 text-[14px] md:gap-8 md:text-[clamp(12px,0.9375vw,18px)]">
          <Link href={pathname} locale={locale === "es" ? "en" : "es"} className="text-foreground relative -top-[1px] md:top-0">
            {locale === "es" ? "EN" : "ES"}
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="md:hidden text-foreground relative -top-[1px] cursor-pointer touch-manipulation py-2 -my-2 min-w-[40px] text-left"
          >
            {open ? "Close" : "Menu"}
          </button>
          <div className="hidden md:block">
            <LiveDateTime />
          </div>
        </div>
      </div>
    </header>
  );
}
