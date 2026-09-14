"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;
const MIN_SCALE = 0.3;
const MAX_SCALE = 1;
const DESKTOP_BREAKPOINT = 768;

function computeScale() {
  if (window.innerWidth < DESKTOP_BREAKPOINT) return 1;
  const widthRatio = window.innerWidth / REFERENCE_WIDTH;
  const heightRatio = window.innerHeight / REFERENCE_HEIGHT;
  const raw = Math.min(widthRatio, heightRatio);
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw));
}

export function ZoomWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // useLayoutEffect corre de forma síncrona, después de montar el DOM pero
  // ANTES de que el navegador pinte ese frame, así que el escalado ya está
  // aplicado en el primer pintado sin ningún salto visible. (Antes había
  // además un <script> inline pensado para el instante previo a que cargue
  // el JS de React; se quita porque React ahora avisa por consola al
  // renderizar <script> como JSX, y con useLayoutEffect el resultado visual
  // ya es el mismo en la práctica.)
  useLayoutEffect(() => {
    function updateScale() {
      if (ref.current) {
        ref.current.style.transform = `scale(${computeScale()})`;
      }
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformOrigin: "center center" }} suppressHydrationWarning>
      {children}
    </div>
  );
}
