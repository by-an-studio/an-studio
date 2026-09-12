"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TOTAL_IMAGES = 8;
const INTERVAL_MS = 2000;

export function HeroImageCycle({
  onIndexChange,
}: {
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % TOTAL_IMAGES);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full aspect-[367/459]">
      {Array.from({ length: TOTAL_IMAGES }).map((_, i) => (
        <Image
          key={i}
          src={`/pages/home/${i + 1}.webp`}
          alt=""
          fill
          sizes="(min-width: 768px) 283px, 180px"
          priority={i === 0}
          quality={95}
          className={`object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
