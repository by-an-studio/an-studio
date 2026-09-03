import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Header } from "../_components/Header";
import { NavLeft } from "../_components/NavLeft";
import { ConditionalFooter } from "../_components/ConditionalFooter";

const williamSubhead = localFont({
  src: [
    { path: "../../public/fonts/William Subhead Pro/William Subhead Pro Reg.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/William Subhead Pro/William Subhead Pro Reg Ita.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/William Subhead Pro/William Subhead Pro Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/William Subhead Pro/William Subhead Pro Bold Ita.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-william",
});

export const metadata: Metadata = {
  title: "An Studio",
  description: "Independent Design Studio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${williamSubhead.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }`}
        </Script>
        <Header />
        <div className="relative flex-1 flex flex-col">
          <NavLeft />
          {children}
        </div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
