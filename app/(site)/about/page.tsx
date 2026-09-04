import { Fragment } from "react";
import { Grid } from "../../_components/Grid";

const clientRows = [
  ["Ace Beauté", "Escorpion Knitwear", "Lo Siento Studio"],
  ["", "Agosto Studio", "Caramba Agency"],
  ["", "", "Wave Hello Studio"],
  ["", "", "Don Fisher"],
];

export default function About() {
  return (
    <>
      <main className="w-full pt-24 min-[1200px]:pt-[clamp(18px,1.5625vw,30px)] min-[1200px]:pb-[clamp(18px,1.5625vw,30px)] pb-[30px] flex flex-col justify-between min-h-[100svh]">
        <div className="relative mt-16 min-[1200px]:mt-0 min-[1200px]:h-[calc(100svh-2*clamp(18px,1.5625vw,30px))]">
          <Grid className="min-[1200px]:h-full min-[1200px]:grid-rows-1 items-start min-[1200px]:items-center">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-3 mb-8 min-[1200px]:mb-0">
              <p className="text-[32px] min-[1200px]:text-[clamp(24px,2.1vw,40px)]">The Owner</p>
            </div>

            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-7 min-[1200px]:col-span-11 mb-8 min-[1200px]:mb-0 min-[1200px]:h-full">
              <div className="relative aspect-[4/5] min-[1200px]:aspect-auto min-[1200px]:h-full bg-muted/20" />
            </div>

            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-19 min-[1200px]:col-span-6">
              <p className="underline decoration-1 mb-6">(An Zamora)</p>
              <p className="text-[16px] leading-tight mb-4">
                An is the founder and Creative Director of An Studio. Born in
                Venezuela and raised in Spain from a young age, she grew up
                with a natural fascination for art, fashion and culture,
                interests that eventually led her to discover graphic design
                and fall in love with it.
              </p>
              <p className="text-[16px] leading-tight mb-8">
                Her work is guided by curiosity, instinct and a strong
                visual sensibility. She finds inspiration in fashion,
                photography, art and everyday details, bringing these
                references together to create work that feels considered,
                distinctive and true to her own point of view.
              </p>
              <p className="text-muted text-[12px] mb-4">IMG. 01</p>
              <p className="text-[12px]">An</p>
              <p className="text-muted text-[12px]">Founder &amp; Creative Director</p>
            </div>
          </Grid>
        </div>
      </main>

      <section className="w-full pt-24 min-[1200px]:pt-[clamp(18px,1.5625vw,30px)] min-[1200px]:pb-[clamp(18px,1.5625vw,30px)] pb-[30px] flex flex-col min-[1200px]:gap-[30px] min-h-[100svh]">
        <Grid className="items-start">
          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-14">
            <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] leading-snug">
              An Studio is an independent creative practice founded by{" "}
              <em className="italic">An Zamora</em>, focused on thoughtful
              branding, packaging and design.
            </p>
          </div>

          <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-18 min-[1200px]:col-span-3 mt-2 min-[1200px]:mt-0">
            <p className="text-[12px] leading-snug">
              Where Fashion, Graphic Design &amp; Visual Culture Shape A
              Distinct Point Of View
            </p>
          </div>
        </Grid>

        <Grid className="mt-16 min-[1200px]:mt-0">
          <div className="col-span-8 md:max-[1199px]:col-span-8 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
            <div className="relative aspect-[3/4] bg-muted/20" />
          </div>
        </Grid>

        <div className="mt-16 min-[1200px]:mt-0 min-[1200px]:mt-auto flex flex-col min-[1200px]:gap-[50px]">
          <Grid className="items-baseline">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
              <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">Awards</p>
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0">
              <ul className="space-y-1">
                <li className="flex gap-3 text-[16px] min-[1200px]:text-[18px] w-full">
                  <span className="text-[10px] mt-1 shrink-0">1</span>
                  <span className="flex-1">LAUS ORO, Graphic Design, 2023</span>
                </li>
                <li className="flex gap-3 text-[16px] min-[1200px]:text-[18px] w-full">
                  <span className="text-[10px] mt-1 shrink-0">2</span>
                  <span className="flex-1">Two Laus Bronze Awards, Graphic Design Collaboration, 2024</span>
                </li>
              </ul>
            </div>
          </Grid>

          <Grid className="mt-16 min-[1200px]:mt-0 items-baseline">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
              <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">Exhibitions</p>
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0">
              <ul className="space-y-1">
                <li className="flex gap-3 text-[16px] min-[1200px]:text-[18px] w-full">
                  <span className="text-[10px] mt-1 shrink-0">1</span>
                  <span className="flex-1">Latent Fest, LAUS Estudiante, 2023</span>
                </li>
                <li className="flex gap-3 text-[16px] min-[1200px]:text-[18px] w-full">
                  <span className="text-[10px] mt-1 shrink-0">2</span>
                  <span className="flex-1">Museu Del Disseny De Barcelona, El Mejor Diseño Del Año, 2023</span>
                </li>
              </ul>
            </div>
          </Grid>

          <Grid className="mt-16 min-[1200px]:mt-0 items-start">
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
              <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] leading-tight">
                Clients We&rsquo;ve Worked With
              </p>
            </div>
            <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-13 min-[1200px]:col-span-11 mt-2 min-[1200px]:mt-0">
              <div className="overflow-x-auto min-[1200px]:overflow-visible">
                <div className="grid grid-cols-3 gap-x-0 text-[14px] min-w-[500px] min-[1200px]:min-w-0">
                  <p className="text-[16px] min-[1200px]:text-[18px] whitespace-nowrap">Beauty</p>
                  <p className="text-[16px] min-[1200px]:text-[18px] whitespace-nowrap">Fashion</p>
                  <p className="text-[16px] min-[1200px]:text-[18px] whitespace-nowrap">Lifestyle &amp; Design</p>
                  <div className="col-span-3 border-t border-black mt-4" />
                  {clientRows.map((row, i) => (
                    <Fragment key={i}>
                      {row.map((cell, j) => (
                        <p key={`${i}-${j}`} className="border-b border-black py-1 whitespace-nowrap">
                          {cell}
                        </p>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </section>
    </>
  );
}
