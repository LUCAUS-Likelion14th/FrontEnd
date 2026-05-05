"use client";

import { useRouter } from "next/navigation";

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

export default function NoticeItem({
  id,
  category,
  title,
  date,
}: NoticeItemProps) {
  const { label, style } = categoryMap[category];
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/info/notice/${id}`)}
      className="flex items-center justify-between py-3 border-b border-[#DCE2E9] cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex items-center justify-center h-7.75 p-2.5 text-[14px] font-semibold ${style}`}
        >
          {label}
        </span>
        <p className="text-[16px] font-medium">{title}</p>
      </div>

      <span className="text-[16px] text-[#A1ABBC]">{date}</span>
    </div>
  );
}
