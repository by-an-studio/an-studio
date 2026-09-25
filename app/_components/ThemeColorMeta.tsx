"use client";

import { useEffect } from "react";
import { usePathname } from "../../i18n/navigation";

// Mantiene <meta name="theme-color"> (el color que iOS/Android usan para
// teñir la barra de estado / zona del notch) sincronizado con el color de
// fondo real de cada página — el mismo criterio que ya usa Header.tsx.
export function ThemeColorMeta() {
  const pathname = usePathname();

  useEffect(() => {
    const isShop = pathname.startsWith("/shop");
    const isFFFEFCPage =
      pathname.startsWith("/services") ||
      pathname.startsWith("/client-application") ||
      pathname.startsWith("/work") ||
      pathname.startsWith("/privacy-policy");
    const color = isShop ? "#FFFDE8" : isFFFEFCPage ? "#FFFEFC" : "#FFFDF7";

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", color);
    }
  }, [pathname]);

  return null;
}
