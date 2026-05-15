"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import LikeButton from "../common/Button/LikeButton";
import { motion } from "framer-motion";

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
    <div className="ml-7.5">
      <motion.article
        className="relative w-full pl-[10px] pr-[16px] py-[16px] rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        whileHover={{ y: -2, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
      >
        <Link href={href} className="flex items-center gap-[13px]">
          <div className="relative w-[76px] h-[76px] rounded-[8px] overflow-hidden shrink-0 bg-gray-200">
            {imgError || !imageUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                <FiImage size={28} className="text-gray-300" />
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-base text-black pr-14 truncate">{location}</span>
            <div className="flex items-end justify-between gap-2">
              <strong className="text-xl font-semibold truncate">{name}</strong>
              {department && (
                <span className="text-base text-text-sub text-right shrink-0 max-w-[84px] truncate">
                  {department}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div
          className="absolute top-[16px] right-[16px]"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <LikeButton
            id={id}
            type={type}
            initialIsLiked={isLiked}
            initialLikeCount={likeCount}
            layout="horizontal"
            size="sm"
          />
        </div>
      </motion.article>
    </div>
  );
}
