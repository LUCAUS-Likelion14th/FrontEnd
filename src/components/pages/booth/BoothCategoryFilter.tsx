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
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {BOOTH_CATEGORIES.map((cat, idx) => {
        const isActive = !isStampActive && selectedCategory === cat;
        return (
          <Fragment key={cat}>
            <button
              onClick={() => onSelectCategory(cat)}
              className={`flex shrink-0 items-center justify-center w-[68px] h-9 rounded-[43px] text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-[#EEF3FB] text-primary"
              }`}
            >
              {cat}
            </button>
            {idx === 0 && showStamp && (
              <button
                onClick={isStampActive ? undefined : onStampClick}
                className={`flex shrink-0 items-center justify-center w-[68px] h-9 rounded-[43px] text-sm font-medium transition-colors ${
                  isStampActive
                    ? "bg-primary text-white cursor-default"
                    : "bg-[#EEF3FB] text-primary"
                }`}
              >
                도장판
              </button>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
