"use client";

import { useState } from "react";
import { HeroImageCycle } from "./HeroImageCycle";

function pad(n: number) {
  return String(n).padStart(3, "0");
}

export function HeroVisual() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col items-center gap-20">
      <span className="z-[-1] text-xs hidden md:block">{pad(index + 1)}</span>
      <div className="w-[283.18px]">
        <HeroImageCycle onIndexChange={setIndex} />
      </div>
      <span className="z-[-1] text-xs hidden md:block">{pad(index + 1)}</span>
    </div>
  );
}
