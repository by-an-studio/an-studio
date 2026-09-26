"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Grid } from "./Grid";
import { Turnstile } from "./Turnstile";
import { Link } from "../../i18n/navigation";

type FooterLinkItem = { label: string; href?: string };

export type FooterData = {
  subscribeLabel?: string;
  emailPlaceholder?: string;
  subscribeButtonLabel?: string;
  comingSoonLabel?: string;
  workSubItems?: FooterLinkItem[];
  servicesSubItems?: FooterLinkItem[];
  aboutSubItems?: FooterLinkItem[];
  clientApplicationSubItems?: FooterLinkItem[];
  contactLabel?: string;
  contactItems?: FooterLinkItem[];
  socialLabel?: string;
  socialItems?: FooterLinkItem[];
  privacyPolicyLabel?: string;
};

type PlainSubItem = { label: string; href?: string };
type FooterColumnData = { roman: string; label: string; href: string; subItems: PlainSubItem[] };

function SubItemLink({ item }: { item: PlainSubItem }) {
  if (!item.href) {
    return <span>{item.label}</span>;
  }
  const isExternal = /^https?:\/\//.test(item.href) || item.href.startsWith("mailto:") || item.href.startsWith("tel:");
  if (isExternal) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="transition-opacity duration-200 hover:opacity-40"
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className="transition-opacity duration-200 hover:opacity-40">
      {item.label}
    </Link>
  );
}

