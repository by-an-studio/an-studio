import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

export type Loc = { es?: string; en?: string };

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export function toLocale(value: string): Locale {
  return isLocale(value) ? value : routing.defaultLocale;
}

export function pick(locale: Locale, field?: Loc): string | undefined {
  if (!field) return undefined;
  const value = field[locale];
  return value || field.en || field.es || undefined;
}

export function pickList(locale: Locale, list?: Loc[]): string[] | undefined {
  return list?.map((item) => pick(locale, item)).filter((t): t is string => Boolean(t));
}

export function pickPortableText(locale: Locale, field?: { es?: any[]; en?: any[] }): any[] | undefined {
  if (!field) return undefined;
  return field[locale] || field.en || field.es || undefined;
}

export type LinkItem = { label?: Loc; href?: string };

export function pickLinkItems(locale: Locale, list?: LinkItem[]): { label: string; href?: string }[] | undefined {
  return list
    ?.map((item) => ({ label: pick(locale, item.label) ?? "", href: item.href }))
    .filter((item) => Boolean(item.label));
}

export function pickLinkItem(locale: Locale, item?: LinkItem): { label: string; href?: string } | undefined {
  if (!item) return undefined;
  const label = pick(locale, item.label);
  if (!label) return undefined;
  return { label, href: item.href };
}

export function buildAlternates(locale: Locale, pathname: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://an-studio-six.vercel.app";
  const path = pathname === "/" ? "" : pathname;
  return {
    canonical: `${base}/${locale}${path}`,
    languages: {
      en: `${base}/en${path}`,
      es: `${base}/es${path}`,
      "x-default": `${base}/en${path}`,
    },
  };
}
