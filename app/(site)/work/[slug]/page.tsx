import Link from "next/link";
import { Grid } from "../../../_components/Grid";

const categories = ["Logotype", "Monogram", "Web Design", "Packaging"];

const galleryRow = [
  { index: "03", tags: ["Brand World", "Web Design"] },
  { index: "04", tags: ["Brand World", "Web Design"] },
  { index: "05", tags: ["Brand World", "Web Design"] },
  { index: "06", tags: ["Brand World", "Web Design"] },
];

export default function ProjectDetail() {
  return (
    <main className="w-full pb-[30px]">
      <div className="relative min-[1200px]:min-h-[100svh] flex flex-col gap-16 min-[1200px]:gap-[50px]">
        <Grid>
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21 pt-[150px] flex justify-between">
            <Link href="/work" className="flex items-center gap-3 text-[14px] uppercase">
              <svg
                width="10"
                height="8"
                viewBox="0 0 16 10"
                fill="none"
                className="rotate-180"
              >
                <path
                  d="M1 5H15M15 5L10 1M15 5L10 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back</span>
            </Link>
            <Link href="/work" className="flex items-center gap-3 text-[14px] uppercase">
              <span>Next</span>
              <svg width="10" height="8" viewBox="0 0 16 10" fill="none">
                <path
                  d="M1 5H15M15 5L10 1M15 5L10 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Grid>

        <Grid className="pb-[30px] min-[1200px]:flex-1 min-[1200px]:min-h-0 items-start min-[1200px]:items-center">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:4/15] min-[1400px]:[grid-column:4/14] min-[1600px]:[grid-column:4/13] min-[1800px]:[grid-column:4/12] min-[1200px]:self-stretch mb-8 min-[1200px]:mb-0 flex flex-col">
            <div>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px]">(006.)</p>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px]">SB Joaillerie</p>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px] mb-8">Brand World</p>

              <p className="underline decoration-1 mb-4">(About)</p>
              <p className="text-[18px] leading-tight mb-4">
                SB Joaillerie was developed as a contemporary jewelry brand
                rooted in heritage, craftsmanship and the beauty of objects
                made to endure. The creative direction drew from handwritten
                letters, engraved monograms, antique seals, heirloom pieces
                and historical decorative arts, reinterpreting these
                references through a refined contemporary lens.
              </p>
              <p className="text-[18px] leading-tight mb-8">
                From the custom logotype and monogram to typography, color and
                imagery, every element was considered to create a visual
                identity that feels elegant, intimate and timeless.
              </p>

              <p className="underline decoration-1 mb-4 text-[18px]">(Categories)</p>
              <div className="flex flex-wrap gap-4 min-[1200px]:gap-8 text-[12px] uppercase">
                {categories.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>

            <p className="text-[16px] min-[1200px]:text-[18px] leading-tight mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
              The identity balances historical references with a
              contemporary point of view, using a custom logotype, monogram,
              refined typography, restrained color and editorial art
              direction to create a cohesive and distinctive visual world
              with intention.
            </p>
          </div>

          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
            <div className="grid grid-cols-9 gap-5 mb-8">
              <p className="col-span-8 text-[16px] min-[1200px]:text-[18px] leading-tight">
                A refined jewelry identity rooted in heritage and
                craftsmanship, shaped by historical references and a timeless
                contemporary sensibility.
              </p>
            </div>

          <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5">
            <div className="col-span-1 min-[1200px]:col-span-3">
              <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
              <div className="flex gap-2 text-[12px]">
                <span>Img. 01</span>
                <div>
                  <p>SB Joaillerie</p>
                  <div className="text-muted">
                    <p>Brand World</p>
                    <p>Web Design</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 min-[1200px]:col-start-4 min-[1200px]:col-span-6">
              <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
              <div className="flex gap-2 text-[12px]">
                <span>Img. 02</span>
                <div>
                  <p>SB Joaillerie</p>
                  <div className="text-muted">
                    <p>Brand World</p>
                    <p>Web Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Grid>
      </div>

      <Grid className="mt-24">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21">
          <div className="flex overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1200px]:grid min-[1200px]:grid-cols-4 min-[1200px]:overflow-visible">
            {galleryRow.map((img) => (
              <div key={img.index} className="shrink-0 w-[75vw] min-[1200px]:w-auto">
                <div className="relative aspect-[3/4] bg-muted/20 mb-4" />
                <div className="flex gap-2 text-[12px]">
                  <span>Img. {img.index}</span>
                  <div>
                    <p>SB Joaillerie</p>
                    <div className="text-muted">
                      {img.tags.map((tag) => (
                        <p key={tag}>{tag}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Grid>

      <Grid className="mt-24 items-start">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-8 mb-16 min-[1200px]:mb-0 min-[1200px]:self-stretch flex flex-col">
          <p className="text-[16px] min-[1200px]:text-[18px] leading-tight mb-8">
            The visual identity was designed to feel both inherited and
            contemporary. Engraved details, traditional monograms,
            handwritten forms and antique jewelry shaped the creative
            direction, reinterpreted through a more restrained graphic
            approach.
          </p>

          <div className="grid grid-cols-8 gap-5 mb-8">
            <div className="col-span-3 min-[1200px]:col-span-2 text-[12px] uppercase">
              <p>Timeline:</p>
              <p className="mb-4">Five Months</p>
              <p>Service:</p>
              <p>Brand World</p>
            </div>
            <p className="col-span-5 min-[1200px]:col-span-6 text-[16px] min-[1200px]:text-[18px] leading-tight">
              Across the logotype, monogram, typography, color palette and
              imagery, each element was developed to feel connected,
              creating a cohesive world with character, elegance and
              lasting relevance.
            </p>
          </div>

          <p className="text-muted text-[12px]">
            A Complete Visual Identity Shaped Through Typography, Monogram,
            Color And Image Direction.
          </p>

          <div className="grid grid-cols-2 min-[1200px]:grid-cols-8 gap-5 mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
            <div className="col-span-1 min-[1200px]:col-span-3">
              <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
              <div className="flex gap-2 text-[12px]">
                <span>Img. 07</span>
                <div>
                  <p>SB Joaillerie</p>
                  <div className="text-muted">
                    <p>Brand World</p>
                    <p>Web Design</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 min-[1200px]:col-span-3">
              <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
              <div className="flex gap-2 text-[12px]">
                <span>Img. 08</span>
                <div>
                  <p>SB Joaillerie</p>
                  <div className="text-muted">
                    <p>Brand World</p>
                    <p>Web Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:13/17] min-[1600px]:[grid-column:13/16] mb-8 min-[1200px]:mb-0">
          <p className="text-[16px] min-[1200px]:text-[14px] leading-tight">
            A visual identity where historical references, refined
            typography and contemporary art direction come together to
            create an elegant and timeless world.
          </p>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-7">
          <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
          <div className="flex gap-2 text-[12px]">
            <span>Img. 09</span>
            <div>
              <p>SB Joaillerie</p>
              <div className="text-muted">
                <p>Brand World</p>
                <p>Web Design</p>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </main>
  );
}
