"use client";
const categories = [
  { number: "01", label: "Brand Identity" },
  { number: "02", label: "Packaging" },
  { number: "03", label: "Web Design" },
  { number: "04", label: "Social Media" },
];
export function WorkFilters({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (label: string | null) => void;
}) {
  return (
    <div>
      <p className="text-[16px] min-[1200px]:text-[clamp(12px,0.8333vw,16px)] underline decoration-1 mb-6">Categories</p>
      <ul className="space-y-[10px]">
        {categories.map((c) => {
          const isSelected = selected === c.label;
          const isDimmed = selected !== null && !isSelected;
          return (
            <li key={c.number} className="flex items-baseline gap-4">
              <button
                type="button"
                onClick={() => onSelect(isSelected ? null : c.label)}
                className={`flex items-baseline gap-4 text-left ${isDimmed ? "text-muted" : "text-foreground"}`}
              >
                <span className="underline decoration-[1.5px] text-[24px]">({c.number}.)</span>
                <span className={`text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] ${isSelected ? "italic" : ""}`}>{c.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
