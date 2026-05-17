"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BG_STARS = [
  { x: "15%", y: "20%", size: 2, delay: 0.2 },
  { x: "80%", y: "15%", size: 3, delay: 0.8 },
  { x: "25%", y: "70%", size: 2, delay: 0.4 },
  { x: "70%", y: "65%", size: 2, delay: 1.0 },
  { x: "90%", y: "40%", size: 3, delay: 0.6 },
  { x: "10%", y: "45%", size: 2, delay: 1.2 },
  { x: "50%", y: "12%", size: 2, delay: 0.3 },
  { x: "60%", y: "80%", size: 3, delay: 0.7 },
  { x: "35%", y: "88%", size: 2, delay: 0.9 },
  { x: "85%", y: "78%", size: 2, delay: 0.5 },
  { x: "45%", y: "30%", size: 1.5, delay: 1.1 },
  { x: "5%", y: "80%", size: 2, delay: 0.15 },
];

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isNotFirst = sessionStorage.getItem("isFirst");

    if (isNotFirst === "false") {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("isFirst", "false");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05061A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 배경 이미지 */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src="/landing-bg.png"
              alt="랜딩페이지 배경"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* 배경 별들 */}
          {BG_STARS.map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                background: "white",
                boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(200, 220, 255, 0.8)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1, 0.8, 1] }}
              transition={{ duration: 1.2, delay: star.delay, ease: "easeOut" }}
            />
          ))}

          {/* 로고 페이드 반짝임 */}
          <motion.div
            className="relative z-10 w-[259px] h-[118px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 1] }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3, times: [0, 0.5, 1] }}
          >
            <Image
              src="/lucaus-logo.png"
              alt="LUCAUS 로고"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
