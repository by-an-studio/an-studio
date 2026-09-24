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
  const isShop = pathname.startsWith("/shop");
  const shopGradientStyle = isShop
    ? {
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,253,232,1) 0%, rgba(255,253,232,0.85) 25%, rgba(255,253,232,0.5) 55%, rgba(255,253,232,0.15) 80%, rgba(255,253,232,0) 100%)",
      }
    : undefined;

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
        style={shopGradientStyle}
      />
      <div
        aria-hidden
        className={`header-gradient hidden min-[1200px]:block absolute inset-x-0 top-0 h-36 -z-10 pointer-events-none transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={shopGradientStyle}
      />
      <div className="relative grid grid-cols-3 items-center min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:justify-between min-[1200px]:h-[45px] text-[clamp(12px,0.9375vw,18px)] min-[1200px]:text-[clamp(9px,0.9375vw,15px)] font-normal">
        <div className="justify-self-start min-[1200px]:hidden">
          <Link href={pathname} locale={locale === "es" ? "en" : "es"} className="text-foreground relative -top-[1px]">
            {locale === "es" ? "EN" : "ES"}
          </Link>
        </div>

        <Link href="/" className="justify-self-center min-[1200px]:justify-self-auto">
          <Image
            src="/logo/an-studio.svg"
            alt="An Studio"
            width={120}
            height={21}
            style={{ width: "120px", height: "20.57px" }}
            priority
          />
        </Link>

        <div className="justify-self-end flex flex-row items-start gap-4 text-[14px] min-[1200px]:gap-8 min-[1200px]:text-[clamp(9px,0.9375vw,15px)]">
          <Link href={pathname} locale={locale === "es" ? "en" : "es"} className="hidden min-[1200px]:block text-foreground relative min-[1200px]:top-0">
            {locale === "es" ? "EN" : "ES"}
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="min-[1200px]:hidden text-foreground relative -top-[1px] cursor-pointer touch-manipulation py-2 -my-2 w-[36px] text-left"
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
