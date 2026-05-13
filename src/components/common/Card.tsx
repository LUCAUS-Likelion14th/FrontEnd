"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./Button/LikeButton";

type CardProps = {
  id: number;
  type: "booth" | "foodtruck";
  name: string;
  subText: string; // 단체 이름 or 메인 메뉴
  location: string;
  image: string;
  isLiked: boolean;
  likeCount: number;
};

export default function Card({
  id,
  type,
  name,
  subText,
  location,
  image,
  isLiked,
  likeCount,
}: CardProps) {
  return (
    <Link href={`/${type}/${id}`} className="block">
      <article className="w-full rounded-[10px] border border-[#DCE2E9] p-[10px] flex flex-col gap-[9px] bg-white">
        <div className="relative w-full h-[109px] rounded-[8px] overflow-hidden bg-[#D9D9D9] shrink-0">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[2px] min-w-0">
            <span className="text-[12px] leading-normal text-[#8D97A7] truncate">
              {subText}
            </span>
            <span className="text-[16px] font-semibold leading-normal text-black truncate">
              {name}
            </span>
            <span className="text-[12px] leading-normal text-black truncate">
              {location}
            </span>
          </div>

          <LikeButton
            id={id}
            type={type}
            initialIsLiked={isLiked}
            initialLikeCount={likeCount}
            layout="vertical"
            size="sm"
          />
        </div>
      </article>
    </Link>
  );
}
