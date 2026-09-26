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
        className={`min-[1200px]:hidden fixed top-0 left-0 right-0 h-[100dvh] z-30 bg-[rgba(244,241,232,0.95)] flex-col items-center justify-center px-8 ${
          open ? "flex" : "hidden"
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {links.map(({ roman, key, href }) => {
            const isActive = pathname === href || (href === "/work" && pathname.startsWith("/work/"));
            return (
              <Link
                key={href}
                href={href}
                className="text-black text-center opacity-70 transition-opacity duration-200 hover:opacity-100!"
              >
                <span className="block text-[12px]">{roman}</span>
                <span className={`block text-[17px] ${isActive ? "italic" : ""}`}>{t(key)}</span>
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
              const isActive = pathname === href || (href === "/work" && pathname.startsWith("/work/"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap transition-colors duration-200 no-hover-dim ${isActive ? "text-foreground" : "text-muted hover:text-[#808080]!"}`}
                >
                  <span className="block text-[clamp(8px,0.5208vw,8px)]">{roman}</span>
                  <span className={`block text-[clamp(10px,0.9375vw,15px)] ${isActive ? "italic" : ""}`}>
                    {t(key)}
                  </span>
                </Link>
              );
            })}
          </nav>
          {pathname !== "/" && (
            <p className="absolute bottom-[30px] text-[clamp(9px,0.8333vw,13px)] whitespace-nowrap">
              {t('availableWorldwide')}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
