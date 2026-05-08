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
  layout?: "vertical" | "horizontal";
  hideCount?: boolean;
  countSuffix?: string;
  outlineColor?: string;
  countColor?: string;
};

export default function LikeButton({
  id,
  type,
  initialIsLiked,
  initialLikeCount,
  layout = "vertical",
  hideCount = false,
  countSuffix,
  outlineColor = "text-text-sub",
  countColor,
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
      const goLogin = window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?");
      if (goLogin) router.push("/login");
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
      <div className="relative flex items-center justify-center w-[38px] h-[38px]">
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <FaHeart size={30} className="text-[#FF0080]" />
            </motion.div>
          ) : (
            <motion.div
              key="unliked"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiHeart size={30} className={outlineColor} />
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

      {!hideCount && (
        <span
          className={`${layout === "vertical" ? "text-sm" : "text-base"} ${countColor ?? "text-text-sub"} z-10 relative`}
        >
          {countSuffix ? `${likeCount}${countSuffix}` : likeCount}
        </span>
      )}
    </div>
  );
}