function FooterColumn({ col }: { col: FooterColumnData }) {
  return (
    <div className="md:shrink-0">
      <Link href={col.href} className={`flex items-baseline gap-2 text-[16px] md:text-[16px] transition-opacity duration-200 ${col.href === "#" ? "" : "hover:opacity-40"}`}>
        <span className="inline-block min-w-[20px] min-[1200px]:min-w-[14px] text-[11px] min-[1200px]:text-[8px]">{col.roman}</span>
        <span>{col.label}</span>
      </Link>
      {col.subItems.length > 0 && (
        <ul className="mt-[2px] md:mt-2 space-y-1 ml-[28px] min-[1200px]:ml-[22px]">
          {col.subItems.map((item, i) => (
            <li key={i} className="text-[12px] md:text-[12px] whitespace-nowrap">
              <SubItemLink item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Composición específica para responsive: numeral romano centrado encima del
// título (en vez de al lado, como en escritorio), y agrupado en filas
// concretas en vez del grid uniforme de 2 columnas.
function FooterColumnMobile({ col, hideSubItems }: { col: FooterColumnData; hideSubItems?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center leading-tight">
      <Link href={col.href} className={`flex flex-col items-center gap-1 leading-tight transition-opacity duration-200 ${col.href === "#" ? "" : "hover:opacity-40"}`}>
        <span className="text-[11px] leading-tight">{col.roman}</span>
        <span className="text-[19px] leading-tight">{col.label}</span>
      </Link>
      {!hideSubItems && col.subItems.length > 0 && (
        <ul className="mt-2 space-y-1 leading-tight">
          {col.subItems.map((item, i) => (
            <li key={i} className="text-[15px] leading-tight whitespace-nowrap">
              <SubItemLink item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer({ data, bgColor }: { data: FooterData | null; bgColor?: string }) {
  const tNav = useTranslations("nav");

  const mainColumns: FooterColumnData[] = [
    { roman: "I", label: tNav("work"), href: "/work", subItems: data?.workSubItems ?? [] },
    { roman: "II", label: tNav("services"), href: "/services", subItems: data?.servicesSubItems ?? [] },
    { roman: "III", label: tNav("about"), href: "/about", subItems: data?.aboutSubItems ?? [] },
    { roman: "IV", label: tNav("clientApplication"), href: "/client-application", subItems: data?.clientApplicationSubItems ?? [] },
    { roman: "V", label: tNav("journal"), href: "/journal", subItems: [] },
    { roman: "VI", label: tNav("shop"), href: "/shop", subItems: [] },
  ];
  const secondaryColumns: FooterColumnData[] = [
    {
      roman: "VII",
      label: data?.contactLabel ?? "Contact",
      href: "#",
      subItems: data?.contactItems ?? [],
    },
    {
      roman: "VIII",
      label: data?.socialLabel ?? "Social",
      href: "#",
      subItems: data?.socialItems ?? [],
    },
    { roman: "IX", label: data?.privacyPolicyLabel ?? "Privacy Policy", href: "/privacy-policy", subItems: [] },
  ];

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setShowEmptyWarning(true);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, turnstileToken }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }
  return (
    <footer className="w-full mt-[60px] pt-[60px] pb-[30px] bg-[#FFFDF7]" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      {/* Responsive: composición agrupada por filas específicas */}
      <div className="min-[1200px]:hidden flex flex-col gap-10 px-5">
        <div className="flex flex-row justify-center gap-[clamp(64px,16vw,220px)]">
          {mainColumns.slice(0, 3).map((col) => (
            <FooterColumnMobile key={col.roman} col={col} hideSubItems />
          ))}
        </div>
        <FooterColumnMobile col={mainColumns[3]} hideSubItems />
        <div className="flex flex-row justify-center gap-[clamp(64px,16vw,220px)]">
          <FooterColumnMobile col={mainColumns[4]} />
          <FooterColumnMobile col={mainColumns[5]} />
        </div>
        {secondaryColumns.map((col) => (
          <FooterColumnMobile key={col.roman} col={col} />
        ))}
      </div>

      {/* Escritorio: grid flex-wrap sin cambios */}
      <div className="hidden min-[1200px]:flex min-[1200px]:h-[600px] px-5 min-[1200px]:flex-row min-[1200px]:flex-wrap min-[1200px]:content-start min-[1200px]:justify-between min-[1200px]:gap-y-14">
        {[...mainColumns, ...secondaryColumns].map((col) => (
          <FooterColumn key={col.roman} col={col} />
        ))}
      </div>
      <Grid className="mt-24 min-[1200px]:mt-0 items-end">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-span-6 min-[1200px]:row-start-1">
          <p className="mb-4 text-center min-[1200px]:text-left text-[16px] min-[1200px]:text-[14px]">{data?.subscribeLabel ?? "Subscribe to our Newsletter"}</p>
          <form onSubmit={handleSubmit} className="relative flex gap-2" suppressHydrationWarning>
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              suppressHydrationWarning
              className="absolute w-0 h-0 opacity-0 -z-10"
            />
            <div className="absolute left-0 top-full mt-6">
              <Turnstile onToken={setTurnstileToken} />
            </div>
            <div className="flex-1 h-[27px] overflow-hidden flex items-center">
              <div className="shrink-0 w-[133.3333%] h-[36px] min-[1200px]:w-full min-[1200px]:h-[27px] origin-left scale-75 min-[1200px]:scale-100">
                <input
                  type="email"
                  placeholder={status === "sent" ? (data?.comingSoonLabel ?? "Coming soon!") : (data?.emailPlaceholder ?? "Email Address")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (showEmptyWarning) setShowEmptyWarning(false);
                  }}
                  suppressHydrationWarning
                  className="bg-[#EFECE6]/60 text-black/60 placeholder:text-black/60 px-4 text-[16px] min-[1200px]:text-[14px] w-full h-full box-border focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 bg-[#EFECE6]/60 text-black/60 px-4 h-[27px] flex items-center justify-center text-[12px] min-[1200px]:text-[14px] focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              {status === "submitting" ? "..." : (data?.subscribeButtonLabel ?? "Subscribe")}
            </button>
            {status === "error" && (
              <p className="absolute left-0 top-full mt-1 text-[11px] min-[1200px]:text-[8px] text-red-600">Something went wrong, please try again.</p>
            )}
            <span
              className={`absolute left-0 top-full mt-1 text-[11px] min-[1200px]:text-[8px] transition-opacity duration-200 ${
                showEmptyWarning ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              Please enter your email
            </span>
          </form>
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-6 min-[1200px]:row-start-1 text-[16px] min-[1200px]:text-[14px] leading-tight min-[1200px]:leading-normal text-center min-[1200px]:text-left mt-16 min-[1200px]:mt-0">Independent Design Studio</div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-4 min-[1200px]:row-start-1 text-[16px] min-[1200px]:text-[14px] leading-tight min-[1200px]:leading-normal text-center min-[1200px]:text-left -mt-5 min-[1200px]:mt-0">An Studio 2026®</div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-21 min-[1200px]:col-span-4 min-[1200px]:row-start-1 flex justify-center min-[1200px]:justify-end mt-10 min-[1200px]:mt-0 w-full">
          <Image
            src="/logo/an-studio.svg"
            alt="An Studio"
            width={150}
            height={26}
            className="w-[150px] h-auto min-[1200px]:w-[120px]"
          />
        </div>
      </Grid>
    </footer>
  );
}
