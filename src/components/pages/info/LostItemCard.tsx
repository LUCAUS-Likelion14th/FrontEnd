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
    <article className="relative w-full h-[137px] rounded-[10px] overflow-hidden bg-[#D9D9D9]">
      {imgError || !item.image ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <FiImage size={32} className="text-gray-300" />
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

      <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-white/100 to-transparent" />

      <div className="absolute bottom-[8px] left-[11px] right-[11px]">
        <div className="flex flex-col">
          <span className="text-base font-semibold">{item.name}</span>
          <div className="flex justify-between text-[14px] text-black">
            <span>{item.date}</span>
            <span>{item.find_location}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
