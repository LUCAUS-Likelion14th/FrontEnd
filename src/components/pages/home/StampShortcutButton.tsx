"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginBottomSheet } from '@/components'
import Image from "next/image";

export function StampShortcutButton() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const isLoggedIn = false; // TODO: auth store

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    router.push("/stamp");
  };

  return (
    <div
      className="flex items-end justify-between min-h-[106px] pl-[18px] pr-[14px] rounded-[10px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/stamp-short-btn-bg.png')" }}
    >
      <Image
        src={"/stamp-short-btn-img.png"}
        alt={"도장판 바로가기 버튼 선물 이미지"}
        width={133}
        height={133}
      />
      <div className="flex flex-col pt-[18px] pb-3 items-end gap-[9px]">
        <div className="flex flex-col pr-[9px] text-base font-medium text-white text-right leading-[1.3]">
          <span>도장판 완성하고</span>
          <span>푸짐한 경품 받아가세요!</span>
        </div>

        <button
          onClick={handleClick}
          className="flex gap-1.5 justify-center items-center pl-[16.5px] pr-[9.5px] py-[7.5px] rounded-[23px] bg-white/19 text-white text-[16px] font-semibold leading-4.5 border border-white/30 shadow-lg hover:active:scale-95 transition-all"
        >
          도장판 바로가기
          <FiChevronRight size={24} />
        </button>
      </div>

      <LoginBottomSheet
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  );
}
