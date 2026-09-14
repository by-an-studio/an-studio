import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.135", "192.168.1.131"],
  async headers() {
    return [
      {
        // Lets the Sanity Dashboard (sanity.io/manage) embed the Studio in an iframe
        source: "/studio/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://*.sanity.io https://sanity.io;",
          },
        ],
      },
    ];
  },
  images: {
    qualities: [80, 90, 95],
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
