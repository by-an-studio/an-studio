"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { LiveDateTime } from "./LiveDateTime";
import { useMobileNav } from "./MobileNavContext";
import { Link, usePathname } from "../../i18n/navigation";

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const { open, toggle } = useMobileNav();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-5 px-5 transform-gpu">
      <div
        aria-hidden
        className="fixed top-0 inset-x-0 z-40 bg-background pointer-events-none transform-gpu"
        style={{ height: "env(safe-area-inset-top)" }}
      />
      <div
        aria-hidden
        className="header-gradient absolute inset-x-0 top-0 h-28 -z-10 pointer-events-none min-[1200px]:hidden"
      />
      <div
        aria-hidden
        className={`header-gradient hidden min-[1200px]:block absolute inset-x-0 top-0 h-36 -z-10 pointer-events-none transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative flex flex-row items-center justify-between min-[1200px]:h-[45px] text-[clamp(12px,0.9375vw,18px)] font-normal">
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
        <div className="flex flex-row items-start gap-4 text-[14px] min-[1200px]:gap-8 min-[1200px]:text-[clamp(12px,0.9375vw,18px)]">
          <Link href={pathname} locale={locale === "es" ? "en" : "es"} className="text-foreground relative -top-[1px] min-[1200px]:top-0">
            {locale === "es" ? "EN" : "ES"}
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="min-[1200px]:hidden text-foreground relative -top-[1px] cursor-pointer touch-manipulation py-2 -my-2 w-[46px] text-left"
          >
            {open ? "Close" : "Menu"}
          </button>
          <div className="hidden min-[1200px]:block">
            <LiveDateTime />
          </div>
        </div>
      </div>
    </header>
  );
}
