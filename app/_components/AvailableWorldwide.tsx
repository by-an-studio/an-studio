"use client";

import { usePathname } from "next/navigation";

export function AvailableWorldwide() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="hidden min-[1200px]:block absolute left-5 top-0 bottom-[30px] w-0 z-20">
      <p className="sticky top-[calc(100dvh-50px)] text-[16px] whitespace-nowrap">
        Available Worldwide
      </p>
    </div>
  );
}
