import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.135", "192.168.1.131", "192.168.1.143", "192.168.1.142", "192.168.1.128"],
  images: {
    qualities: [80, 90, 95],
    // Por defecto Next.js sirve las imágenes optimizadas con
    // Content-Disposition: attachment, lo que hace que "Abrir imagen en
    // pestaña nueva" (clic derecho) las descargue en vez de mostrarlas.
    // "inline" permite verlas en grande como una imagen normal.
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
