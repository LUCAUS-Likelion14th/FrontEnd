"use client";

import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { BOOTH_DATES } from "@/data/boothData";

type Props = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function DateFilter({ selectedDate, onSelectDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    BOOTH_DATES.find((d) => d.value === selectedDate)?.label ?? "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3.5 px-2.5 h-10 rounded-[6px] border border-primary"
      >
        <FiCalendar size={18} className="text-primary" />
        <div className="flex gap-3 items-center">
          <span className="text-base">{currentLabel}</span>
          <FiChevronDown size={18} className="text-primary" />
        </div>
      </button>

      {isOpen && (
        <ul className="absolute top-12 left-0 z-20 bg-white border border-text-sub rounded-[6px] shadow-md overflow-hidden">
          {BOOTH_DATES.map((d) => {
            const isAllDate = d.value === "all"; // 전체날짜 여부 확인

            return (
              <li
                key={d.value}
                className="border-b border-b-text-sub last:border-none"
              >
                <button
                  onClick={() => {
                    onSelectDate(d.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full text-left px-2.5 h-10 text-base whitespace-nowrap hover:bg-gray-50 ${
                    selectedDate === d.value ? "bg-text-sub2" : ""
                  }`}
                >
                  <FiCalendar size={18} className="text-text-sub shrink-0" />

                  {/* 전체날짜일 때만 px-15(3.75rem), 아니면 기존 px-5 적용 */}
                  <span className={`${isAllDate ? "px-[15px]" : "px-5"}`}>
                    {d.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
