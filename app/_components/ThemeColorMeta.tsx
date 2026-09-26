"use client";

import { useEffect } from "react";
import { usePathname } from "../../i18n/navigation";

// Mantiene <meta name="theme-color"> (el color que iOS/Android usan para
// teñir la barra de estado / zona del notch) sincronizado con el color de
// fondo real de cada página — el mismo criterio que ya usa Header.tsx.
function colorForPath(path: string): string {
  const isShop = path.startsWith("/shop");
  const isFFFEFCPage =
    path.startsWith("/services") ||
    path.startsWith("/client-application") ||
    path.startsWith("/work") ||
    path.startsWith("/privacy-policy");
  return isShop ? "#FFFDE8" : isFFFEFCPage ? "#FFFEFC" : "#FFFDF7";
}

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
}

function applyThemeColor(path: string) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", colorForPath(path));
}

export function ThemeColorMeta() {
  const pathname = usePathname();

  // Fallback: cubre navegación que no pasa por un <a> (botón atrás/adelante,
  // carga directa de URL, etc.).
  useEffect(() => {
    applyThemeColor(pathname);
  }, [pathname]);

  // iOS Safari con frecuencia ignora el cambio de content en una
  // <meta name="theme-color"> ya existente cuando llega desde un efecto
  // posterior al render (navegación SPA). Actualizarlo de forma síncrona
  // dentro del propio evento de clic -antes de que arranque la
  // navegación- es lo que WebKit sí respeta de forma fiable.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        applyThemeColor(stripLocale(url.pathname));
      } catch {
        // ignore malformed hrefs
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
