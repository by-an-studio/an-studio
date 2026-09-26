"use client";
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
  const isFFFEFCPage =
    pathname.startsWith("/services") ||
    pathname.startsWith("/client-application") ||
    pathname.startsWith("/work") ||
    pathname.startsWith("/privacy-policy");
  const headerBgRgb = isShop ? "255,253,232" : isFFFEFCPage ? "255,254,252" : "255,253,247";
  const smoothFadeMobile = (rgb: string) =>
    `linear-gradient(to bottom,
      rgba(${rgb},1) 0%,
      rgba(${rgb},0.997) 8.1%,
      rgba(${rgb},0.988) 15.5%,
      rgba(${rgb},0.971) 22.5%,
      rgba(${rgb},0.945) 29%,
      rgba(${rgb},0.908) 35.3%,
      rgba(${rgb},0.858) 41.2%,
      rgba(${rgb},0.79) 47.1%,
      rgba(${rgb},0.7) 52.9%,
      rgba(${rgb},0.59) 58.8%,
      rgba(${rgb},0.47) 64.7%,
      rgba(${rgb},0.35) 71%,
      rgba(${rgb},0.24) 77.5%,
      rgba(${rgb},0.14) 84.5%,
      rgba(${rgb},0.06) 91.9%,
      rgba(${rgb},0) 100%)`;
  const smoothFadeDesktop = (rgb: string) =>
    `linear-gradient(to bottom,
      rgba(${rgb},1) 0%,
      rgba(${rgb},0.994) 8.1%,
      rgba(${rgb},0.976) 15.5%,
      rgba(${rgb},0.943) 22.5%,
      rgba(${rgb},0.896) 29%,
      rgba(${rgb},0.834) 35.3%,
      rgba(${rgb},0.759) 41.2%,
      rgba(${rgb},0.675) 47.1%,
      rgba(${rgb},0.585) 52.9%,
      rgba(${rgb},0.485) 58.8%,
      rgba(${rgb},0.38) 64.7%,
      rgba(${rgb},0.275) 71%,
      rgba(${rgb},0.18) 77.5%,
      rgba(${rgb},0.1) 84.5%,
      rgba(${rgb},0.04) 91.9%,
      rgba(${rgb},0) 100%)`;
  const gradientStyleDesktop = { backgroundImage: smoothFadeDesktop(headerBgRgb) };
  const gradientStyleMobile = { backgroundImage: smoothFadeMobile(headerBgRgb) };
  // El degradado del header (h-20) se mantiene siempre igual, abra o no el
  // menú. Solo la franja del notch/safe-area (que en el estado normal es un
  // color plano, sin degradado) cambia a un color plano sólido igual al del
  // menú responsive cuando este está abierto, para que no desentone.
  const mobileTopBarStyle = open ? { backgroundColor: "rgb(244,241,232)" } : { backgroundColor: `rgb(${headerBgRgb})` };
  const mobileGradientStyle = gradientStyleMobile;

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
        className="fixed top-0 inset-x-0 z-40 pointer-events-none transform-gpu"
        style={{ height: "env(safe-area-inset-top)", ...mobileTopBarStyle }}
      />
      <div
        aria-hidden
        className="header-gradient absolute inset-x-0 top-0 h-20 -z-10 pointer-events-none min-[1200px]:hidden"
        style={mobileGradientStyle}
      />
      <div
        aria-hidden
        className={`header-gradient hidden min-[1200px]:block absolute inset-x-0 top-0 h-[72px] -z-10 pointer-events-none transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={gradientStyleDesktop}
      />
      <div className="relative grid grid-cols-3 items-center min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:justify-between min-[1200px]:h-[45px] text-[clamp(12px,0.9375vw,18px)] min-[1200px]:text-[clamp(9px,0.9375vw,15px)] font-normal">
        <div className="justify-self-start min-[1200px]:hidden">
          <Link href={pathname} locale={locale === "es" ? "en" : "es"} className="text-foreground relative -top-[1px]">
            {locale === "es" ? "EN" : "ES"}
          </Link>
        </div>

        <Link href="/" className="justify-self-center min-[1200px]:justify-self-auto">
          <img
            src="/logo/an-studio.svg"
            alt="An Studio"
            width={120}
            height={23}
            style={{ width: "120px", height: "23px" }}
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
