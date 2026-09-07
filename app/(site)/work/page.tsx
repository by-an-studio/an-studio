import { Grid } from "../../_components/Grid";
import { WorkGrid, type WorkProject } from "../../_components/WorkGrid";
import { sanityFetch } from "../../../sanity/lib/live";

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt asc){
  title,
  "slug": slug.current,
  category,
  projectNumber,
  mainImage
}`;

export default async function Work() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const projectList = (projects ?? []) as WorkProject[];

  return (
    <main className="w-full pt-24 min-[1200px]:pt-0 pb-[30px] flex flex-col justify-between min-h-[100svh]">
      <Grid className="pt-5 min-h-[70px] min-[1200px]:min-h-0">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-11 flex gap-2">
          <span className="text-xs underline mt-[6px] shrink-0">NOTE:</span>
          <p className="text-[20px] leading-snug">
            &ldquo;Designing Brands With Lasting Presence&rdquo; Brand
            Identity, Packaging &amp; Web Design For <em>Beauty</em>,{" "}
            <em>Fashion</em> &amp; <em>Lifestyle</em> Brands
          </p>
        </div>
      </Grid>
      <div className="relative mt-16 min-[1200px]:mt-0 min-[1200px]:h-[78svh]">
        <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center">
          <WorkGrid projects={projectList} />
        </Grid>
      </div>
    </main>
  );
}
