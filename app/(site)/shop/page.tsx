import { Grid } from "../../_components/Grid";

const galleryImages = Array.from({ length: 9 }, (_, i) => i);

export default function Shop() {
  return (
    <main className="w-full pt-24 min-[1200px]:pt-0 pb-[30px] flex flex-col justify-between min-h-[100svh]">
      <div className="relative mt-16 min-[1200px]:mt-0 min-[1200px]:h-[100svh]">
        <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-6 mb-16 min-[1200px]:mb-0 grid grid-cols-1 min-[1200px]:grid-cols-6">
            <p className="text-[32px] min-[1200px]:text-[36px] min-[1200px]:col-span-6">Shop</p>
            <p className="italic text-[24px] leading-tight min-[1200px]:col-span-4">
              Curated tools for thoughtful
              <br />
              brand building.
            </p>
          </div>

          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-13 min-[1200px]:self-end pb-[30px] grid grid-cols-2 gap-5 min-[1200px]:grid-cols-13">
            <div className="col-span-2 md:max-[1199px]:col-span-2 min-[1200px]:col-span-4 mb-16 min-[1200px]:mb-0 flex flex-col gap-16 min-[1200px]:gap-0 min-[1200px]:justify-between">
              <div>
                <p className="italic text-[16px] min-[1200px]:text-[18px] mb-2">
                  For <em>Social Media</em>
                </p>
                <p className="text-[28px] min-[1200px]:text-[40px] underline decoration-2 underline-offset-4">The Dossier</p>
                <p className="text-[20px] min-[1200px]:text-[26px]">Social Media Templates</p>
              </div>

              <div className="flex flex-col gap-8">
                <p className="italic text-[16px] min-[1200px]:text-[18px]">Coming Soon!</p>

                <div>
                  <p className="text-[16px] min-[1200px]:text-[18px]">PRICE:</p>
                  <p className="italic text-[16px] min-[1200px]:text-[18px]">20€</p>
                </div>

                <div>
                  <p className="text-[16px] min-[1200px]:text-[18px]">FORMAT:</p>
                  <p className="text-[16px] min-[1200px]:text-[18px]">Canva</p>
                </div>

                <p className="text-[16px] min-[1200px]:text-[18px] leading-snug">
                  The Dossier is a curated collection of editable Canva
                  templates designed to give your social media a cohesive,
                  refined and editorial visual language.
                </p>
              </div>
            </div>

            <div className="col-span-2 md:max-[1199px]:col-span-2 min-[1200px]:col-start-6 min-[1200px]:col-span-8">
              <div className="grid grid-cols-2 min-[1200px]:grid-cols-3 gap-[10px]">
                {galleryImages.map((i) => (
                  <div
                    key={i}
                    className={`relative aspect-[3/4] bg-muted/20 ${
                      i === galleryImages.length - 1
                        ? "col-span-2 w-1/2 mx-auto min-[1200px]:col-span-1 min-[1200px]:w-full min-[1200px]:mx-0"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </main>
  );
}
