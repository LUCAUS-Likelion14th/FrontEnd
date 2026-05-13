"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
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
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/${type}/${id}`} className="block">
      <article className="w-full rounded-[10px] overflow-hidden flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="relative w-full h-[109px] bg-[#D9D9D9] shrink-0">
          {imgError || !image ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <FiImage size={28} className="text-gray-300" />
            </div>
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="flex items-start justify-between p-[10px] pt-[9px] bg-white">
          <div className="flex flex-col gap-[2px] flex-1 min-w-0 mr-2">
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

          <div
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <LikeButton
              id={id}
              type={type}
              initialIsLiked={isLiked}
              initialLikeCount={likeCount}
              layout="vertical"
              size="sm"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
