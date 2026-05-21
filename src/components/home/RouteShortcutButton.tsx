"use client";

import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { trackEvent } from "@/lib/api/analytics";
import Image from "next/image";

export function RouteShortcutButton() {
  const router = useRouter();

  const handleClick = () => {
    trackEvent({
      // 백 로그
      eventType: "stamp_list_click",
      targetType: "STAMP",
      payload: { referral: "home" },
    }); // 백 로그 끝
    router.push("/info/route");
  };

  return (
    <div
      className="relative flex flex-col items-end justify-end min-h-[106px] pl-[18px] pr-[14px] rounded-[10px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/route-shortcut-bg.png')" }}
    >
      <div className="absolute left-8 bottom-[-4px] w-[102px] h-[102px]">
        <Image
          src="/route-shortcut-img.png"
          alt="입장정책 무대 이미지"
          fill
          className="object-contain mix-blend-overlay"
        />
      </div>

      <div className="flex flex-col pt-[18px] pb-3 items-end gap-[9px]">
        <div className="flex flex-col pr-[9px] text-base font-medium text-white text-right leading-[1.3]">
          <span>복잡한 공연 입장,</span>
          <span>한눈에 확인하세요!</span>
        </div>

        <button
          onClick={handleClick}
          className="flex gap-1.5 justify-center items-center pl-[16.5px] pr-[7.5px] py-[3.5px] rounded-[23px] bg-white/19 text-white text-[16px] font-semibold leading-4.5 border border-white/30 shadow-lg active:scale-95 transition-all"
        >
          입장정책 바로가기
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
