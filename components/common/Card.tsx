"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";

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
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/${type}/${id}`} className="block">
      <article className="relative w-full h-[137px] rounded-[10px] overflow-hidden bg-[#D9D9D9]">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-white/100 to-transparent" />

        <div className="absolute bottom-[9px] left-[7px] right-[7px] flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-semibold leading-tight line-clamp-1">
              {name}
            </span>
            <span className="text-xs leading-tight text-black/70 line-clamp-1">
              {subText}
            </span>
            <span className="text-xs leading-tight text-black/70 line-clamp-1">
              {location}
            </span>
          </div>

          <LikeButton
            initialIsLiked={isLiked}
            initialLikeCount={likeCount}
            layout="vertical"
          />
        </div>
      </article>
    </Link>
  );
}
