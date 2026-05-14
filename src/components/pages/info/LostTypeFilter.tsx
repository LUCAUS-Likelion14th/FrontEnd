"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiCheck, FiList } from "react-icons/fi";
import { LOST_ITEM_TYPES } from "@/data/lostItemData";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedType: string;
  onSelectType: (type: string) => void;
};

export default function LostTypeFilter({ selectedType, onSelectType }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    LOST_ITEM_TYPES.find((t) => t.value === selectedType)?.label ?? "";

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
        className="flex items-center gap-2 px-3 h-9 rounded-full bg-[#EEF3FB] text-[#8D97A7]"
      >
        <FiList size={15} />
        <span className="text-sm font-medium">{currentLabel}</span>
        {isOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-11 left-0 z-20 bg-white rounded-[12px] shadow-lg overflow-hidden min-w-[110px]"
          >
            {LOST_ITEM_TYPES.map((t) => {
              const isSelected = selectedType === t.value;
              return (
                <li key={t.value}>
                  <button
                    onClick={() => {
                      onSelectType(t.value);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3.5 h-10 text-sm whitespace-nowrap transition-colors ${
                      isSelected
                        ? "text-primary font-semibold bg-[#EEF3FB]"
                        : "text-[#3B4A5A] hover:bg-gray-50"
                    }`}
                  >
                    <span>{t.label}</span>
                    {isSelected && <FiCheck size={14} className="ml-3 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
