"use client";

import Image from "next/image";
import StampModalLayout from "./StampModalLayout";

interface PrizeApplyModalProps {
  onClose: () => void;
  status?: "success" | "already";
}

export default function PrizeApplyModal({
  onClose,
  status = "success",
}: PrizeApplyModalProps) {
  const isAlready = status === "already";

  return (
    <StampModalLayout onClose={onClose}>
      <div className="flex flex-col items-center justify-center flex-1">
        <p className="text-[20px] font-semibold text-white text-center leading-relaxed">
          {isAlready ? "이미 응모하셨습니다!" : "경품 응모가 완료되었습니다!"}
        </p>

        {!isAlready && (
          <div className="relative flex justify-center items-center min-h-[160px] mt-6">
            <Image
              src="/stamp-short-btn-img.png"
              alt="응모 완료 도장"
              width={150}
              height={150}
              className="object-contain animate-fade-in"
            />
          </div>
        )}
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
