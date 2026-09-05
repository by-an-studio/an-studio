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
    <main className="w-full pt-24 min-[1200px]:pt-0 pb-[30px]">
      <Grid className="pt-6">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21 flex justify-between">
          <Link href="/work" className="underline decoration-1 text-[14px]">
            &larr; Back
          </Link>
          <Link href="/work" className="underline decoration-1 text-[14px]">
            Next &rarr;
          </Link>
        </div>
      </Grid>

      <Grid className="mt-16 items-start">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-7 mb-16 min-[1200px]:mb-0">
          <p className="underline decoration-1 text-[24px]">(006.)</p>
          <p className="underline decoration-1 text-[24px]">SB Joaillerie</p>
          <p className="underline decoration-1 text-[24px] mb-8">Brand World</p>

          <p className="underline decoration-1 mb-4">(About)</p>
          <p className="text-[16px] leading-tight mb-4">
            SB Joaillerie was developed as a contemporary jewelry brand
            rooted in heritage, craftsmanship and the beauty of objects
            made to endure. The creative direction drew from handwritten
            letters, engraved monograms, antique seals, heirloom pieces
            and historical decorative arts, reinterpreting these
            references through a refined contemporary lens.
          </p>
          <p className="text-[16px] leading-tight mb-8">
            From the custom logotype and monogram to typography, color and
            imagery, every element was considered to create a visual
            identity that feels elegant, intimate and timeless.
          </p>

          <p className="underline decoration-1 mb-4">(Categories)</p>
          <div className="flex flex-wrap gap-8 text-[12px] uppercase mb-16">
            {categories.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>

          <p className="text-[16px] leading-tight">
            The identity balances historical references with a
            contemporary point of view, using a custom logotype, monogram,
            refined typography, restrained color and editorial art
            direction to create a cohesive and distinctive visual world
            with intention.
          </p>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11">
          <p className="text-[16px] leading-tight mb-8">
            A refined jewelry identity rooted in heritage and
            craftsmanship, shaped by historical references and a timeless
            contemporary sensibility.
          </p>

          <div className="grid grid-cols-11 gap-5">
            <div className="col-span-4">
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
            <div className="col-start-6 col-span-6">
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

      <Grid className="mt-24">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21">
          <div className="grid grid-cols-2 md:max-[1199px]:grid-cols-4 min-[1200px]:grid-cols-4 gap-5">
            {galleryRow.map((img) => (
              <div key={img.index}>
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
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-9 mb-16 min-[1200px]:mb-0">
          <p className="text-[16px] leading-tight mb-8">
            The visual identity was designed to feel both inherited and
            contemporary. Engraved details, traditional monograms,
            handwritten forms and antique jewelry shaped the creative
            direction, reinterpreted through a more restrained graphic
            approach.
          </p>

          <div className="flex gap-8 mb-8">
            <div className="text-[12px] uppercase shrink-0">
              <p>Timeline:</p>
              <p className="mb-4">Five Months</p>
              <p>Service:</p>
              <p>Brand World</p>
            </div>
            <p className="text-[16px] leading-tight">
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

          <div className="grid grid-cols-2 gap-5 mt-16 max-w-[60%]">
            <div>
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
            <div>
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

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-14 min-[1200px]:col-span-4 mb-16 min-[1200px]:mb-0">
          <p className="text-[16px] leading-tight">
            A visual identity where historical references, refined
            typography and contemporary art direction come together to
            create an elegant and timeless world.
          </p>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-19 min-[1200px]:col-span-6">
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
