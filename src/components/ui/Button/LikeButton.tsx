"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { mutate } from "@/api/fetcher";
import LoginBottomSheet from "@/components/ui/LoginBottomSheet";
// ─── analytics tracking ───
import { trackEvent } from "@/lib/api/analytics";
// ─── /analytics tracking ───

type LikeButtonProps = {
  id: number | string;
  type: "booth" | "foodtruck";
  initialIsLiked: boolean;
  initialLikeCount: number;
  layout?: "vertical" | "horizontal";
  size?: "sm" | "md";
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
  size = "md",
  hideCount = false,
  countSuffix,
  outlineColor = "text-text-sub",
  countColor,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [animateKey, setAnimateKey] = useState(0);
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);
  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const updateCache = (liked: boolean, count: number) => {
    queryClient.setQueriesData<any>(
      { queryKey: [type] },
      (oldData: any) => {
        if (!oldData?.content) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: any) => {
            if (Number(item.booth_id ?? item.foodtruck_id) === Number(id)) {
              return {
                ...item,
                is_liked: liked,
                liked: liked,
                like_count: count,
                likeCount: count,
              };
            }
            return item;
          }),
        };
      }
    );
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (!localStorage.getItem("accessToken")) {
      setShowLoginSheet(true);
      return;
    }

    const endpoint =
      type === "booth" ? `/booth/${id}/like` : `/foodtruck/${id}/like`;
    const nextLiked = !isLiked;
    const nextLikeCount = nextLiked
      ? likeCount + 1
      : likeCount - 1;

    setIsLiked(nextLiked);
    setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    if (nextLiked) setAnimateKey((prev) => prev + 1);

    // 캐시를 즉시 업데이트해 리렌더/리마운트 시에도 좋아요 상태가 유지되도록 함
    updateCache(nextLiked, nextLikeCount);

    try {
      await mutate(endpoint, nextLiked ? "POST" : "DELETE");

      // 백 로그
        trackEvent({
          eventType: `${type}_like_click`,
          targetType: type.toUpperCase(),
          targetId: Number(id),
          payload: {
            action: nextLiked ? "like" : "unlike",
            likeCountAfter: nextLikeCount,
          },
        });

      queryClient.invalidateQueries({ queryKey: [type] });
      queryClient.invalidateQueries({
        queryKey: [type === "booth" ? "topBooth" : "hotFood"],
      });
      queryClient.invalidateQueries({
        queryKey: ["mypage", type === "booth" ? "booth" : "foodtruck"],
      });
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      setIsLiked(!nextLiked);
      setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
      updateCache(!nextLiked, likeCount);
      setShowLoginSheet(true);
    }
  };

  const containerClass =
    layout === "vertical"
      ? "flex flex-col items-center"
      : "flex items-center gap-[4px]";

  return (
    <>
      <LoginBottomSheet
        isOpen={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
      />
      <div
        onClick={handleLikeClick}
        className={`${containerClass} shrink-0 cursor-pointer relative`}
      >
        {!hideCount && layout === "horizontal" && (
          <span
            className={`${size === "sm" ? "text-[16px]" : "text-base"} ${countColor ?? "text-text-sub"} z-10 relative`}
          >
            {countSuffix ? `${likeCount}${countSuffix}` : likeCount}
          </span>
        )}

        <div
          className={`relative flex items-center justify-center ${size === "sm" ? "w-6 h-6" : "w-[38px] h-[38px]"}`}
        >
          <AnimatePresence mode="wait">
            {isLiked ? (
              <motion.div
                key="liked"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <FaHeart
                  size={size === "sm" ? 24 : 30}
                  className="text-[#E93885]"
                />
              </motion.div>
            ) : (
              <motion.div
                key="unliked"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiHeart
                  size={size === "sm" ? 24 : 30}
                  className={outlineColor}
                />
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

        {!hideCount && layout !== "horizontal" && (
          <span
            className={`${size === "sm" ? "text-[14px]" : layout === "vertical" ? "text-sm" : "text-base"} ${countColor ?? "text-text-sub"} z-10 relative`}
          >
            {countSuffix ? `${likeCount}${countSuffix}` : likeCount}
          </span>
        )}
      </div>
    </>
  );
}
