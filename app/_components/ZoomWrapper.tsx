"use client";

import { useId, type ReactNode } from "react";

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;
const MIN_SCALE = 0.3;
const MAX_SCALE = 1;
const DESKTOP_BREAKPOINT = 767;

export function ZoomWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rawId = useId().replace(/[:]/g, "");
  const cls = `zw-${rawId}`;

  return (
    <div className={`${cls} ${className}`}>
      {/* Pure-CSS composition scaling: no JS/resize listeners needed, and no risk of a
          flash on initial paint since this is plain CSS applied on the very first render.
          calc(100vw / <ref>px) divides two lengths, yielding a unitless number usable in
          scale(); clamp() then bounds it, and the media query keeps mobile untouched
          (fixed sizes, no scaling) below the desktop breakpoint. */}
      <style>{`
        .${cls} {
          transform-origin: center center;
        }
        @media (min-width: ${DESKTOP_BREAKPOINT}px) {
          .${cls} {
            transform: scale(clamp(${MIN_SCALE}, min(calc(100vw / ${REFERENCE_WIDTH}px), calc(100vh / ${REFERENCE_HEIGHT}px)), ${MAX_SCALE}));
          }
        }
      `}</style>
      {children}
    </div>
  );
}
