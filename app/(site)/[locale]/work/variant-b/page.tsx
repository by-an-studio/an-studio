import Link from "next/link";
import { Grid } from "../../../../_components/Grid";

const categories = ["Logotype", "Monogram", "Web Design", "Packaging"];

// Cambia esto para probar las 4 variantes de imagen de la derecha:
// "single"       -> 1 imagen estrecha (5 columnas)
// "double"       -> 2 imágenes (5 columnas cada una)
// "singleWide"   -> 1 imagen ancha, sin flechas (7 columnas, misma proporción que "gallery")
// "gallery"      -> galería con flechas (7 columnas)
const rightVariant: "single" | "double" | "singleWide" | "gallery" = "singleWide";

function BackNextArrow({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 16 10"
      fill="none"
      className={flipped ? "rotate-180" : ""}
    >
      <path
        d="M1 5H15M15 5L10 1M15 5L10 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GalleryArrow({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      width="25"
      height="7"
      viewBox="0 0 25 7"
      fill="none"
      className={flipped ? "rotate-180" : ""}
    >
      <path
        d="M1 3.5H24M24 3.5L20 0.7M24 3.5L20 6.3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectDetailVariantB() {
  return (
    <main className="w-full">
      <div className="relative min-[1200px]:min-h-[100svh] flex flex-col gap-16 min-[1200px]:gap-[50px]">
        <Grid>
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-21 pt-[150px] flex justify-between">
            <Link href="/work" className="flex items-center gap-3 text-[14px] uppercase">
              <BackNextArrow flipped />
              <span>Back</span>
            </Link>
            <Link href="/work" className="flex items-center gap-3 text-[14px] uppercase">
              <span>Next</span>
              <BackNextArrow />
            </Link>
          </div>
        </Grid>

        <Grid className="pb-[30px] min-[1200px]:flex-1 min-[1200px]:min-h-0 items-start min-[1200px]:items-center">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:[grid-column:4/15] min-[1400px]:[grid-column:4/14] min-[1600px]:[grid-column:4/13] min-[1800px]:[grid-column:4/12] min-[1200px]:self-stretch mb-8 min-[1200px]:mb-0 flex flex-col">
            <div>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px]">(015.)</p>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px]">Saie</p>
              <p className="underline decoration-2 underline-offset-4 text-[28px] min-[1200px]:text-[40px] mb-8">Social Media</p>

              <p className="italic text-[16px] min-[1200px]:text-[18px] mb-8">
                In Collaboration with{" "}
                <span className="underline decoration-1">Wave Hello Studio</span>
              </p>

              <p className="underline decoration-1 mb-4 text-[18px]">(About)</p>
              <p className="text-[18px] leading-tight mb-4">
                For Saie, we created a reel entirely by hand in collaboration
                with Wave Hello Studio. Each photograph was individually cut,
                scanned and assembled into a tactile stop-motion-style
                animation, allowing the final piece to retain the texture and
                irregularity of the physical process.
              </p>
              <p className="text-[18px] leading-tight mb-8">
                Rather than aiming for something overly polished, the
                direction embraced imperfection, rhythm and movement,
                creating a reel that feels editorial, playful and visually
                addictive while still remaining closely connected to
                Saie&rsquo;s visual world.
              </p>

              <p className="underline decoration-1 mb-4 text-[18px]">(Categories)</p>
              <div className="flex flex-wrap gap-4 min-[1200px]:gap-8 text-[12px] uppercase">
                {["Social Media", "Reel", "Analogic"].map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>

            <p className="text-[16px] min-[1200px]:text-[18px] leading-tight mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8">
              The reel was developed frame by frame through a manual process,
              combining hand-cut photography, scanning and digital assembly
              to create tactile movement. The imperfections of the process
              give the animation a raw, playful and distinctive visual
              character.
            </p>
          </div>

          {rightVariant === "single" && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col justify-end">
              <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9 min-[1200px]:items-end">
                <div className="relative min-[1200px]:col-span-4">
                  <div className="min-[1200px]:absolute min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px]">
                    <span>Video. 01</span>
                    <div>
                      <p>Saie</p>
                      <div className="text-muted">
                        <p>Reel</p>
                        <p>Stop Motion</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[9/16] bg-muted/20 min-[1200px]:col-span-5" />
              </div>
            </div>
          )}

          {rightVariant === "double" && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-14 min-[1200px]:col-span-11 min-[1200px]:self-stretch flex flex-col justify-end">
              <div className="grid grid-cols-1 min-[1200px]:grid-cols-11 gap-5 mb-8">
                <p className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7">
                  A tactile social piece where paper, texture and materiality
                  bring a more human feeling to the screen.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-11 min-[1200px]:items-end">
                <div className="relative min-[1200px]:col-span-1">
                  <div className="min-[1200px]:absolute min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px]">
                    <span>Video. 01</span>
                    <div>
                      <p>COPINI</p>
                      <div className="text-muted">
                        <p>Reel</p>
                        <p>Stationary</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[9/16] bg-muted/20 min-[1200px]:col-span-5" />
                <div className="relative aspect-[9/16] bg-muted/20 min-[1200px]:col-span-5" />
              </div>
            </div>
          )}

          {rightVariant === "gallery" && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
              <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
                <p className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-2 min-[1200px]:col-span-7">
                  Full social media management for Don Fisher, combining
                  content, newsletters, reels, community and influencer
                  relations.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9">
                <div className="relative min-[1200px]:col-span-1">
                  <div className="min-[1200px]:absolute min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px]">
                    <span>Img. 01</span>
                    <div>
                      <p>Don Fisher</p>
                      <div className="text-muted">
                        <p>Social Media</p>
                        <p>Content</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Previous"
                    className="hidden min-[1200px]:flex absolute left-0 top-1/2 -translate-y-1/2"
                  >
                    <GalleryArrow flipped />
                  </button>
                </div>

                <div className="min-[1200px]:col-span-7">
                  <div className="flex overflow-x-auto gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1200px]:overflow-visible">
                    <div className="shrink-0 w-[85vw] min-[1200px]:w-full relative aspect-[4/5] bg-muted/20 rounded-full" />
                  </div>
                </div>

                <div className="relative min-[1200px]:col-span-1">
                  <button
                    type="button"
                    aria-label="Next"
                    className="hidden min-[1200px]:flex absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <GalleryArrow />
                  </button>
                </div>
              </div>
            </div>
          )}

          {rightVariant === "singleWide" && (
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-9 min-[1200px]:self-stretch flex flex-col min-[1200px]:justify-end">
              <div className="grid grid-cols-1 min-[1200px]:grid-cols-9 gap-5 mb-8">
                <p className="text-[16px] min-[1200px]:text-[18px] leading-tight min-[1200px]:col-start-3 min-[1200px]:col-span-7">
                  Full social media management for Don Fisher, combining
                  content, newsletters, reels, community and influencer
                  relations.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-5 min-[1200px]:grid min-[1200px]:grid-cols-9">
                <div className="relative min-[1200px]:col-span-2">
                  <div className="min-[1200px]:absolute min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:w-max flex gap-2 text-[12px]">
                    <span>Img. 01</span>
                    <div>
                      <p>DRMTLGY</p>
                      <div className="text-muted">
                        <p>Social Media</p>
                        <p>Templates</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="min-[1200px]:col-start-3 min-[1200px]:col-span-7">
                  <div className="relative aspect-[4/5] w-full bg-muted/20" />
                </div>
              </div>
            </div>
          )}
        </Grid>
      </div>
    </main>
  );
}
