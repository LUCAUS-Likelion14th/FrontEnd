"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative flex items-center h-14 px-4 bg-white">
      <button className="z-10" aria-label="메뉴 열기">
        <Image src="/icons/menu.png" alt="메뉴" width={24} height={24} />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" aria-label="홈으로 이동">
          <Image src="/logo.png" alt="축제 로고" width={75} height={24} />
        </Link>
      </div>

      <div className="ml-auto">
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
  );
}
