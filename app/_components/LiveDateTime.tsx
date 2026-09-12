"use client";

import { useEffect, useState } from "react";

export function LiveDateTime({ align = "right" }: { align?: "right" | "center" }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const date = now
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(now)
    : "";

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now)
    : "";

  return (
    <div
      className={`leading-tight min-w-[14ch] md:min-w-[19ch] ${
        align === "center" ? "text-center" : "text-right"
      }`}
    >
      <div className={`transition-opacity duration-150 ${now ? "opacity-100" : "opacity-0"}`}>{date || " "}</div>
      <div className={`transition-opacity duration-150 ${now ? "opacity-100" : "opacity-0"}`}>{time || " "}</div>
    </div>
  );
}
