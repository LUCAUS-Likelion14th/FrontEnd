"use client";

import { Fragment } from "react";

import { BOOTH_CATEGORIES, BoothCategory } from "@/data/boothData";

type Props = {
  selectedCategory: BoothCategory;
  onSelectCategory: (category: BoothCategory) => void;
  showStamp?: boolean;
};

export default function BoothCategoryFilter({
  selectedCategory,
  onSelectCategory,
  showStamp = false,
}: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {BOOTH_CATEGORIES.map((cat, idx) => {
        const isActive = selectedCategory === cat;
        return (
          <Fragment key={cat}>
            <button
              onClick={() => onSelectCategory(cat)}
              className={`flex shrink-0 items-center justify-center w-[68px] h-9 rounded-[43px] border text-base transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "border-text-sub text-text-sub"
              }`}
            >
              {cat}
            </button>
            {idx === 0 && showStamp && (
              <button className="flex shrink-0 items-center justify-center gap-1 px-3 h-9 rounded-[43px] bg-amber-400 text-white text-base font-semibold shadow-[0_6px_0_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.15)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[3px] transition-all duration-100">
                🎯 도장판
              </button>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
