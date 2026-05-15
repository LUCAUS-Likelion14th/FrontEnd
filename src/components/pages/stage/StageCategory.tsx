"use client";

import { motion } from "framer-motion";

type CategoryType = "학생 공연" | "청룡가요제" | "아티스트 공연" | "무대기획전";

type CategoryProps = {
  categories: CategoryType[];
  selected: CategoryType;
  onSelect: (value: CategoryType) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function StageCategory({
  categories,
  selected,
  onSelect,
  selectedDate,
  onSelectDate,
}: CategoryProps) {
  return (
    <div>
      {/* 날짜 선택 탭 */}
      <section className="relative mb-3.5">
        <div className="flex pb-2">
          <button
            onClick={() => onSelectDate("2026-05-21")}
            className={`w-1/2 text-center ${
              selectedDate === "2026-05-21"
                ? "text-black font-semibold"
                : "text-text-sub"
            }`}
          >
            21일 목
          </button>

          <button
            onClick={() => onSelectDate("2026-05-22")}
            className={`w-1/2 text-center ${
              selectedDate === "2026-05-22"
                ? "text-black font-semibold"
                : "text-text-sub"
            }`}
          >
            22일 금
          </button>
        </div>

        {/* 회색 바 (비활성화 상태) */}
        <div className="absolute bottom-0 w-full h-0.5 bg-text-sub2" />

        {/* 파란색 바 (활성화 상태) */}
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
          style={{
            width: "50%",
            left: selectedDate === "2026-05-21" ? "0%" : "50%",
          }}
        />
      </section>

      {/* 공연 카테고리 선택 */}
      <section className="flex gap-2.5 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="relative px-3 py-2 rounded-md text-sm font-medium leading-4.5 shrink-0"
          >
            {selected === item && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-primary rounded-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 transition-colors ${
              selected === item ? "text-white" : "text-text-sub"
            }`}>
              {item}
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}
