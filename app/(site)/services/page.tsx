import { ServicesClient } from "../../_components/ServicesClient";
import { sanityFetch } from "../../../sanity/lib/live";

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

export default async function Services() {
  const { data: rawData } = await sanityFetch({ query: SERVICES_QUERY });
  const data = rawData as any;
  return <ServicesClient data={data} />;
}
