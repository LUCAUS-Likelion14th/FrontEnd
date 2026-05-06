"use client";

import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

type Props = {
  foodId: number;
  name: string;
  isLiked: boolean;
  likeCount: number;
  info: string;
  onLike: (id: number) => Promise<void>;
  onUnlike: (id: number) => Promise<void>;
};

export default function FoodTruckTitle({
  foodId,
  name,
  isLiked,
  likeCount,
  info,
  onLike,
  onUnlike,
}: Props) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (liked) {
        await onUnlike(foodId);
        setLiked(false);
        setCount((c) => c - 1);
      } else {
        await onLike(foodId);
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
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">{name}</span>
        <div className="flex flex-col items-center gap-1">
          <button onClick={handleLike} disabled={loading}>
            {liked ? (
              <FaHeart size={24} className="text-primary" />
            ) : (
              <FiHeart size={24} className="text-text-sub" />
            )}
          </button>
          <span className="text-sm text-text-sub">{count}</span>
        </div>
      </div>
      <p>{info}</p>
    </div>
  );
}
