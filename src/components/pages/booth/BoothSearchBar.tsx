"use client";

import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BoothSearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center w-full px-4 py-1.5 bg-[#EEF3FB] rounded-[18px] transition-shadow focus-within:shadow-[0_0_0_1.5px_#06387D]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="부스 이름 검색"
        className="flex-1 text-sm outline-none bg-transparent placeholder:text-[#8D97A7]"
      />
      <FiSearch size={18} className="text-primary shrink-0 ml-2.5" />
    </div>
  );
}
