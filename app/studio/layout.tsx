import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "An Studio — CMS",
  description: "Sanity Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Lets the Sanity Dashboard (sanity.io/manage) communicate with this self-hosted Studio */}
        <script src="https://core.sanity-cdn.com/bridge.js" async type="module" />
      </body>
    </html>
  );
}
