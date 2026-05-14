"use client";

import { useState } from "react";
import { FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BOOTH_DATES } from "@/data/boothData";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function DateFilter({ selectedDate, onSelectDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    BOOTH_DATES.find((d) => d.value === selectedDate)?.label ?? "";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 h-9 rounded-[6px] bg-primary text-white"
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
            className="absolute top-11 left-0 z-20 bg-white rounded-[6px] shadow-lg overflow-hidden min-w-[110px]"
          >
            {BOOTH_DATES.map((d) => {
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
