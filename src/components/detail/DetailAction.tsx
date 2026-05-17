"use client";

import { AiOutlineInstagram } from "react-icons/ai";
import LikeButton from "@/components/ui/Button/LikeButton";

interface DetailActionsProps {
  id: number;
  type: "booth" | "foodtruck";
  isLiked: boolean;
  ownerInsta?: string;
  likeCount: number;
}

export default function DetailAction({
  id,
  type,
  isLiked,
  ownerInsta,
  likeCount,
}: DetailActionsProps) {
  return (
    <div className="flex border-y border-text-sub2 py-5">
      <button
        onClick={() => ownerInsta && window.open(ownerInsta, "_blank")}
        className="flex-1 flex flex-col items-center justify-center gap-2 border-r border-text-sub2"
      >
        <AiOutlineInstagram size={38} />
        <span className="text-[14px] cursor-pointer">운영 단체 인스타 바로 가기</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <LikeButton
          id={id}
          type={type}
          initialIsLiked={isLiked}
          initialLikeCount={likeCount}
          layout="vertical"
          countSuffix="명이 좋아했어요"
          outlineColor="text-black"
          countColor="text-black"
        />
      </div>
    </div>
  );
}
