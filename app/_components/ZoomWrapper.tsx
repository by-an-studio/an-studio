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
      {/* Runs synchronously as the browser parses this HTML, before first paint,
          so the correct scale is applied immediately and there's no flash/jump.
          Uses transform:scale computed in JS (not CSS calc()/clamp() dividing two
          lengths, which Firefox doesn't reliably support inside transform — that's
          what silently broke the zoom effect there while Chrome/Safari were fine).
          Below the desktop breakpoint, scale is forced to 1 so mobile keeps its own
          fixed sizes untouched by this composition-scaling effect. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var s=document.currentScript;var el=s.parentElement;var bw=${DESKTOP_BREAKPOINT};var r=1;if(window.innerWidth>=bw){var w=window.innerWidth/${REFERENCE_WIDTH};var h=window.innerHeight/${REFERENCE_HEIGHT};r=Math.min(w,h);r=Math.min(${MAX_SCALE},Math.max(${MIN_SCALE},r));}el.style.transform='scale('+r+')';})();`,
        }}
      />
      {children}
    </div>
  );
}
