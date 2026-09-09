"use client";
import { useState } from "react";
import Image from "next/image";
import { Grid } from "./Grid";
import { urlFor } from "../../sanity/lib/image";

const projectTypes = ["Branding Design", "Packaging", "Web Design", "Social Media", "Other"];
const budgetOptions = ["Yes", "I have questions", "No"];

type CaptionedImage = {
  image?: any;
  imageIndex?: string;
  caption?: string;
  tags?: string[];
};

type ClientApplicationData = {
  heroTitle?: string;
  heroTagline?: string;
  heroImages?: any[];
  headline?: string;
  featuredImages?: CaptionedImage[];
  servicesTitle?: string;
  servicesList?: string[];
};

function SanityImg({ image, className }: { image?: any; className?: string }) {
  if (!image) return null;
  const rawUrl = urlFor(image).url();
  const isGif = rawUrl.split("?")[0].toLowerCase().endsWith(".gif");
  const src = isGif ? rawUrl : urlFor(image).width(800).url();
  return (
    <div className={`relative bg-muted/20 overflow-hidden ${className ?? ""}`}>
      <Image src={src} alt="" fill unoptimized={isGif} quality={80} className="object-cover" />
    </div>
  );
}

function Field({
  label,
  required,
  name,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-[15px] mb-4">
        {label} {required && "(required)"}
      </label>
      <input
        type="text"
        placeholder="Answer"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
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

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  companyName: "",
  projectBrief: "",
  jobPosition: "",
  website: "",
  website2: "",
  budget: "",
};

export function ClientApplicationClient({ data }: { data: ClientApplicationData | null }) {
  const [formData, setFormData] = useState(initialFormData);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [budgetReady, setBudgetReady] = useState<string | null>(null);
  const [commit, setCommit] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [company, setCompany] = useState("");

  const heroImages = data?.heroImages ?? [];
  const featuredImages = data?.featuredImages ?? [];

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (commit !== "Yes") {
      setErrorMessage('Please confirm "Yes" on the commitment question above before submitting.');
      setStatus("error");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.country ||
      !formData.companyName ||
      !formData.projectBrief ||
      !projectType ||
      !formData.jobPosition ||
      !formData.budget ||
      !budgetReady
    ) {
      setErrorMessage("Please fill in all required fields before submitting.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/client-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, projectType, budgetReady, commit, company }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setErrorMessage("Something went wrong, please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="w-full pt-[150px] min-[1200px]:pt-0 pb-[30px]">
      <Grid className="items-start min-[1200px]:grid-rows-[100svh_auto]">
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-6 min-[1200px]:row-start-1 min-[1200px]:self-stretch mb-4 min-[1200px]:mb-0 flex flex-col min-[1200px]:justify-center">
          {data?.heroTitle && <p className="text-[32px] min-[1200px]:text-[clamp(24px,1.875vw,36px)]">{data.heroTitle}</p>}
          {data?.heroTagline && (
            <p className="italic text-[24px] min-[1200px]:text-[clamp(18px,1.25vw,24px)]">{data.heroTagline}</p>
          )}
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-11 min-[1200px]:col-span-4 min-[1200px]:row-start-1 mb-16 min-[1200px]:mb-0 grid grid-cols-3 min-[1200px]:flex min-[1200px]:flex-col gap-4 min-[1200px]:h-[100svh] min-[1200px]:py-5">
          {heroImages.map((img, i) => (
            <SanityImg
              key={i}
              image={img}
              className="aspect-[4/5] min-[1200px]:aspect-auto min-[1200px]:flex-1 min-[1200px]:min-h-0"
            />
          ))}
        </div>
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-4 min-[1200px]:col-span-11 min-[1200px]:row-start-2 mt-4 min-[1200px]:mt-24 min-[1200px]:self-stretch min-[1200px]:min-h-[80svh] flex flex-col">
          <div className="min-[1200px]:flex-1 min-[1200px]:min-h-0">
            {data?.headline && (
              <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] leading-tight mb-8">{data.headline}</p>
            )}
            <div className="grid grid-cols-2 gap-5 min-[1200px]:grid-cols-11">
              {featuredImages.map((item, i) => (
                <div key={i} className="min-[1200px]:col-span-3">
                  <SanityImg image={item.image} className="aspect-[4/5] mb-4" />
                  <div className="flex gap-2 text-[12px]">
                    {item.imageIndex && <span>Img. {item.imageIndex}</span>}
                    <div>
                      {item.caption && <p>{item.caption}</p>}
                      <div className="text-muted">
                        {item.tags?.map((tag, j) => <p key={j}>{tag}</p>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[1200px]:grid-cols-11 mt-16 min-[1200px]:mt-auto min-[1200px]:pt-8 items-start">
            {data?.servicesTitle && (
              <p className="text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] min-[1200px]:col-span-4">
                {data.servicesTitle}
              </p>
            )}
            <ul className="text-[18px] mt-2 min-[1200px]:mt-0 min-[1200px]:col-start-5 min-[1200px]:col-span-7">
              {data?.servicesList?.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-17 min-[1200px]:col-span-8 min-[1200px]:row-start-1 min-[1200px]:row-span-2 min-[1200px]:self-stretch min-[1200px]:h-full mt-16 min-[1200px]:mt-0 min-[1200px]:pt-[120px] flex flex-col gap-16"
        >
          <input
            type="text"
            name="company_website"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute w-0 h-0 opacity-0 -z-10"
          />
          <div>
            <p className="text-[18px] mb-8">Name</p>
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2">
              <Field label="First name" required name="firstName" value={formData.firstName} onChange={handleChange} />
              <Field label="Last name" required name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[18px] -mb-4">Contact</p>
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2">
              <Field label="Email" required name="email" value={formData.email} onChange={handleChange} />
              <Field label="Phone number" required name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <Field label="What country are you based in?" required name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[18px] -mb-4">About The Project</p>
            <Field label="Company name" required name="companyName" value={formData.companyName} onChange={handleChange} />
            <Field label="Project brief" required name="projectBrief" value={formData.projectBrief} onChange={handleChange} />
            <div>
              <label className="block text-[15px] mb-4">
                What type of project are you looking to develop? (required)
              </label>
              <PillGroup options={projectTypes} selected={projectType} onSelect={setProjectType} fullWidth mobileGrid />
            </div>
            <Field label="Your job position" required name="jobPosition" value={formData.jobPosition} onChange={handleChange} />
            <Field label="Website" name="website" value={formData.website} onChange={handleChange} />
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
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="w-full bg-transparent border-b border-foreground/30 pb-2 text-[16px] min-[1200px]:text-[14px] placeholder:italic placeholder:text-muted focus:outline-none focus:border-foreground"
            />
          </div>
          <Field label="Website" name="website2" value={formData.website2} onChange={handleChange} />
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
            {status === "sent" ? (
              <p className="text-[14px] italic">Thank you! Your application has been sent — we&rsquo;ll be in touch soon.</p>
            ) : (
              <>
                <p className="text-muted text-[12px] italic mb-4">
                  * By clicking &ldquo;Let&rsquo;s Create Together&rdquo; I agree
                  to receive emails from An Studio regarding the information I
                  have requested.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#2B2B2B] text-background py-1 text-[14px] min-[1200px]:text-[12px] disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Let\u2019s Create Together"}
                </button>
                {status === "error" && (
                  <p className="text-[12px] mt-2 text-red-600">{errorMessage}</p>
                )}
              </>
            )}
          </div>
        </form>
      </Grid>
    </main>
  );
}
