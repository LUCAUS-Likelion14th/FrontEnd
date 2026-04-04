'use client';

import { AiOutlineInstagram } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

interface DetailActionsProps {
  ownerInsta?: string;
  likeCount: number;
}

export default function DetailAction({ ownerInsta, likeCount }: DetailActionsProps) {
  return (
    <div className="flex border-y border-text-sub py-5 my-4">
      <button 
        onClick={() => ownerInsta && window.open(ownerInsta, "_blank")}
        className="flex-1 flex flex-col items-center justify-center gap-2 border-r border-text-sub"
      >
        <AiOutlineInstagram size={35}/>
        <span className="text-sm">주최자 인스타 바로 가기</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <FiHeart size={30} />
        <span className="text-sm">
          <span>{likeCount}</span>명이 좋아했어요
        </span>
      </div>
    </div>
  );
}