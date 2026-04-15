"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginBottomSheet({ isOpen, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 초기 터치 위치
  const startY = useRef(0);

  // 드래그
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (dragY > 100) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setDragY(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-[rgba(6,56,125,0.25)] rounded-t-[20px] z-50 px-7 pt-5.5 pb-[37px] transition-transform duration-800 backdrop-blur-[3px] border border-white/30 shadow-lg"
        style={{
          transform: `translateY(${dragY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
          />
        </div>

        <div className="flex flex-col justify-center items-center mb-5 text-base text-white font-medium">
          <div className="flex flex-col items-start gap-1">
            <div className="flex justify-center items-start gap-2">
              <Image
                src={"/icons/highlight-white.png"}
                alt={"하이라이트 아이콘"}
                width={16}
                height={16}
                className="shrink-0"
              />
              <span>좋아요 저장하고 나중에 다시 보기</span>
            </div>

            <div className="flex justify-center items-start gap-2">
              <Image
                src={"/icons/highlight-white.png"}
                alt={"하이라이트 아이콘"}
                width={16}
                height={16}
                className="shrink-0"
              />
              <span>광장기획전 참여하고 경품 응모하기</span>
            </div>
          </div>
        </div>

        <GoogleLoginButton />
      </div>
    </>
  );
}
