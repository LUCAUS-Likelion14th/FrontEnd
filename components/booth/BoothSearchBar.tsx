"use client";

import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BoothSearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2.5 w-full px-4 py-1.5 border border-text-sub rounded-[18px]">
      <FiSearch size={18} className="text-text-sub shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="부스 이름 검색"
        className="flex-1 text-base outline-none bg-transparent placeholder:text-text-sub"
      />
    </div>
  );
}
