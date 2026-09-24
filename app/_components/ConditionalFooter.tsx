"use client";
import { usePathname } from "../../i18n/navigation";
import { Footer, type FooterData } from "./Footer";

export function ConditionalFooter({ data }: { data: FooterData | null }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const bgColor = pathname.startsWith("/shop") ? "#FFFDE8" : undefined;
  return <Footer data={data} bgColor={bgColor} />;
}
