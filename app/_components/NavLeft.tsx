"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link, usePathname } from "../../i18n/navigation";
import { useMobileNav } from "./MobileNavContext";
import { LiveDateTime } from "./LiveDateTime";

const links = [
  { roman: "I", key: "work", href: "/work" },
  { roman: "II", key: "services", href: "/services" },
  { roman: "III", key: "about", href: "/about" },
  { roman: "IV", key: "clientApplication", href: "/client-application" },
  { roman: "V", key: "journal", href: "/journal" },
  { roman: "VI", key: "shop", href: "/shop" },
] as const;

export function NavLeft() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { open, setOpen } = useMobileNav();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname;
      setOpen(false);
    }
  }, [pathname, setOpen]);

  return (
    <>
      {/* Mobile/tablet: menú a pantalla completa */}
      <div
        className={`min-[1200px]:hidden fixed top-0 left-0 right-0 h-[100dvh] z-30 bg-[rgba(255,255,255,0.95)] flex-col items-start justify-center px-8 ${
          open ? "flex" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {links.map(({ roman, key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="text-black"
              >
                <span className="block text-[12px]">{roman}</span>
                <span className={`block text-[20px] ${isActive ? "italic" : ""}`}>{t(key)}</span>
              </Link>
            );
          })}
        </nav>
        <div className="w-full flex justify-center mt-20">
          <LiveDateTime align="center" />
        </div>
      </div>
      {/* Desktop: columna absoluta de ancho 0 que ocupa todo el contenedor relative del layout,
          con el nav sticky-centrado dentro. */}
      <div className="hidden min-[1200px]:block absolute left-5 top-0 bottom-0 w-0 z-20">
        <div className="sticky top-0 h-[100dvh]">
          <nav className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6">
            {links.map(({ roman, key, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap ${isActive ? "text-foreground" : "text-muted"}`}
                >
                  <span className="block text-[clamp(7px,0.5208vw,10px)]">{roman}</span>
                  <span className={`block text-[clamp(13px,0.9375vw,18px)] ${isActive ? "italic" : ""}`}>
                    {t(key)}
                  </span>
                </Link>
              );
            })}
          </nav>
          {pathname !== "/" && (
            <p className="absolute bottom-[30px] text-[clamp(12px,0.8333vw,16px)] whitespace-nowrap">
              {t('availableWorldwide')}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
