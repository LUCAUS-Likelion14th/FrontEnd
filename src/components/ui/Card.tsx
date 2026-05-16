"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import LikeButton from "./Button/LikeButton";
import { motion } from "framer-motion";

type CardProps = {
  id: number;
  type: "booth" | "foodtruck";
  name: string;
  subText?: string;
  location?: string;
  locationId?: string;
  image: string;
  isLiked: boolean;
  likeCount: number;
  date?: string;
};

export default function Card({
  id,
  type,
  name,
  subText,
  location,
  locationId,
  image,
  isLiked,
  likeCount,
  date,
}: CardProps) {
  const [imgError, setImgError] = useState(false);

  const href = date ? `/${type}/${id}?date=${date}` : `/${type}/${id}`;

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
    >
    <Link href={href} className="block">
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
            {subText && (
              <span className="text-[12px] leading-normal text-text-sub truncate">
                {subText}
              </span>
            )}
            <span className="text-[16px] font-semibold leading-normal text-black truncate">
              {name}
            </span>
            {location && (
              <span className="text-[12px] leading-normal text-black truncate">
                {location}{locationId ? ` #${locationId}` : ""}
              </span>
            )}
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
    </motion.div>
  );
}
