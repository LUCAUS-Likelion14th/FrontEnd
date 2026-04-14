"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FoodTruckDetail } from "@/types/foodtruck";

type Props = {
  truck: FoodTruckDetail;
};

export default function FoodTruckCard({ truck }: Props) {
  const mainMenu = truck.food_menu[0]?.menu_name ?? "";

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/foodtruck/${truck.food_id}`} className="block">
      <article className="relative w-full h-[137px] rounded-[10px] overflow-hidden bg-[#D9D9D9]">
        {/* 이미지 */}
        <Image
          src={truck.image}
          alt={truck.food_name}
          fill
          className="object-cover"
        />

        {/* 하단 그라데이션 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-white/100 to-transparent" />

        {/* 카드 정보 오버레이 */}
        <div className="absolute bottom-[9px] left-[7px] right-[7px] flex items-end justify-between">
          {/* 푸드트럭 정보 */}
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold leading-tight line-clamp-1">
              {truck.food_name}
            </span>
            <span className="text-xs leading-tight text-black/70 line-clamp-1">
              {mainMenu}
            </span>
            <span className="text-xs leading-tight text-black/70 line-clamp-1">
              {truck.location}
            </span>
          </div>

          {/* 좋아요 */}
          <div
            onClick={handleLikeClick}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div className="active:scale-110 transition-transform duration-200">
              {truck.is_liked ? (
                <FaHeart size={24} className="text-primary" />
              ) : (
                <FiHeart size={24} className="text-text-sub" />
              )}
            </div>
            <span className="text-sm text-text-sub">{truck.like_count}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
