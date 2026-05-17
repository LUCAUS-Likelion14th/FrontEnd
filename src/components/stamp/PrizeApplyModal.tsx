"use client";

import Image from "next/image";
import StampModalLayout from "./StampModalLayout";

interface PrizeApplyModalProps {
  onClose: () => void;
}

export default function PrizeApplyModal({ onClose }: PrizeApplyModalProps) {
  return (
    <StampModalLayout onClose={onClose}>
      <p className="text-[20px] font-semibold text-white text-center leading-relaxed mt-4">
        경품 응모가 완료되었습니다!
      </p>

      <div className="relative flex justify-center items-center min-h-[160px]">
        <Image
          src="/stamp-short-btn-img.png"
          alt="응모 완료 도장"
          width={170}
          height={170}
          className="object-contain"
        />
      </div>

      <div className="w-full flex flex-col items-center mt-auto">
        <button
          onClick={onClose}
          className="w-full max-w-[180px] py-3 text-[16px] font-bold text-white bg-blue-900/60 rounded-[30px] shadow-md active:scale-95 transition-transform"
        >
          완료
        </button>
      </div>
    </StampModalLayout>
  );
}
