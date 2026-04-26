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
        className="flex items-center gap-3 px-2.5 h-10 rounded-[6px] border border-primary"
      >
        <FiList size={18} className="text-primary" />
        <div className="flex gap-3 items-center">
          <span className="text-base">{currentLabel}</span>
          <FiChevronDown size={18} className="text-primary" />
        </div>
      </button>

      {isOpen && (
        <ul className="absolute top-12 left-0 z-20 bg-white border border-text-sub rounded-[6px] shadow-md overflow-hidden">
          {LOST_ITEM_TYPES.map((t) => (
            <li
              key={t.value}
              className="border-b border-b-text-sub last:border-none"
            >
              <button
                onClick={() => {
                  onSelectType(t.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-2.5 w-[135px] h-10 text-base whitespace-nowrap hover:bg-gray-50 ${
                  selectedType === t.value ? "bg-text-sub2" : ""
                }`}
              >
                <FiList size={18} className="text-text-sub shrink-0" />

                <span>{t.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
