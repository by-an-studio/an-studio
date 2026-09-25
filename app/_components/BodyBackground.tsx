"use client";

import { useEffect } from "react";

export function BodyBackground({ color }: { color: string }) {
  useEffect(() => {
    // Safari (iOS) tiñe la zona del notch / barra de estado a partir del
    // color de fondo del documento raíz, no solo del <body>, así que hay
    // que actualizar ambos para que la zona del notch cambie con la página.
    const previousBody = document.body.style.backgroundColor;
    const previousHtml = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = color;
    document.documentElement.style.backgroundColor = color;

    // Safari en iOS solo recalcula el tinte de la barra de estado/notch al
    // detectar scroll, no en una navegación SPA que no llega a mover el
    // scroll. Forzamos un micro-scroll (imperceptible) para "empujarlo" a
    // volver a muestrear el color justo después de cambiarlo.
    if (typeof window !== "undefined") {
      const y = window.scrollY;
      window.scrollTo(0, y + 1);
      requestAnimationFrame(() => window.scrollTo(0, y));
    }

    return () => {
      document.body.style.backgroundColor = previousBody;
      document.documentElement.style.backgroundColor = previousHtml;
    };
  }, [color]);

  return null;
}
