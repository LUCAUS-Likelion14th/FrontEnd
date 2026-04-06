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
        className="flex items-center gap-1 px-2.5 h-10 bg-[#DADADA] rounded-[6px]"
      >
        <FiCalendar size={18} />
        <span className="text-base">{currentLabel}</span>
        <FiChevronDown size={18} />
      </button>

      {isOpen && (
        <ul className="absolute top-12 left-0 z-20 bg-white border border-[#DCE2E9] rounded-[6px] shadow-md overflow-hidden">
          {BOOTH_DATES.map((d) => (
            <li key={d.value}>
              <button
                onClick={() => {
                  onSelectDate(d.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-base whitespace-nowrap hover:bg-gray-50 ${
                  selectedDate === d.value ? "text-primary font-semibold" : ""
                }`}
              >
                {d.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
