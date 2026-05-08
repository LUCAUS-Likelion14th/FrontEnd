"use client";

import LikeButton from "../../common/Button/LikeButton";

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
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">{name}</span>
        <LikeButton
          id={id}
          type={type}
          initialIsLiked={isLiked}
          initialLikeCount={likeCount}
          layout="vertical"
        />
      </div>
      <p>{info}</p>
    </div>
  );
}
