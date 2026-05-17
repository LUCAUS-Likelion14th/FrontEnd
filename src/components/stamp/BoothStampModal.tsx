"use client";

import { authFetcher } from "@/api/fetcher";
import Image from "next/image";
import { useState } from "react";
import StampModalLayout from "./StampModalLayout";

interface BoothStampModalProps {
  boothId: number;
  boothName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BoothStampModal({
  boothId,
  boothName,
  onClose,
  onSuccess,
}: BoothStampModalProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleStampSubmit = async () => {
    if (!password) {
      setErrorMsg("코드를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");

    try {
      await authFetcher(`/stamp/${boothId}`, "POST", { password });
      setIsSuccess(true);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([80, 50, 120]);
      }
    } catch (error: any) {
      alert(error.message || "코드 번호가 틀렸거나 오류가 발생했습니다.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalClose = () => {
    onClose();
    setTimeout(() => onSuccess(), 100);
  };

  return (
    <StampModalLayout onClose={isSuccess ? handleFinalClose : onClose}>
      <p className="text-[20px] font-semibold text-white text-center leading-relaxed mb-4">
        {boothName}
        <br />
        <span className="text-secondary-light">
          {isSuccess ? "별빛을 밝혔어요!" : "별빛 밝히기!"}
        </span>
      </p>

      <div className="relative flex justify-center items-center min-h-[150px] mb-4">
        <Image
          src={isSuccess ? "/star-on.png" : "/star-off.png"}
          alt="스탬프 상태"
          width={isSuccess ? 149 : 111}
          height={isSuccess ? 149 : 111}
          className="object-contain animate-fade-in"
        />
      </div>

      <div className="w-full flex flex-col items-center gap-5 mt-auto">
        {!isSuccess ? (
          <>
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="text-[14px] font-medium text-white/80">
                STAFF에게 해당 화면을 보여주세요!
              </span>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleStampSubmit()}
                placeholder="코드를 입력해 주세요"
                disabled={isLoading}
                className={`w-full max-w-[240px] bg-white/20 text-[14px] text-white font-medium text-center py-3 rounded-[10px] outline-none border ${
                  errorMsg ? "border-red-400" : "border-white/10"
                }`}
              />
              {errorMsg && (
                <span className="text-red-400 text-[12px]">{errorMsg}</span>
              )}
            </div>

            <button
              onClick={handleStampSubmit}
              disabled={isLoading}
              className="w-full max-w-[180px] py-3 text-[16px] font-bold text-white bg-blue-700/60 rounded-[30px] shadow-md active:scale-95 transition-transform"
            >
              도장 찍기
            </button>
          </>
        ) : (
          <button
            onClick={handleFinalClose}
            className="w-full max-w-[180px] py-3 text-[16px] font-bold text-white bg-blue-900/60 rounded-[30px] shadow-md active:scale-95 transition-transform"
          >
            완료
          </button>
        )}
      </div>
    </StampModalLayout>
  );
}
