"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Grid } from "./Grid";
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
  contactMail?: FooterLinkItem;
  contactPhone?: FooterLinkItem;
  socialLabel?: string;
  socialInstagram?: FooterLinkItem;
  socialPinterest?: FooterLinkItem;
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
      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }
  return <Link href={item.href}>{item.label}</Link>;
}

function FooterColumn({ col }: { col: FooterColumnData }) {
  return (
    <div className="md:shrink-0">
      <Link href={col.href} className="flex items-baseline gap-2 text-[16px] md:text-[18px]">
        <span className="text-[10px]">{col.roman}</span>
        <span>{col.label}</span>
      </Link>
      {col.subItems.length > 0 && (
        <ul className="mt-[2px] md:mt-2 space-y-1">
          {col.subItems.map((item, i) => (
            <li key={i} className="text-[12px] md:text-sm whitespace-nowrap">
              <SubItemLink item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer({ data }: { data: FooterData | null }) {
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
      subItems: [data?.contactMail, data?.contactPhone].filter((v): v is PlainSubItem => Boolean(v)),
    },
    {
      roman: "VIII",
      label: data?.socialLabel ?? "Social",
      href: "#",
      subItems: [data?.socialInstagram, data?.socialPinterest].filter((v): v is PlainSubItem => Boolean(v)),
    },
    { roman: "IX", label: data?.privacyPolicyLabel ?? "Privacy Policy", href: "/privacy-policy", subItems: [] },
  ];

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
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
        body: JSON.stringify({ email, company }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }
  return (
    <footer className="w-full pt-20 pb-[30px]">
      <div className="h-auto md:h-[400px] min-[1200px]:h-[600px] flex flex-col gap-[60px] px-5 md:flex-row md:flex-wrap md:content-start md:justify-between md:gap-y-14">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:contents">
          {[...mainColumns, ...secondaryColumns].map((col) => (
            <FooterColumn key={col.roman} col={col} />
          ))}
        </div>
      </div>
      <Grid className="mt-24 min-[1200px]:mt-0 items-end">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-span-6">
          <p className="mb-4 text-[16px]">{data?.subscribeLabel ?? "Subscribe to our Newsletter"}</p>
          <form onSubmit={handleSubmit} className="relative flex gap-2" suppressHydrationWarning>
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute w-0 h-0 opacity-0 -z-10"
            />
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
                  className="bg-[#EFECE6]/60 text-black/60 placeholder:text-black/60 px-4 text-[16px] w-full h-full box-border focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 bg-[#EFECE6]/60 text-black/60 px-4 h-[27px] flex items-center justify-center text-[12px] min-[1200px]:text-[16px] focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              {status === "submitting" ? "..." : (data?.subscribeButtonLabel ?? "Subscribe")}
            </button>
            {status === "error" && (
              <p className="absolute left-0 top-full mt-1 text-[10px] text-red-600">Something went wrong, please try again.</p>
            )}
            <span
              className={`absolute left-0 top-full mt-1 text-[10px] transition-opacity duration-200 ${
                showEmptyWarning ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              Please enter your email
            </span>
          </form>
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-4 text-[12px] min-[1200px]:text-[16px] leading-tight min-[1200px]:leading-normal text-center min-[1200px]:text-left mt-16 min-[1200px]:mt-0">An Studio 2026®</div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-6 text-[12px] min-[1200px]:text-[16px] leading-tight min-[1200px]:leading-normal text-center min-[1200px]:text-left -mt-5 min-[1200px]:mt-0">Independent Design Studio</div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-21 min-[1200px]:col-span-4 flex justify-center min-[1200px]:justify-end mt-10 min-[1200px]:mt-0 w-full">
          <Image
            src="/logo/an-studio.svg"
            alt="An Studio"
            width={140}
            height={24}
            className="w-full h-auto min-[1200px]:w-[140px]"
          />
        </div>
      </Grid>
    </footer>
  );
}
