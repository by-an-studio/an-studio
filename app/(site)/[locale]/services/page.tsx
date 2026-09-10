import { ServicesClient } from "../../../_components/ServicesClient";
import { sanityFetch } from "../../../../sanity/lib/live";
import { pick, pickList, pickPortableText, toLocale } from "../../../../i18n/locale";

const SERVICES_QUERY = `*[_type == "services"][0]{
  headerLabel,
  headerTagline,
  servicesList[]{
    number,
    label,
    paragraphs,
    timeline,
    featuredImageIndex,
    featuredTags,
    featuredProject->{title, mainImage}
  },
  otherServicesTitle,
  otherServices,
  industryTitle,
  industry,
  contactTitle,
  contactLines
}`;


export default async function Services({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { service: initialService } = await searchParams;
  const { data: rawData } = await sanityFetch({ query: SERVICES_QUERY });
  const raw = rawData as any;

  const data = raw
    ? {
        headerLabel: pick(locale, raw.headerLabel),
        headerTagline: pick(locale, raw.headerTagline),
        servicesList: (raw.servicesList ?? []).map((s: any) => ({
          number: s.number,
          label: pick(locale, s.label),
          paragraphs: pickPortableText(locale, s.paragraphs),
          timeline: pick(locale, s.timeline),
          featuredImageIndex: s.featuredImageIndex,
          featuredTags: pickList(locale, s.featuredTags),
          featuredProject: s.featuredProject,
        })),
        otherServicesTitle: pick(locale, raw.otherServicesTitle),
        otherServices: pickList(locale, raw.otherServices),
        industryTitle: pick(locale, raw.industryTitle),
        industry: pickList(locale, raw.industry),
        contactTitle: pick(locale, raw.contactTitle),
        contactLines: pickList(locale, raw.contactLines),
      }
    : null;

  return <ServicesClient key={initialService ?? "default"} data={data} initialService={initialService} />;
}
