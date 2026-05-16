"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { headerBg } from "@/assets/webp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 flex items-end px-4 pb-3 z-50"
        style={{ height: "calc(3.5rem + env(safe-area-inset-top))" }}
      >
        {/* 오버스크롤 시 위쪽 빈 공간까지 배경이 덮이도록 위로 확장 */}
        <div className="absolute left-0 right-0 bottom-0 overflow-hidden" style={{ top: "-100dvh" }}>
          <div className="absolute left-0 right-0 bottom-0" style={{ height: "calc(100dvh + 3.5rem + env(safe-area-inset-top))" }}>
            <Image
              src={headerBg}
              alt="헤더 배경"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
        </div>
        <button
          className="relative z-10"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(true)}
        >
          <Image src="/icons/menu.png" alt="메뉴" width={24} height={24} />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <Link href="/" aria-label="홈으로 이동">
            <Image src="/logo.png" alt="축제 로고" width={75} height={24} />
          </Link>
        </div>

        <div className="ml-auto relative z-10">
          <Link href="/mypage">
            <Image
              src="/icons/user.png"
              alt="마이페이지"
              width={28}
              height={28}
            />
          </Link>
        </div>
      </header>

      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
