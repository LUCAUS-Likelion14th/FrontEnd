"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const isNotFirst = sessionStorage.getItem("isFirst");

    if (isNotFirst === "false") {
      return;
    }

    const startTimer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("isFirst", "false");
      }, 500);
    }, 2000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing-bg.png"
          alt="랜딩페이지 배경"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-[259px] h-[118px] animate-[fadeIn_2s_ease-in-out]">
        <Image
          src="/lucaus-logo.png"
          alt="LUCAUS 로고"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
