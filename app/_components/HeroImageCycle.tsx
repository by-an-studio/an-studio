"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTERVAL_MS = 2000;

export function HeroImageCycle({
  images,
  onIndexChange,
}: {
  images: string[];
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="relative w-full aspect-[367/459] p-[10px]" style={{ backgroundColor: "#F2F0EC" }}>
      <div className="relative w-full h-full overflow-hidden">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
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
    </div>
  );
}
