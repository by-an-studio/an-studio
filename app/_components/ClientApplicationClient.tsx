"use client";
import { useState } from "react";
import { FadeImage } from "./FadeImage";
import { useTranslations } from "next-intl";
import { Grid } from "./Grid";
import { urlFor } from "../../sanity/lib/image";
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
  const src = isGif ? rawUrl : urlFor(image).width(1800).url();
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <FadeImage src={src} alt="" fill unoptimized={isGif} quality={90} sizes="(min-width: 1200px) 65vw, 100vw" className="object-cover" />
    </div>
  );
}
function Field({
  label,
  required,
  requiredLabel,
  name,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  required?: boolean;
  requiredLabel: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-[15px] mb-4">
        {label} {required && requiredLabel}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full bg-transparent border-b border-foreground/30 pb-2 text-[16px] min-[1200px]:text-[14px] placeholder:italic placeholder:text-muted focus:outline-none focus:border-foreground/30"
      />
    </div>
  );
}
type Option = { value: string; label: string };
function PillGroup({
  options,
  selected,
  onSelect,
  fullWidth,
  mobileGrid,
}: {
  options: Option[];
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
        const isSelected = selected === option.value;
        const widthClass = fullWidth
          ? mobileGrid
            ? "min-[1800px]:flex-1 min-[1800px]:min-w-0 whitespace-nowrap"
            : "flex-1 min-w-0 whitespace-nowrap"
          : "whitespace-nowrap";
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`px-4 py-1 text-[12px] italic bg-[#EFECE6] text-center cursor-pointer ${widthClass} ${
              isSelected ? "" : "opacity-40"
            }`}
          >
            {option.label}
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
  const t = useTranslations("clientApplication");
  const projectTypes: Option[] = [
    { value: "branding", label: t("projectTypes.branding") },
    { value: "packaging", label: t("projectTypes.packaging") },
    { value: "web", label: t("projectTypes.web") },
    { value: "social", label: t("projectTypes.social") },
    { value: "other", label: t("projectTypes.other") },
  ];
  const budgetOptions: Option[] = [
    { value: "yes", label: t("budgetOptions.yes") },
    { value: "questions", label: t("budgetOptions.questions") },
    { value: "no", label: t("budgetOptions.no") },
  ];
  const commitOptions: Option[] = [{ value: "yes", label: t("commitYes") }];
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
    if (commit !== "yes") {
      setErrorMessage(t("errorCommit"));
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
      setErrorMessage(t("errorRequired"));
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
      setErrorMessage(t("errorGeneric"));
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
        <div className="col-span-8 md:max-[1199px]:col-span-24 min-[1200px]:col-start-11 min-[1200px]:col-span-4 min-[1200px]:row-start-1 mb-16 min-[1200px]:mb-0 grid grid-cols-3 min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:items-center min-[1200px]:justify-center gap-4 min-[1200px]:h-[100svh] min-[1200px]:py-5">
          {heroImages.map((img, i) => (
            <SanityImg
              key={i}
              image={img}
              className="aspect-[3/4] shrink-0 min-[1200px]:flex-1 min-[1200px]:min-h-0 min-[1200px]:w-auto"
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
                      <div className="text-muted mt-[15px]">
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
            <p className="text-[18px] mb-8">{t("sections.name")}</p>
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2">
              <Field label={t("fields.firstName")} required requiredLabel={t("fields.required")} name="firstName" value={formData.firstName} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
              <Field label={t("fields.lastName")} required requiredLabel={t("fields.required")} name="lastName" value={formData.lastName} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[18px] -mb-4">{t("sections.contact")}</p>
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2">
              <Field label={t("fields.email")} required requiredLabel={t("fields.required")} name="email" value={formData.email} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
              <Field label={t("fields.phone")} required requiredLabel={t("fields.required")} name="phone" value={formData.phone} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
            </div>
            <Field label={t("fields.country")} required requiredLabel={t("fields.required")} name="country" value={formData.country} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[18px] -mb-4">{t("sections.aboutProject")}</p>
            <Field label={t("fields.companyName")} required requiredLabel={t("fields.required")} name="companyName" value={formData.companyName} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
            <Field label={t("fields.projectBrief")} required requiredLabel={t("fields.required")} name="projectBrief" value={formData.projectBrief} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
            <div>
              <label className="block text-[15px] mb-4">
                {t("fields.projectTypeLabel")} {t("fields.required")}
              </label>
              <PillGroup options={projectTypes} selected={projectType} onSelect={setProjectType} fullWidth mobileGrid />
            </div>
            <Field label={t("fields.jobPosition")} required requiredLabel={t("fields.required")} name="jobPosition" value={formData.jobPosition} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} />
            <Field label={t("fields.website")} name="website" value={formData.website} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} requiredLabel={t("fields.required")} />
          </div>
          <div>
            <label className="block text-[15px] mb-1">
              {t("fields.budgetLabel")} {t("fields.required")}
            </label>
            <p className="text-foreground text-[12px] mb-4">
              {t("fields.budgetHint")}
            </p>
            <input
              type="text"
              placeholder={t("fields.answerPlaceholder")}
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="w-full bg-transparent border-b border-foreground/30 pb-2 text-[16px] min-[1200px]:text-[14px] placeholder:italic placeholder:text-muted focus:outline-none focus:border-foreground/30"
            />
          </div>
          <Field label={t("fields.website")} name="website2" value={formData.website2} placeholder={t("fields.answerPlaceholder")} onChange={handleChange} requiredLabel={t("fields.required")} />
          <div className="flex flex-col gap-8">
            <p className="text-[18px]">{t("sections.workingWithUs")}</p>
            <div>
              <p className="text-[15px] leading-snug mb-4">
                {t("budgetReadyText")}
              </p>
              <PillGroup options={budgetOptions} selected={budgetReady} onSelect={setBudgetReady} fullWidth mobileGrid />
            </div>
            <div>
              <p className="text-[15px] leading-snug mb-4">
                {t("commitText")}
              </p>
              <PillGroup
                options={commitOptions}
                selected={commit}
                onSelect={(value) => setCommit(commit === value ? null : value)}
                fullWidth
              />
            </div>
          </div>
          <div className="min-[1200px]:mt-auto relative">
            <div className={status === "sent" ? "invisible" : ""}>
              <p className="text-muted text-[12px] italic mb-4">
                {t("disclaimer")}
              </p>
              <div className="relative">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#2B2B2B] text-background py-1 text-[14px] min-[1200px]:text-[12px] cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                  {status === "submitting" ? t("sending") : t("submitButton")}
                </button>
                {status === "error" && (
                  <p className="absolute left-0 top-full mt-2 text-[12px] text-red-600">{errorMessage}</p>
                )}
              </div>
            </div>
            {status === "sent" && (
              <p className="absolute inset-0 text-[14px] italic">{t("successMessage")}</p>
            )}
          </div>
        </form>
      </Grid>
    </main>
  );
}
