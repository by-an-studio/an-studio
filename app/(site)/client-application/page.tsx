"use client";

import { useState } from "react";
import { Grid } from "../../_components/Grid";

const projectTypes = ["Branding Design", "Packaging", "Web Design", "Social Media", "Other"];
const budgetOptions = ["Yes", "I have questions", "No"];

const services = [
  "Brand Strategy",
  "Brand Identity Design",
  "Art Direction",
  "Creative Direction",
  "Website Design",
  "Website Development",
  "E-Commerce Website Design",
  "E-Commerce Website Development",
  "Primary Packaging",
  "Secondary Packaging",
  "Printed Collateral",
  "Digital Collateral",
];

function Field({ label, required }: { label: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[15px] mb-4">
        {label} {required && "(required)"}
      </label>
      <input
        type="text"
        placeholder="Answer"
        className="w-full bg-transparent border-b border-foreground/30 pb-2 text-[16px] min-[1200px]:text-[14px] placeholder:italic placeholder:text-muted focus:outline-none focus:border-foreground"
      />
    </div>
  );
}

function PillGroup({
  options,
  selected,
  onSelect,
  fullWidth,
  mobileGrid,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  fullWidth?: boolean;
  mobileGrid?: boolean;
}) {
  return (
    <div
      className={`gap-2 ${mobileGrid ? "grid grid-cols-2 min-[1800px]:flex" : "flex"} ${
        !fullWidth ? "flex-nowrap overflow-x-auto" : ""
      }`}
    >
      {options.map((option) => {
        const isSelected = selected === option;
        const widthClass = fullWidth
          ? mobileGrid
            ? "min-[1800px]:flex-1 min-[1800px]:min-w-0 whitespace-nowrap"
            : "flex-1 min-w-0 whitespace-nowrap"
          : "whitespace-nowrap";
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`px-4 py-1 text-[12px] italic bg-[#EFECE6] text-center ${widthClass} ${
              isSelected ? "" : "opacity-40"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function ClientApplication() {
  const [projectType, setProjectType] = useState<string | null>(null);
  const [budgetReady, setBudgetReady] = useState<string | null>(null);
  const [commit, setCommit] = useState<string | null>(null);

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px]">
      <Grid className="items-start min-[1200px]:grid-rows-[100svh_auto]">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-6 min-[1200px]:row-start-1 min-[1200px]:self-stretch mb-4 min-[1200px]:mb-0 flex flex-col min-[1200px]:justify-center">
          <p className="text-[32px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">Work With Us</p>
          <p className="italic text-[24px] min-[1200px]:text-[clamp(18px,1.25vw,24px)]">Let&rsquo;s build something lasting</p>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-11 min-[1200px]:col-span-4 min-[1200px]:row-start-1 mb-16 min-[1200px]:mb-0 grid grid-cols-3 min-[1200px]:flex min-[1200px]:flex-col gap-4 min-[1200px]:h-[100svh] min-[1200px]:py-5">
          <div className="relative aspect-[4/5] min-[1200px]:aspect-auto min-[1200px]:flex-1 min-[1200px]:min-h-0 bg-muted/20" />
          <div className="relative aspect-[4/5] min-[1200px]:aspect-auto min-[1200px]:flex-1 min-[1200px]:min-h-0 bg-muted/20" />
          <div className="relative aspect-[4/5] min-[1200px]:aspect-auto min-[1200px]:flex-1 min-[1200px]:min-h-0 bg-muted/20" />
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-11 min-[1200px]:row-start-2 mt-4 min-[1200px]:mt-24 min-[1200px]:self-stretch min-[1200px]:min-h-[80svh] flex flex-col">
          <div className="min-[1200px]:flex-1 min-[1200px]:min-h-0">
            <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] leading-tight mb-8">
              Let&rsquo;s Create Something Thoughtful, Distinctive &amp; True
              To Your Vision, Built With Intention From The Very Beginning
            </p>

            <div className="grid grid-cols-2 gap-5 min-[1200px]:grid-cols-11">
              <div className="min-[1200px]:col-span-3">
                <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
                <div className="flex gap-2 text-[12px]">
                  <span>Img. 01</span>
                  <div>
                    <p>An Studio</p>
                    <div className="text-muted">
                      <p>Brand World</p>
                      <p>Lifestyle</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-[1200px]:col-span-3">
                <div className="relative aspect-[4/5] bg-muted/20 mb-4" />
                <div className="flex gap-2 text-[12px]">
                  <span>Img. 02</span>
                  <div>
                    <p>An Studio</p>
                    <div className="text-muted">
                      <p>Brand World</p>
                      <p>Lifestyle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 min-[1200px]:grid-cols-11 mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8 items-start">
            <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] min-[1200px]:col-span-4">
              List of Services
            </p>
            <ul className="text-[18px] mt-2 min-[1200px]:mt-0 min-[1200px]:col-start-5 min-[1200px]:col-span-7">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-17 min-[1200px]:col-span-8 min-[1200px]:row-start-1 min-[1200px]:row-span-2 min-[1200px]:self-stretch min-[1200px]:h-full mt-16 min-[1200px]:mt-0 min-[1200px]:pt-[120px] flex flex-col gap-16">
          <div>
            <p className="text-[18px] mb-8">Name</p>
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-[18px] -mb-4">Contact</p>
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2">
              <Field label="Email" required />
              <Field label="Phone number" required />
            </div>
            <Field label="What country are you based in?" required />
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-[18px] -mb-4">About The Project</p>
            <Field label="Company name" required />
            <Field label="Project brief" required />

            <div>
              <label className="block text-[15px] mb-4">
                What type of project are you looking to develop? (required)
              </label>
              <PillGroup options={projectTypes} selected={projectType} onSelect={setProjectType} fullWidth mobileGrid />
            </div>

            <Field label="Your job position" required />
            <Field label="Website" />
          </div>

          <div>
            <label className="block text-[15px] mb-1">
              What is your budget for this project? (required)
            </label>
            <p className="text-foreground text-[12px] mb-4">
              Our minimum project investment starts at 3.000€
            </p>
            <input
              type="text"
              placeholder="Answer"
              className="w-full bg-transparent border-b border-foreground/30 pb-2 text-[16px] min-[1200px]:text-[14px] placeholder:italic placeholder:text-muted focus:outline-none focus:border-foreground"
            />
          </div>

          <Field label="Website" />

          <div className="flex flex-col gap-8">
            <p className="text-[18px]">Working With Us</p>
            <div>
              <p className="text-[15px] leading-snug mb-4">
                An Studio&rsquo;s full branding and website projects
                typically range from 4,000€ to 14,000€+. Are you currently
                prepared to make this investment?
              </p>
              <PillGroup options={budgetOptions} selected={budgetReady} onSelect={setBudgetReady} fullWidth mobileGrid />
            </div>

            <div>
              <p className="text-[15px] leading-snug mb-4">
                I commit to responding to An Studio&rsquo;s emails, as each
                one is thoughtfully personalized. If I decide not to move
                forward, I will let the studio know in advance.
              </p>
              <PillGroup
              options={["Yes"]}
              selected={commit}
              onSelect={(value) => setCommit(commit === value ? null : value)}
              fullWidth
            />
            </div>
          </div>

          <div className="min-[1200px]:mt-auto">
            <p className="text-muted text-[12px] italic mb-4">
              * By clicking &ldquo;Let&rsquo;s Create Together&rdquo; I agree
              to receive emails from An Studio regarding the information I
              have requested.
            </p>
            <button
              type="button"
              className="w-full bg-[#2B2B2B] text-background py-1 text-[14px] min-[1200px]:text-[12px]"
            >
              Let&rsquo;s Create Together
            </button>
          </div>
        </div>
      </Grid>
    </main>
  );
}
