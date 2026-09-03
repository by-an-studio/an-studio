import { Grid } from "../../_components/Grid";
import { WorkFilters } from "../../_components/WorkFilters";

const projects = Array.from({ length: 15 }, (_, i) => ({
  index: String(i + 1).padStart(3, "0"),
  slug: `project-${i + 1}`,
}));

export default function Work() {
  return (
    <main className="w-full pt-32 pb-24">
      <Grid className="static md:fixed md:top-6 md:inset-x-0 z-20 min-h-[70px] md:min-h-0">
        <div className="col-span-8 md:col-start-9 md:col-span-11 flex gap-2">
          <span className="text-xs underline mt-[6px] shrink-0">NOTE:</span>
          <p className="text-[20px] leading-snug">
            &ldquo;Designing Brands With Lasting Presence&rdquo; Brand
            Identity, Packaging &amp; Web Design For <em>Beauty</em>,{" "}
            <em>Fashion</em> &amp; <em>Lifestyle</em> Brands
          </p>
        </div>
      </Grid>

      <Grid className="mt-[clamp(60px,8.3333vw,160px)]">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-5 mb-16 min-[1200px]:mb-0 min-[1200px]:sticky min-[1200px]:top-1/2 min-[1200px]:-translate-y-1/2 min-[1200px]:self-start h-fit">
          <WorkFilters />
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-9 min-[1200px]:col-span-16">
          <div className="grid grid-cols-2 md:max-[1199px]:grid-cols-4 min-[1200px]:grid-cols-5 min-[1200px]:grid-rows-3 gap-x-5 gap-y-16 min-[1200px]:h-[70svh]">
            {projects.map((p) => (
              <a key={p.index} href={`/work/${p.slug}`} className="flex flex-col min-[1200px]:h-full">
                <p className="text-xs mb-2">{p.index}</p>
                <div className="aspect-square min-[1200px]:aspect-auto min-[1200px]:flex-1 bg-muted/20" />
              </a>
            ))}
          </div>
        </div>
      </Grid>
    </main>
  );
}
