"use client";

import { BOOTH_CATEGORIES, BoothCategory } from "@/data/boothData";

type Props = {
  selectedCategory: BoothCategory;
  onSelectCategory: (category: BoothCategory) => void;
};

export default function BoothCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {BOOTH_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`flex shrink-0 items-center justify-center w-[68px] h-9 rounded-[43px] border text-base transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "border-text-sub text-text-sub"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
