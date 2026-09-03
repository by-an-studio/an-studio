"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;
const MIN_SCALE = 0.3;
const MAX_SCALE = 1;

export function ZoomWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    function updateScale() {
      const widthRatio = window.innerWidth / REFERENCE_WIDTH;
      const heightRatio = window.innerHeight / REFERENCE_HEIGHT;
      const raw = Math.min(widthRatio, heightRatio);
      setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw)));
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      className={className}
      style={{
        zoom: scale ?? 1,
        visibility: scale === null ? "hidden" : "visible",
      }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
