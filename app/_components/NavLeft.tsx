"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { roman: "I", label: "Work", href: "/work" },
  { roman: "II", label: "Services", href: "/services" },
  { roman: "III", label: "About", href: "/about" },
  { roman: "IV", label: "Client Application", href: "/client-application" },
  { roman: "V", label: "Journal", href: "/journal" },
  { roman: "VI", label: "Shop", href: "/shop" },
];

export function NavLeft() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
        className="min-[1200px]:hidden fixed left-5 top-[60px] z-30 w-[15px] h-[15px] rounded-full bg-foreground"
      />

      {/* Mobile/tablet: menú desplegable fixed */}
      <nav
        className={`min-[1200px]:hidden fixed left-5 top-1/2 -translate-y-1/2 flex-col gap-6 z-20 ${
          open ? "flex" : "hidden"
        }`}
      >
        {links.map(({ roman, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={isActive ? "text-foreground" : "text-muted"}
            >
              <span className="block text-[10px]">{roman}</span>
              <span className={`block text-[18px] ${isActive ? "italic" : ""}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop: columna absoluta de ancho 0 que ocupa todo el contenedor relative del layout,
          con el nav sticky-centrado dentro. */}
      <div className="hidden min-[1200px]:block absolute left-5 top-0 bottom-0 w-0 z-20">
        <div className="sticky top-0 h-[100dvh]">
          <nav className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6">
            {links.map(({ roman, label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap ${isActive ? "text-foreground" : "text-muted"}`}
                >
                  <span className="block text-[clamp(7px,0.5208vw,10px)]">{roman}</span>
                  <span className={`block text-[clamp(13px,0.9375vw,18px)] ${isActive ? "italic" : ""}`}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>
          {pathname !== "/" && (
            <p className="absolute bottom-[30px] text-[16px] whitespace-nowrap">
              Available Worldwide
            </p>
          )}
        </div>
      </div>
    </>
  );
}
