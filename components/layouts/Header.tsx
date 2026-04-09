"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center h-14 px-4 bg-white z-20">
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
