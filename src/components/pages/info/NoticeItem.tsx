"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface NoticeItemProps {
  id: number;
  category: "important" | "notice";
  title: string;
  date: string;
}

const categoryMap = {
  important: {
    label: "중요",
    style: "bg-[#FF0000] rounded-[8px] text-white",
  },
  notice: {
    label: "공지",
    style: "rounded-[8px] border border-[#A1ABBC] text-[#A1ABBC]",
  },
  event: {
    label: "이벤트",
    style: "rounded-[8px] border border-[#A1ABBC] text-[#A1ABBC]",
  },
};

export default function NoticeItem({ id, category, title, date }: NoticeItemProps) {
  const { label, style } = categoryMap[category];

  return (
    <Link
      href={`/info/notice/${id}`}
      className="flex items-center justify-between py-3 border-b border-[#DCE2E9] active:bg-gray-50"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span className={`flex items-center justify-center shrink-0 h-7.75 p-2.5 text-[14px] font-semibold ${style}`}>
          {label}
        </span>
        <p className="text-[16px] font-medium truncate">{title}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-2">
        <span className="text-[14px] text-[#A1ABBC] whitespace-nowrap">{date}</span>
        <FiChevronRight size={16} className="text-[#A1ABBC]" />
      </div>
    </Link>
  );
}
