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
        className="fixed top-0 left-0 right-0 flex items-center px-4 z-50"
        style={{
          height: "calc(3.5rem + env(safe-area-inset-top))",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="absolute -inset-px overflow-hidden">
          <Image
            src={headerBg}
            alt="헤더 배경"
            fill
            priority
            className="object-cover"
          />
        </div>

        <button
          className="relative z-10 flex items-center justify-center"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(true)}
        >
          <Image src="/icons/menu.png" alt="메뉴" width={24} height={24} />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          <Link href="/" aria-label="홈으로 이동" className="flex items-center">
            <Image src="/logo.png" alt="축제 로고" width={75} height={24} />
          </Link>
        </div>

        <div className="ml-auto relative z-10 flex items-center justify-center">
          <Link href="/mypage" className="flex items-center">
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
