"use client";

import LikeButton from "@/components/ui/Button/LikeButton";

type Props = {
  id: number | string;
  type: "booth" | "foodtruck";
  name: string;
  isLiked: boolean;
  likeCount: number;
  info: string;
};

export default function FoodTruckTitle({
  id,
  type,
  name,
  isLiked,
  likeCount,
  info,
}: Props) {
  return (
    <div className="flex flex-col gap-3 mt-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-semibold">{name}</span>
        <LikeButton
          id={id}
          type={type}
          initialIsLiked={isLiked}
          initialLikeCount={likeCount}
          layout="vertical"
        />
      </div>
      <p className="break-keep">{info}</p>
    </div>
  );
}
