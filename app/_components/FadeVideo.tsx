"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

export function FadeVideo({ className, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !props.autoPlay) return;
    // React (SSR + hydration) doesn't reliably reflect the `muted` prop as a
    // real DOM property/attribute before the browser's very first autoplay
    // attempt, which then gets silently blocked (autoplay is only allowed
    // when actually muted). Setting it explicitly here, right before
    // calling play() again, makes the retry succeed.
    if (props.muted) video.muted = true;
    video.play().catch(() => {});
  }, [props.src, props.autoPlay, props.muted]);

  return (
    <video
      {...props}
      ref={videoRef}
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
