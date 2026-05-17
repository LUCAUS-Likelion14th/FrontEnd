"use client";

import { LostItem } from "@/types/lost";
import Image from "next/image";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

type Props = {
  item: LostItem;
};

export default function LostItemCard({ item }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="w-full rounded-[10px] overflow-hidden flex flex-col border border-[#E8ECF2]">
      <div className="relative w-full h-[109px] bg-[#D9D9D9] shrink-0">
        {imgError || !item.image ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <FiImage size={28} className="text-gray-300" />
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="flex items-start justify-between p-[10px] pt-[9px] bg-white">
        <div className="flex flex-col gap-[2px] flex-1 min-w-0">
          <span className="text-[12px] leading-normal text-text-sub truncate">
            {item.date}
          </span>

          <span className="text-[16px] font-semibold leading-normal text-black truncate">
            {item.name}
          </span>

          <span className="text-[12px] leading-normal text-black truncate">
            {item.find_location}
          </span>
        </div>
      </div>
    </article>
  );
}
