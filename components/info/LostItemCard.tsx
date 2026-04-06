"use client";

import { LostItem } from "@/data/lostItemData";
import Image from "next/image";

type Props = {
  item: LostItem;
};

export default function LostItemCard({ item }: Props) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  };

  return (
    <article className="relative w-full h-[137px] rounded-[10px] overflow-hidden bg-[#D9D9D9]">
      {/* 이미지 */}
      <Image src={item.image} alt={item.name} fill className="object-cover" />

      {/* 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-white/100 to-transparent" />

      {/* 정보 */}
      <div className="absolute bottom-[8px] left-[11px] right-[11px]">
        <div className="flex flex-col">
          <span className="text-base font-semibold">{item.name}</span>

          <div className="flex justify-between text-[14px] text-[#8F99AA]">
            <span>{formatDate(item.date)}</span>
            <span>{item.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
