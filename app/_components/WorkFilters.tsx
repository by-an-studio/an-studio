"use client";
type Category = { value: string; label: string };
export function WorkFilters({
  selected,
  onSelect,
  categoriesLabel,
  categories,
}: {
  selected: string | null;
  onSelect: (value: string | null) => void;
  categoriesLabel?: string;
  categories: Category[];
}) {
  return (
    <div>
      {categoriesLabel && (
        <p className="text-[16px] min-[1200px]:text-[clamp(12px,0.8333vw,16px)] underline decoration-1 mb-6">{categoriesLabel}</p>
      )}
      <ul className="space-y-[10px]">
        {categories.map((c, i) => {
          const isSelected = selected === c.value;
          const isDimmed = selected !== null && !isSelected;
          return (
            <li key={c.value} className="flex items-baseline gap-4">
              <button
                type="button"
                onClick={() => onSelect(isSelected ? null : c.value)}
                className={`flex items-baseline gap-4 text-left cursor-pointer ${isDimmed ? "text-muted" : "text-foreground"}`}
              >
                <span className="underline decoration-[1.5px] text-[24px]">({String(i + 1).padStart(2, "0")}.)</span>
                <span className={`text-[24px] min-[1200px]:text-[clamp(24px,1.875vw,36px)] ${isSelected ? "italic" : ""}`}>{c.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
