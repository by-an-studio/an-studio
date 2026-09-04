"use client";

import { useState } from "react";
import { Grid } from "../../_components/Grid";

const services = [
  {
    number: "01",
    label: "Brand Identity",
    paragraphs: [
      "Branding is where strategy and visual identity come together. We define what makes a brand distinctive, then translate it into a clear and cohesive visual language built to communicate with intention.",
      "From creative direction to logo, typography, color and brand guidelines, every element is thoughtfully developed to create an identity that feels relevant, recognizable and made to last.",
    ],
    timeline: "Estimated Timeline Without Revisions Included: Eight Weeks.",
    project: { index: "09", name: "L'Object", tags: ["Brand Identity", "Product Design"] },
  },
  {
    number: "02",
    label: "Packaging Design",
    paragraphs: [
      "Packaging is where brand, form and function come together. We develop thoughtful packaging systems that create recognition, communicate positioning, and turn every interaction with the product into a considered brand experience.",
      "From primary packaging to secondary structures, each concept is developed through research, material and form exploration, and refined design to create solutions that feel distinctive, functional and visually considered.",
    ],
    timeline: "Estimated Timeline Without Revisions Included: Seven Weeks.",
    project: { index: "02", name: "L'Object", tags: ["Brand Identity", "Product Design"] },
  },
  {
    number: "03",
    label: "Web Design",
    paragraphs: [
      "A website should feel like a natural extension of the brand. We design digital experiences that bring identity, content and functionality together through clear structure, considered interaction and a strong visual point of view.",
      "From creative direction and layout to responsive adaptation and development, each site is carefully built to communicate with clarity, feel intuitive to navigate and create a cohesive experience across every screen.",
    ],
    timeline: "Estimated Timeline Without Revisions Included: Nine Weeks.",
    project: { index: "05", name: "SB Joaillerie", tags: ["Brand World", "Web Design"] },
  },
  {
    number: "04",
    label: "Social Media Retainer",
    paragraphs: [
      "A strong social presence goes beyond individual posts. We create cohesive digital systems that bring together visual direction, content and communication, ensuring every touchpoint feels consistent with the brand.",
      "Through content planning, design, newsletters, community management and selected collaborations, the retainer supports a considered presence, stronger recognition and long-term growth.",
    ],
    timeline: "Estimated Timeline Without Revisions Included: Ongoing Monthly Collaboration.",
    project: { index: "05", name: "Don Fisher", tags: ["Social Media", "Content"] },
  },
  {
    number: "05",
    label: "Creative Direction",
    paragraphs: [
      "Creative direction gives your project a clear visual point of view. We define the overall creative language, shaping how the brand is expressed across imagery, styling, composition and visual communication.",
      "From campaigns and photoshoots to launches and digital content, we guide the creative process from concept to execution, ensuring every element feels cohesive, intentional and aligned with the brand.",
    ],
    timeline: "Estimated Timeline Without Revisions Included: Ongoing Monthly Collaboration.",
    project: { index: "01", name: "SB Joaillerie", tags: ["Brand World", "Web Design"] },
  },
];

export default function Services() {
  const [selected, setSelected] = useState(0);
  const active = services[selected];

  return (
    <main className="w-full pt-24 min-[1200px]:pt-0 pb-[30px] flex flex-col justify-between min-h-[100svh]">
      <Grid className="pt-5 min-h-[70px] min-[1200px]:min-h-0">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-8">
          <p className="underline decoration-1">Our Services:</p>
          <p className="italic text-[20px]">Let&rsquo;s Create Together</p>
        </div>
      </Grid>

      <Grid className="mt-16 min-[1200px]:mt-0 items-start min-[1200px]:items-center">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-7 mb-16 min-[1200px]:mb-0">
          <ul className="space-y-1">
            {services.map((s, i) => {
              const isSelected = selected === i;
              const isDimmed = !isSelected;
              return (
                <li key={s.number}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`flex items-baseline gap-4 text-left ${isDimmed ? "text-muted" : "text-foreground"}`}
                  >
                    <span className="underline decoration-1 text-[16px] min-[1200px]:text-[clamp(12px,0.8333vw,16px)]">
                      ({s.number}.)
                    </span>
                    <span className={`text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] ${isSelected ? "italic" : ""}`}>
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex items-baseline gap-4 mt-16">
            <span className="invisible underline decoration-1 text-[16px] min-[1200px]:text-[clamp(12px,0.8333vw,16px)]">
              (00.)
            </span>
            <a href="/client-application" className="underline decoration-1 text-[18px]">
              Start Your Project Now &rarr;
            </a>
          </div>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-6">
          {active.paragraphs.map((p, i) => (
            <p key={i} className="text-[16px] leading-tight mb-4">{p}</p>
          ))}
          <p className="text-muted text-[12px] mt-8">{active.timeline}</p>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-20 min-[1200px]:col-span-5">
          <div className="relative aspect-[3/4] bg-muted/20" />
          <div className="mt-4 flex gap-2 text-[12px]">
            <span>Img. {active.project.index}</span>
            <div>
              <p>{active.project.name}</p>
              <div className="text-muted">
                {active.project.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Grid>

      <Grid className="mt-16 min-[1200px]:mt-0 min-[1200px]:flex-nowrap">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-4">
          <p className="text-[18px] underline decoration-1 mb-2">Other Services:</p>
          <ul className="text-[12px]">
            <li>Art Direction</li><li>Editorial Design</li><li>Mix Media</li>
          </ul>
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-12 min-[1200px]:col-span-4">
          <p className="text-[18px] underline decoration-1 mb-2">Industry</p>
          <ul className="text-[12px]">
            <li>Fashion, Crafts, Beauty, Skincare</li><li>Health, Wellness, Restaurants</li><li>Interior Design, Lifestyle, Events</li>
          </ul>
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-16 min-[1200px]:col-span-6">
          <p className="text-[18px] underline decoration-1 mb-2">Contact</p>
          <ul className="text-[12px]">
            <li>For General Messages: an@byanstudio.com</li><li>Booking Open For: September 2026</li>
          </ul>
        </div>
      </Grid>
    </main>
  );
}
