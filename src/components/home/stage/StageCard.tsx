"use client";

import Image from "next/image";

type StageCardProps = {
  imageUrl: string;
  href: string;
  category: string;
  name: string;
  time: string;
};

export default function StageCard({
  imageUrl,
  category,
  name,
  time,
}: StageCardProps) {
  return (
    <div className="ml-7.5">
      <article className="relative w-full pl-[10px] pr-[16px] py-[16px] rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-[13px]">
          <Image
            src={imageUrl}
            alt={name}
            width={76}
            height={76}
            className="rounded-[8px] object-cover shrink-0"
          />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-[14px] text-black truncate">{category}</span>
            <div className="flex items-end justify-between gap-2">
              <strong className="text-[18px] font-semibold truncate">
                {name}
              </strong>
              <time className="text-[14px] text-text-sub shrink-0">{time}</time>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
