"use client";

import { authFetcher } from "@/api/fetcher";
import Image from "next/image";
import { useState } from "react";

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
      console.warn("도장 찍기 에러: ", error);
      alert(error.message || "코드 번호가 틀렸거나 오류가 발생했습니다.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAttempt = () => {
    if (isSuccess) {
      handleFinalClose();
    } else {
      onClose();
    }
  };

  const handleFinalClose = () => {
    onClose();
    setTimeout(() => {
      onSuccess();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-15 flex items-center justify-center bg-black/51">
      <section className="relative w-full max-w-[365px] min-h-[445px] rounded-[20px] bg-[rgba(6,56,125,0.35)] p-7.5 pt-[57px] backdrop-blur-xs flex flex-col items-center">
        <button
          onClick={handleCloseAttempt}
          className="absolute top-5 right-6 z-10 flex items-center justify-center"
          aria-label="닫기"
          style={{ width: "24px", height: "24px", flexShrink: 0 }}
        >
          <Image
            src="/icons/hamburger-close.svg"
            alt="닫기"
            width={24}
            height={24}
            style={{ filter: "brightness(0) invert(1)" }}
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              const p = t.parentElement;
              if (p) {
                p.textContent = "✕";
                (p as HTMLElement).style.color = "#fff";
                (p as HTMLElement).style.fontSize = "18px";
                (p as HTMLElement).style.fontWeight = "normal";
              }
            }}
          />
        </button>

        <p className="text-[20px] font-semibold text-white text-center mb-[22px]">
          {boothId}번 부스
          <br /> &lsquo;{boothName}&rsquo; <br />
          {isSuccess ? "별빛을 밝혔어요!" : "별빛 밝히기!"}
        </p>

        <div className="relative flex justify-center items-center perspective-500 mb-[35px]">
          <Image
            src="/star-off.png"
            alt="도장 찍기 전"
            width={111}
            height={111}
            className={`object-contain z-10 ${
              isSuccess
                ? "absolute animate-coin-out pointer-events-none"
                : "relative opacity-100"
            }`}
          />

          <Image
            src="/star-on.png"
            alt="도장 찍기 성공"
            width={149}
            height={149}
            className={`object-contain z-10 ${
              isSuccess
                ? "relative animate-coin-in my-3"
                : "absolute opacity-0 pointer-events-none"
            }`}
          />
        </div>

        {isSuccess ? (
          <button
            onClick={handleFinalClose}
            className="px-[58px] py-3 text-[16px] font-semibold text-white rounded-[30px] transition-all active:scale-[0.98]"
            style={{
              background: "rgba(6, 56, 125, 0.50)",
            }}
          >
            완료
          </button>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center gap-2 mb-[25px]">
              <span className="text-[16px] font-medium text-white">
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
                className={`bg-white/30 text-[14px] text-white font-medium text-center px-[33px] py-[13px] rounded-[10px] outline-none focus:border-primary placeholder:text-white ${
                  errorMsg ? "border-2 border-red-400" : ""
                }`}
              />
              {errorMsg && (
                <span className="text-red-400 text-[13px] font-medium mt-1">
                  {errorMsg}
                </span>
              )}
            </div>

            <button
              onClick={handleStampSubmit}
              disabled={isLoading}
              className="px-10.5 py-3 text-[16px] font-semibold text-white rounded-[30px] transition-all active:scale-[0.98]"
              style={{
                background: "rgba(6, 56, 125, 0.50)",
              }}
            >
              도장 찍기
            </button>
          </>
        )}
      </section>
    </div>
  );
}
