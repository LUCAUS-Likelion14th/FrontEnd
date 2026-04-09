"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FiList } from "react-icons/fi";
import { LOST_ITEM_TYPES } from "@/data/lostItemData";

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
        className="flex items-center gap-1 px-2.5 h-10 bg-[#DADADA] rounded-[6px]"
      >
        <FiList size={18} />
        <span className="text-base">{currentLabel}</span>
        <FiChevronDown size={18} />
      </button>

      {isOpen && (
        <ul className="absolute top-12 left-0 z-20 bg-white border border-[#DCE2E9] rounded-[6px] shadow-md w-max">
          {LOST_ITEM_TYPES.map((t) => (
            <li key={t.value}>
              <button
                onClick={() => {
                  onSelectType(t.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 ${
                  selectedType === t.value ? "text-primary font-semibold" : ""
                }`}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
