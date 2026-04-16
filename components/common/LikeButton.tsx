"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

type LikeButtonProps = {
  initialIsLiked: boolean;
  initialLikeCount: number;
  layout?: "vertical" | "horizontal"; // 배치 방향 (세로/가로)
};

export default function LikeButton({
  initialIsLiked,
  initialLikeCount,
  layout = "vertical",
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [animateKey, setAnimateKey] = useState(0);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLiked) {
      setAnimateKey((prev) => prev + 1);
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
    setIsLiked(!isLiked);
  };

  const containerClass =
    layout === "vertical"
      ? "flex flex-col items-center gap-1"
      : "flex items-center gap-1";

  return (
    <div
      onClick={handleLikeClick}
      className={`${containerClass} shrink-0 cursor-pointer relative`}
    >
      {/* 하트 아이콘 영역 (터지는 효과를 위해 relative로 잡음) */}
      <div className="relative flex items-center justify-center w-6 h-6">
        {/* 1. 메인 하트 아이콘 */}
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <FaHeart size={24} className="text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="unliked"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiHeart size={24} className="text-text-sub" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. 팡 터지는 8개 선 효과 (좋아요 누를 때만 잠깐 등장) */}
        <AnimatePresence>
          {animateKey > 0 && isLiked && (
            <motion.div
              key={animateKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="heart-burst">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`burst-line line-${i}`} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. 좋아요 숫자 */}
      <span
        className={`${layout === "vertical" ? "text-sm text-text-sub" : "text-base text-text-sub"} z-10 relative`}
      >
        {likeCount}
      </span>
    </div>
  );
}
