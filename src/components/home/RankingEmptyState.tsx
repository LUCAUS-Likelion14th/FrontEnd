"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import headerBg from "@/assets/webp/header-bg.webp";

const SPARKLES = [
  { top: "16%", left: "10%", delay: 0 },
  { top: "26%", left: "85%", delay: 0.4 },
  { top: "70%", left: "18%", delay: 0.9 },
  { top: "60%", left: "72%", delay: 1.3 },
  { top: "85%", left: "45%", delay: 1.8 },
];

export function RankingEmptyState() {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-4 min-h-[220px] px-6 py-10 rounded-[10px] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${headerBg.src})` }}
    >
      {SPARKLES.map((sparkle, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{ top: sparkle.top, left: sparkle.left }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.5, 0.8] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative flex flex-col items-center gap-1.5 text-center">
        <p className="text-[17px] font-bold text-white">
          지금은 운영 시간이 아니에요
        </p>
        <p className="text-[13px] text-white/70">
          무대 · 부스 · 푸드트럭은 운영 시간에 다시 만나요!
        </p>
      </div>

      <Link
        href="/info"
        className="relative flex items-center gap-1 px-4 py-2 rounded-full bg-white/15 text-white text-[13px] font-semibold border border-white/30 shadow-lg active:scale-95 transition-all"
      >
        축제 정보 보러가기
        <FiArrowRight size={14} />
      </Link>
    </div>
  );
}
