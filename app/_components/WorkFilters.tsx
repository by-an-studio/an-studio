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
        <p className="text-[10px] min-[1200px]:text-[clamp(9px,0.8333vw,13px)] underline decoration-[0.5px] min-[1200px]:decoration-1 mb-0 min-[1200px]:mb-6 text-center min-[1200px]:text-left">{categoriesLabel}</p>
      )}
      <ul className="mt-10 min-[1200px]:mt-0 space-y-[16px] min-[1200px]:-space-y-1">
        {categories.map((c, i) => {
          const isSelected = selected === c.value;
          const isDimmed = selected !== null && !isSelected;
          return (
            <li key={c.value} className="flex flex-col items-center text-center min-[1200px]:flex-row min-[1200px]:items-baseline min-[1200px]:text-left gap-1 min-[1200px]:gap-4">
              <h2>
              <button
                type="button"
                onClick={() => onSelect(isSelected ? null : c.value)}
                className={`flex flex-col items-center text-center min-[1200px]:flex-row min-[1200px]:items-baseline min-[1200px]:text-left gap-1 min-[1200px]:gap-4 text-left cursor-pointer transition-opacity duration-200 ${isDimmed ? "text-muted" : "text-foreground"} ${isSelected ? "" : "hover:opacity-40"}`}
              >
                <span className="underline decoration-[0.5px] min-[1200px]:decoration-[1.5px] text-[12px] min-[1200px]:text-[21px]">({String(i + 1).padStart(2, "0")}.)</span>
                <span className={`text-[17px] min-[1200px]:text-[clamp(21px,1.875vw,33px)] ${isSelected ? "italic" : ""}`}>{c.label}</span>
              </button>
              </h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
