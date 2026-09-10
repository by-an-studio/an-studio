"use client";
import { usePathname } from "../../i18n/navigation";
import { Footer, type FooterData } from "./Footer";

export function ConditionalFooter({ data }: { data: FooterData | null }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer data={data} />;
}
