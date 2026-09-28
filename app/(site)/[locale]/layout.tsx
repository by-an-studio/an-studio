import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../../i18n/routing";
import "../globals.css";
import { Header } from "../../_components/Header";
import { ThemeColorMeta } from "../../_components/ThemeColorMeta";
import { NavLeft } from "../../_components/NavLeft";
import { ConditionalFooter } from "../../_components/ConditionalFooter";
import { DisableScrollRestoration } from "../../_components/DisableScrollRestoration";
import { MobileNavProvider } from "../../_components/MobileNavContext";
import { PageTransition } from "../../_components/PageTransition";
import { LoadingScreen } from "../../_components/LoadingScreen";
import { SanityLive } from "../../../sanity/lib/live";
import { sanityFetch } from "../../../sanity/lib/live";
import { pick, pickLinkItems, toLocale } from "../../../i18n/locale";
import { draftMode } from "next/headers";

const williamSubhead = localFont({
  src: [
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Reg.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Reg Ita.ttf", weight: "400", style: "italic" },
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Bold.ttf", weight: "700", style: "normal" },
    { path: "../../../public/fonts/William Subhead Pro/William Subhead Pro Bold Ita.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-william",
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.byanstudio.com"),
  title: "An Studio",
  description: "Independent Design Studio",
  manifest: "/site.webmanifest",
  // Le indica a Google (y a redes sociales) cuál es el nombre "oficial" del
  // sitio, para que no muestre el dominio en crudo junto al título en los
  // resultados de búsqueda.
  openGraph: {
    siteName: "An Studio",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#FFFDF7",
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const FOOTER_QUERY = `*[_type == "footer"][0]{
  subscribeLabel,
  emailPlaceholder,
  subscribeButtonLabel,
  comingSoonLabel,
  aboutSubItems[]{label, href},
  clientApplicationSubItems[]{label, href},
  contactLabel,
  contactItems[]{label, href},
  socialLabel,
  socialItems[]{label, href},
  privacyPolicyLabel
}`;
// Work / Services footer sub-menus are generated automatically from the real
// work categories and services list, instead of being maintained by hand.
const FOOTER_WORK_CATEGORIES_QUERY = `*[_type == "workPage"][0]{
  categoryBrandIdentity,
  categoryPackaging,
  categoryWebDesign,
  categorySocialMedia
}`;
const FOOTER_SERVICES_LIST_QUERY = `*[_type == "services"][0]{
  servicesList[]{number, label}
}`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const locale = toLocale(rawLocale);
  const messages = await getMessages();
  const [{ data: rawFooter }, { data: rawWorkCategories }, { data: rawServicesList }] = await Promise.all([
    sanityFetch({ query: FOOTER_QUERY }),
    sanityFetch({ query: FOOTER_WORK_CATEGORIES_QUERY }),
    sanityFetch({ query: FOOTER_SERVICES_LIST_QUERY }),
  ]);
  const raw = rawFooter as any;
  const workCategoriesData = rawWorkCategories as any;
  const workCategoryDefs = [
    { value: "Brand Identity", label: pick(locale, workCategoriesData?.categoryBrandIdentity) || "Brand Identity" },
    { value: "Packaging", label: pick(locale, workCategoriesData?.categoryPackaging) || "Packaging" },
    { value: "Web Design", label: pick(locale, workCategoriesData?.categoryWebDesign) || "Web Design" },
    { value: "Social Media", label: pick(locale, workCategoriesData?.categorySocialMedia) || "Social Media" },
  ];
  const dynamicWorkSubItems = workCategoryDefs.map((c) => ({
    label: c.label,
    href: `/work?category=${encodeURIComponent(c.value)}`,
  }));
  const servicesListData = ((rawServicesList as any)?.servicesList ?? []) as any[];
  const dynamicServicesSubItems = servicesListData
    .map((s) => ({ label: pick(locale, s.label), href: `/services?service=${s.number}` }))
    .filter((item): item is { label: string; href: string } => Boolean(item.label));
  const footerData = raw
    ? {
        subscribeLabel: pick(locale, raw.subscribeLabel),
        emailPlaceholder: pick(locale, raw.emailPlaceholder),
        subscribeButtonLabel: pick(locale, raw.subscribeButtonLabel),
        comingSoonLabel: pick(locale, raw.comingSoonLabel),
        workSubItems: dynamicWorkSubItems,
        servicesSubItems: dynamicServicesSubItems,
        aboutSubItems: pickLinkItems(locale, raw.aboutSubItems),
        clientApplicationSubItems: pickLinkItems(locale, raw.clientApplicationSubItems),
        contactLabel: pick(locale, raw.contactLabel),
        contactItems: pickLinkItems(locale, raw.contactItems),
        socialLabel: pick(locale, raw.socialLabel),
        socialItems: pickLinkItems(locale, raw.socialItems),
        privacyPolicyLabel: pick(locale, raw.privacyPolicyLabel),
      }
    : null;
  return (
    <html lang={locale} className={`${williamSubhead.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Ambas cosas van embebidas directamente en <head> como HTML plano
            (nada de next/script ni del CSS compilado por Tailwind), para
            que se ejecuten/apliquen de forma síncrona ANTES de que el
            navegador llegue a parsear/pintar el <body> — así la pantalla de
            carga queda oculta desde el primer pintado en recargas dentro de
            la misma sesión, sin ningún flash de color. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html.ls-hide #an-studio-loading-screen{display:none!important}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              if (sessionStorage.getItem("an-studio-loading-shown") === "1") {
                document.documentElement.classList.add("ls-hide");
              }
            } catch (e) {}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <DisableScrollRestoration />
          <MobileNavProvider>
            <ThemeColorMeta />
            <LoadingScreen />
            <Header />
            <div className="relative flex-1 flex flex-col">
              <NavLeft />
              <PageTransition>{children}</PageTransition>
            </div>
          </MobileNavProvider>
          <ConditionalFooter data={footerData} />
          <SanityLive />
          {isDraftMode && (
            <div className="fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 bg-black px-4 py-2 text-center text-[12px] min-[1200px]:text-[9px] text-white">
              <span>Estás viendo una vista previa (borrador sin publicar).</span>
              <a href="/api/draft-mode/disable" className="underline">
                Salir de la vista previa
              </a>
            </div>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
