"use client";

import { Fragment } from "react";

import { BOOTH_CATEGORIES, BoothCategory } from "@/data/boothData";

type Props = {
  selectedCategory: BoothCategory;
  onSelectCategory: (category: BoothCategory) => void;
  showStamp?: boolean;
  onStampClick?: () => void;
  isStampActive?: boolean;
};

export default function BoothCategoryFilter({
  selectedCategory,
  onSelectCategory,
  showStamp = false,
  onStampClick,
  isStampActive = false,
}: Props) {
  return (
    <div className="inline-flex items-center gap-2 px-4">
      {BOOTH_CATEGORIES.map((cat) => {
        const isActive = !isStampActive && selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`flex shrink-0 items-center justify-center w-[68px] h-9 rounded-[43px] text-sm font-medium transition-all active:scale-95 ${
              isActive
                ? "bg-primary text-white active:opacity-80"
                : "bg-primary-light text-text-sub"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
