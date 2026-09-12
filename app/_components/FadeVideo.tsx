"use client";

import { useState, type VideoHTMLAttributes } from "react";

export function FadeVideo({ className, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <video
      {...props}
      onLoadedData={(e) => {
        setLoaded(true);
        props.onLoadedData?.(e);
      }}
      className={`${className ?? ""} transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
