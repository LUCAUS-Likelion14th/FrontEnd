"use client";

import Image from "next/image";
import logo from "@/assets/likelion-icon.svg";

export default function Footer() {
  return (
    <footer className="relative isolate flex flex-col items-center gap-1 px-8 pt-6 pb-30 text-white text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/footer-bg.png"
          alt="푸터 배경"
          fill
          className="object-cover"
        />
      </div>
      <address className="flex flex-col gap-1 not-italic">
        <p className="flex items-center justify-center gap-1 text-[14px] font-normal">
          <Image
            src={logo}
            alt="멋사 로고"
            width={14}
            height={14}
            className="object-contain"
          />
          LIKELION CAU × 축제기획단
        </p>
        <small className="text-[10px] font-light text-white/60">
          Copyright © 2026 Likelion CAU
        </small>
      </address>
    </footer>
  );
}
