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

    // iOS Safari con frecuencia ignora los cambios de content en una
    // <meta name="theme-color"> ya existente durante una navegación SPA
    // (sin recarga completa). Recrear la etiqueta (eliminar + insertar una
    // nueva) fuerza a WebKit a detectar el cambio de color del notch.
    const oldMeta = document.querySelector('meta[name="theme-color"]');
    const newMeta = document.createElement("meta");
    newMeta.setAttribute("name", "theme-color");
    newMeta.setAttribute("content", color);
    if (oldMeta) {
      oldMeta.replaceWith(newMeta);
    } else {
      document.head.appendChild(newMeta);
    }
  }, [pathname]);

  return null;
}
