"use client";

import { AiOutlineInstagram } from "react-icons/ai";
import LikeButton from "../../common/Button/LikeButton";
import { useState } from "react";

interface DetailActionsProps {
  id: number | string;
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
  // LikeButton 내부 상태와 맞추기 위해 useState를 사용할 수도 있지만
  // LikeButton에서 hideCount를 사용할 때 부모에서 숫자를 동기화하려면 LikeButton의 상태를 끌어올려야 합니다.
  // 이 문제를 피하기 위해 LikeButton 옆에 글씨를 두는 대신 LikeButton 자체가 숫자를 표시하지 않고,
  // 우리가 여기서 상태를 관리하거나 아니면 간단히 LikeButton을 클릭할 수 있는 영역에 배치합니다.
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  // 이벤트를 캡처하여 로컬 카운트 업데이트
  const handleLikeCapture = () => {
    // 좋아요 상태는 LikeButton 내부에 있으므로, 버튼을 클릭할 때마다 임시로 토글합니다.
    // 엄밀한 동기화는 아니지만, Optimistic UI를 위해 숫자만 +1 / -1 합니다.
    // 하지만 가장 좋은 방법은 LikeButton 안에서 좋아요 수를 노출하는 것입니다.
  };

  return (
    <div className="flex border-y border-text-sub py-5">
      <button
        onClick={() => ownerInsta && window.open(ownerInsta, "_blank")}
        className="flex-1 flex flex-col items-center justify-center gap-2 border-r border-text-sub"
      >
        <AiOutlineInstagram size={38} />
        <span className="text-[14px]">주최자 인스타 바로 가기</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 relative pointer-events-auto">
        <div className="flex flex-col items-center justify-center pointer-events-auto z-20">
          <LikeButton
            id={id}
            type={type}
            initialIsLiked={isLiked}
            initialLikeCount={likeCount}
            layout="vertical"
          />
        </div>
        <span className="text-[14px] -mt-1 pointer-events-none z-10">
          명이 좋아했어요
        </span>
      </div>
    </div>
  );
}
