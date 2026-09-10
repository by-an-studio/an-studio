import { ClientApplicationClient } from "../../../_components/ClientApplicationClient";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, pickList, toLocale } from "../../../../i18n/locale";

const CLIENT_APPLICATION_QUERY = `*[_type == "clientApplication"][0]{
  heroTitle,
  heroTagline,
  heroImages,
  headline,
  featuredImages[]{image, imageIndex, caption, tags},
  servicesTitle,
  servicesList
}`;


export default async function ClientApplication({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { data: rawData } = await sanityFetch({ query: CLIENT_APPLICATION_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        heroTitle: pick(locale, raw.heroTitle),
        heroTagline: pick(locale, raw.heroTagline),
        heroImages: raw.heroImages,
        headline: pick(locale, raw.headline),
        featuredImages: (raw.featuredImages ?? []).map((item: any) => ({
          image: item.image,
          imageIndex: item.imageIndex,
          caption: pick(locale, item.caption),
          tags: item.tags,
        })),
        servicesTitle: pick(locale, raw.servicesTitle),
        servicesList: pickList(locale, raw.servicesList),
      }
    : null;

  return <ClientApplicationClient data={data} />;
}
