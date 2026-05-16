"use client";

import { useState } from "react";
import { FiCalendar, FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";
import { BOOTH_DATES } from "@/data/boothData";
import { motion, AnimatePresence } from "framer-motion";

const ALL_OPTION = { value: "all", label: "전체날짜" } as const;

type Props = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  showAll?: boolean;
};

export default function DateFilter({ selectedDate, onSelectDate, showAll = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const allDates = showAll ? [ALL_OPTION, ...BOOTH_DATES] : BOOTH_DATES;
  const currentLabel = allDates.find((d) => d.value === selectedDate)?.label ?? "";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 h-9 rounded-[20px] transition-colors ${
          selectedDate === "all"
            ? "bg-[#EEF3FB] text-[#8d97a7]"
            : "bg-primary text-white"
        }`}
      >
        <FiCalendar size={15} />
        <span className="text-sm font-medium">{currentLabel}</span>
        {isOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-1 left-0 z-20 bg-white rounded-xl shadow-lg overflow-hidden min-w-[110px]"
          >
            {allDates.map((d) => {
              const isSelected = selectedDate === d.value;
              return (
                <li key={d.value}>
                  <button
                    onClick={() => {
                      onSelectDate(d.value);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full px-3.5 h-10 text-sm whitespace-nowrap transition-colors ${
                      isSelected
                        ? "text-primary font-semibold bg-[#EEF3FB]"
                        : "text-[#3B4A5A] hover:bg-gray-50"
                    }`}
                  >
                    <FiCalendar size={15} className="shrink-0" />
                    <span>{d.label}</span>
                    {isSelected && <FiCheck size={13} className="shrink-0 ml-1" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
