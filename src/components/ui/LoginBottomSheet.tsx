"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import GoogleLoginButton from "./Button/GoogleLoginButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginBottomSheet({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 어둡게 (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
          />

          {/* 바텀시트 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.3 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            onClick={e => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 bg-[rgba(6,56,125,0.25)] rounded-t-[20px] z-50 px-7 pt-5.5 pb-[37px] backdrop-blur-[10px] border border-white/20 shadow-lg"
          >
            {/* 상단 드래그 핸들 바 */}
            <div className="w-full flex justify-center mb-[27px]">
              <div className="w-19.5 h-[3px] bg-text-sub2 rounded-full" />
            </div>

            <div className="text-center mb-12">
              <span className="text-[20px] text-white font-semibold">
                로그인 후 축제를 더 편하게 즐기세요!
              </span>
            </div>

            <div className="flex justify-center mb-9.5">
              <Image
                src="/lucaus-logo.png"
                alt="푸앙이 이미지"
                width={230}
                height={105}
                priority // 시트가 열릴 때 바로 보여야 하므로 우선순위 부여
              />
            </div>

            <div className="flex flex-col justify-center items-center mb-10 text-base text-white font-medium">
              <div className="flex flex-col items-start gap-3">
                <div className="flex justify-center items-start gap-2">
                  <Image
                    src="/icons/highlight-white.png"
                    alt="하이라이트 아이콘"
                    width={22}
                    height={22}
                    className="shrink-0 mt-1"
                  />
                  <span>좋아요 저장하고 나중에 다시 보기</span>
                </div>

                <div className="flex justify-center items-start gap-2">
                  <Image
                    src="/icons/highlight-white.png"
                    alt="하이라이트 아이콘"
                    width={22}
                    height={22}
                    className="shrink-0 mt-1"
                  />
                  <span>광장기획전 참여하고 경품 응모하기</span>
                </div>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <GoogleLoginButton />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
