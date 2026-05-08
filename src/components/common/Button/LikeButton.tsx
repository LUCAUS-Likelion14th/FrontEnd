"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { mutate } from "@/lib/api/fetcher";

type LikeButtonProps = {
  id: number | string;
  type: "booth" | "foodtruck";
  initialIsLiked: boolean;
  initialLikeCount: number;
  layout?: "vertical" | "horizontal"; // 배치 방향 (세로/가로)
  hideCount?: boolean;
};

export default function LikeButton({
  id,
  type,
  initialIsLiked,
  initialLikeCount,
  layout = "vertical",
  hideCount = false,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [animateKey, setAnimateKey] = useState(0);
  const router = useRouter();

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const endpoint = type === "booth" ? `/booth/${id}/like` : `/foodtruck/${id}/like`;
    const nextLiked = !isLiked;

    setIsLiked(nextLiked);
    setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    if (nextLiked) setAnimateKey((prev) => prev + 1);

    try {
      await mutate(endpoint, nextLiked ? "POST" : "DELETE");
      // 서버 캐시를 무효화하여 다른 페이지에서도 좋아요 상태가 동기화되도록 함
      router.refresh();
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      setIsLiked(!nextLiked);
      setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
      alert("로그인이 필요하거나 서버 오류가 발생했습니다.");
    }
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
      <div className="relative flex items-center justify-center w-6 h-6">
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <FaHeart size={24} className="text-[#FF0080]" />
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
      {!hideCount && (
        <span
          className={`${layout === "vertical" ? "text-sm text-text-sub" : "text-base text-text-sub"} z-10 relative`}
        >
          {likeCount}
        </span>
      )}
    </div>
  );
}
