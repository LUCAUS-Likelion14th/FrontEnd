"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import LikeButton from "../common/Button/LikeButton";

type ListCardProps = {
  id: number | string;
  type: "booth" | "foodtruck";
  imageUrl: string;
  href: string;
  location: string;
  name: string;
  isLiked: boolean;
  likeCount: number;
  department?: string;
};

export default function ListCard({
  id,
  type,
  imageUrl,
  href,
  location,
  name,
  isLiked,
  likeCount,
  department,
}: ListCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={href} className="ml-[30px]">
      <article className="flex items-center gap-[13px] w-full p-2.5 rounded-[10px] bg-white border border-text-sub2">
        {imgError || !imageUrl ? (
          <div className="w-[76px] h-[76px] rounded-[10px] bg-gray-100 shrink-0 flex items-center justify-center">
            <FiImage size={28} className="text-gray-300" />
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={name}
            width={76}
            height={76}
            className="rounded-[10px] object-cover shrink-0"
            onError={() => setImgError(true)}
          />
        )}

        <div className="flex flex-1 min-w-0">
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <span className="text-base">{location}</span>
            <strong className="text-xl font-bold truncate">{name}</strong>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            <LikeButton
              id={id}
              type={type}
              initialIsLiked={isLiked}
              initialLikeCount={likeCount}
              layout="horizontal"
            />
            <span className="text-base text-text-sub">{department}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
