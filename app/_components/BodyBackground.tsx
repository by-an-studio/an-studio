"use client";

import { useEffect } from "react";

export function BodyBackground({ color }: { color: string }) {
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, [color]);

  return null;
}
