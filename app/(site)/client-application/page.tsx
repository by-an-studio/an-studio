import { ClientApplicationClient } from "../../_components/ClientApplicationClient";
import { sanityFetch } from "../../../sanity/lib/live";

const CLIENT_APPLICATION_QUERY = `*[_type == "clientApplication"][0]{
  heroTitle,
  heroTagline,
  heroImages,
  headline,
  featuredImages[]{image, imageIndex, caption, tags},
  servicesTitle,
  servicesList
}`;

export default async function ClientApplication() {
  const { data: rawData } = await sanityFetch({ query: CLIENT_APPLICATION_QUERY });
  const data = rawData as any;
  return <ClientApplicationClient data={data} />;
}
