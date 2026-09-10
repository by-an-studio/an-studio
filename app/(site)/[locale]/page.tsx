import { HeroVisual } from "../../_components/HeroVisual";
import { ZoomWrapper } from "../../_components/ZoomWrapper";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      {/* Bloque 1 home */}
      <section className="min-h-[110svh] md:min-h-[100svh] w-full flex flex-col items-center justify-center gap-10 px-5 overflow-hidden">
        <div className="text-center text-[clamp(12px,0.9375vw,18px)] md:fixed md:top-6 md:inset-x-0 md:z-30">
          Independent Design Studio
        </div>

        <ZoomWrapper className="relative flex flex-col items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <HeroVisual />
          </div>

          <div className="relative z-10 text-center text-[60px] leading-tight">
            <p>Where Fashion Meets Graphic Design</p>
            <p>Building Identities With A Distinct Point Of View</p>
            <p className="italic">For Brands Made To Last</p>
          </div>

          <div className="h-[280px]" />

          <div className="relative z-10 text-center text-[60px] leading-tight">
            <p>Aware Of The Now, Designed Beyond It</p>
            <p>Thoughtful Identities & Digital Experiences</p>
            <p className="italic">Created With Intention, Made To Last</p>
          </div>
        </ZoomWrapper>
      </section>

      {/* Bloque 2 home */}
      <section className="w-full min-h-[50svh] md:min-h-0 md:fixed md:bottom-0 md:inset-x-0 z-20 py-[30px] px-5 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-5 text-center text-[16px]">
          <div className="md:flex-1 md:text-left">Available Worldwide</div>
          <div className="md:flex-[2] text-[18px]">
            A creative studio specialising in branding, packaging and product
            design.
          </div>
          <div className="md:flex-1 flex justify-center md:justify-end">
            <button className="bg-muted/20 px-4 py-2 text-sm">
              NEWSLETTER
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
