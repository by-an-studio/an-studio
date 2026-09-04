import { Grid } from "../../_components/Grid";
import { WorkFilters } from "../../_components/WorkFilters";

const projects = Array.from({ length: 15 }, (_, i) => ({
  index: String(i + 1).padStart(3, "0"),
  slug: `project-${i + 1}`,
}));

export default function Work() {
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
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-5 mb-16 min-[1200px]:mb-0 min-[1200px]:-translate-y-22">
            <WorkFilters />
          </div>

          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-16 min-[1200px]:h-full">
            <div className="grid grid-cols-2 md:max-[1199px]:grid-cols-4 min-[1200px]:grid-cols-5 min-[1200px]:grid-rows-3 gap-x-5 gap-y-16 min-[1200px]:h-full">
              {projects.map((p) => (
                <a key={p.index} href={`/work/${p.slug}`} className="flex flex-col min-[1200px]:h-full min-[1200px]:min-h-0">
                  <p className="text-xs mb-2 shrink-0">{p.index}</p>
                  <div className="aspect-[3/4] min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:max-w-full min-[1200px]:min-h-0 bg-muted/20 p-[30px]" />
                </a>
              ))}
            </div>
          </div>
        </Grid>
      </div>
    </main>
  );
}
