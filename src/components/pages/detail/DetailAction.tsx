"use client";

import { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { IoHeart } from "react-icons/io5";

interface DetailActionsProps {
  boothId: number;
  ownerInsta?: string;
  likeCount: number;
  isLiked: boolean;
  onLike: (boothId: number) => Promise<void>;
  onUnlike: (boothId: number) => Promise<void>;
}

export default function DetailAction({
  boothId,
  ownerInsta,
  likeCount,
  isLiked,
  onLike,
  onUnlike,
}: DetailActionsProps) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (liked) {
        await onUnlike(boothId);
        setLiked(false);
        setCount((c) => c - 1);
      } else {
        await onLike(boothId);
        setLiked(true);
        setCount((c) => c + 1);
      }
    } catch {
      // 실패 시 상태 유지
    } finally {
      setLoading(false);
    }
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

      <button
        onClick={handleLike}
        disabled={loading}
        className="flex-1 flex flex-col items-center justify-center gap-2"
      >
        {liked ? (
          <IoHeart size={30} className="text-primary" />
        ) : (
          <FiHeart size={30} />
        )}
        <span className="text-[14px]">
          <span>{count}</span>명이 좋아했어요
        </span>
      </button>
    </div>
  );
}
