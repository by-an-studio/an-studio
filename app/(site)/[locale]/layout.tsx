import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import "../globals.css";
import { Header } from "../../_components/Header";
import { NavLeft } from "../../_components/NavLeft";
import { ConditionalFooter } from "../../_components/ConditionalFooter";
import { DisableScrollRestoration } from "../../_components/DisableScrollRestoration";
import { MobileNavProvider } from "../../_components/MobileNavContext";
import { PageTransition } from "../../_components/PageTransition";
import { SanityLive } from "../../../sanity/lib/live";
import { sanityFetch } from "../../../sanity/lib/live";
import { pick, pickLinkItems, pickLinkItem, toLocale } from "../../../i18n/locale";

const williamSubhead = localFont({
  src: [
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Reg.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Reg Ita.ttf", weight: "400", style: "italic" },
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Bold.ttf", weight: "700", style: "normal" },
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Bold Ita.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-william",
});
// TODO: cuando publiquéis con el dominio definitivo, quitar el bloque "robots" de abajo
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://an-studio-six.vercel.app"),
  title: "An Studio",
  description: "Independent Design Studio",
  robots: { index: false, follow: false },
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const FOOTER_QUERY = `*[_type == "footer"][0]{
  subscribeLabel,
  emailPlaceholder,
  subscribeButtonLabel,
  comingSoonLabel,
  workSubItems[]{label, href},
  servicesSubItems[]{label, href},
  aboutSubItems[]{label, href},
  clientApplicationSubItems[]{label, href},
  contactLabel,
  contactMail{label, href},
  contactPhone{label, href},
  socialLabel,
  socialInstagram{label, href},
  socialPinterest{label, href},
  privacyPolicyLabel
}`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const messages = await getMessages();
  const { data: rawFooter } = await sanityFetch({ query: FOOTER_QUERY });
  const raw = rawFooter as any;
  const footerData = raw
    ? {
        subscribeLabel: pick(locale, raw.subscribeLabel),
        emailPlaceholder: pick(locale, raw.emailPlaceholder),
        subscribeButtonLabel: pick(locale, raw.subscribeButtonLabel),
        comingSoonLabel: pick(locale, raw.comingSoonLabel),
        workSubItems: pickLinkItems(locale, raw.workSubItems),
        servicesSubItems: pickLinkItems(locale, raw.servicesSubItems),
        aboutSubItems: pickLinkItems(locale, raw.aboutSubItems),
        clientApplicationSubItems: pickLinkItems(locale, raw.clientApplicationSubItems),
        contactLabel: pick(locale, raw.contactLabel),
        contactMail: pickLinkItem(locale, raw.contactMail),
        contactPhone: pickLinkItem(locale, raw.contactPhone),
        socialLabel: pick(locale, raw.socialLabel),
        socialInstagram: pickLinkItem(locale, raw.socialInstagram),
        socialPinterest: pickLinkItem(locale, raw.socialPinterest),
        privacyPolicyLabel: pick(locale, raw.privacyPolicyLabel),
      }
    : null;
  return (
    <html lang={locale} className={`${williamSubhead.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <DisableScrollRestoration />
          <MobileNavProvider>
            <Header />
            <div className="relative flex-1 flex flex-col">
              <NavLeft />
              <PageTransition>{children}</PageTransition>
            </div>
          </MobileNavProvider>
          <ConditionalFooter data={footerData} />
          <SanityLive />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
