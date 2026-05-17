"use client";

import { BackButton } from "@/components/ui";
import { authFetcher } from "@/api/fetcher";
import Image from "next/image";
import { lucausText, whiteLogo } from "@/assets/webp";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PrizeEntryFormProps {
  name: string;
  studentId: string;
  stampCount: number;
  stampAll: number;
}

export default function PrizeApplyForm({
  name,
  studentId,
  stampCount,
  stampAll,
}: PrizeEntryFormProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => router.push("/stamp"), 2800);
    return () => clearTimeout(timer);
  }, [isSuccess, router]);

  const progressPercentage = stampAll > 0 ? (stampCount / stampAll) * 100 : 0;

  const handlePrizeApply = async () => {
    if (!password) {
      setErrorMsg("코드를 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      await authFetcher("/stamp/prize", "PATCH", { password });
      setIsSuccess(true);
    } catch (error: any) {
      console.warn("경품 응모 에러 상세 정보:", error);

      const errorText = error.message || "";

      if (
        errorText.includes("이미 응모") ||
        errorText.includes("409") ||
        errorText.includes("Conflict")
      ) {
        setErrorMsg("한 계정당 한 번만 응모할 수 있어요.");
      } else {
        setErrorMsg("잘못된 코드입니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const DOTS = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * 360 + i * 4;
    const dist = 90 + (i % 4) * 45;
    return {
      id: i,
      x: Math.cos((angle * Math.PI) / 180) * dist,
      y: Math.sin((angle * Math.PI) / 180) * dist,
      size: 4 + (i % 4) * 3,
      delay: i * 0.035,
    };
  });

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/stamp-bg.png"
          alt="도장판 배경 이미지"
          fill
          priority
          className="object-cover object-top"
        />
      </div>
      <div className="relative z-10 w-full h-full px-4 pt-5 pb-24 flex flex-col">
        <div className="flex items-center justify-between mb-[53px]">
          <BackButton />

          <div className="bg-white border border-text-sub px-[14.5px] py-2.5 text-base text-primary font-medium rounded-lg">
            {name}
            <span className="text-[16px] font-medium text-text-sub2"> | </span>
            {studentId}
          </div>
        </div>

        <section className="flex-1 flex flex-col items-center gap-11">
          <div className="w-full flex flex-col items-center gap-3 py-4">
            <Image
              src={lucausText}
              alt="LUCAUS 로고"
              width={160}
              height={52}
              className="object-contain"
            />
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-white" />
              <span className="text-white text-xs">✦</span>
              <div className="flex-1 h-px bg-white" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-[18px] font-semibold text-title">
                DAY1, DAY2 입장티켓 추첨
              </p>
              <p className="text-[13px] text-text-sub leading-5">
                당첨된 분께는 5월 21일 오전에 문자 발송 예정입니다.
              </p>
            </div>
          </div>

          <div className="w-full relative px-3.5 mt-8 mb-10">
            <div className="w-full h-5 bg-text-sub2 rounded-[10px] overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-700"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div
              className="absolute -top-2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              style={{
                left: `clamp(35px, ${progressPercentage}%, calc(100% - 20px))`,
              }}
            >
              <div className="relative z-10 mb-2">
                <div className="bg-primary text-white px-3 py-1 rounded-lg text-[16px] font-semibold flex items-center justify-center shadow-md whitespace-nowrap">
                  {stampCount === stampAll ? "완성!" : `${stampCount}개`}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#06387D]" />
              </div>
              <Image
                src="/star-on.png"
                alt="별"
                width={70}
                height={70}
                className="-mt-2 relative z-0"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <p className="text-[14px] font-semibold text-title text-center">
              STAFF에게 해당 화면을 보여 주세요!
            </p>

            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handlePrizeApply()}
              placeholder="코드를 입력해 주세요"
              className={`w-full bg-white border rounded-[10px] py-[13px] text-[16px] font-normal text-center outline-none transition-all ${
                errorMsg
                  ? "border-red-500 focus:border-red-500"
                  : "border-text-sub2 focus:border-primary"
              }`}
            />

            {errorMsg && (
              <p className="text-red-500 text-[14px] font-medium text-center mt-1 animate-fade-in">
                {errorMsg}
              </p>
            )}
          </div>

          <button
            onClick={handlePrizeApply}
            disabled={isLoading}
            className="bg-primary px-[33px] py-[15px] text-[18px] font-semibold text-white rounded-[30px] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            추첨권 응모하기
          </button>
        </section>
      </div>

      {/* 임시 테스트 버튼 */}
      <button
        onClick={() => setIsSuccess(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/60 text-white text-xs px-3 py-2 rounded-full"
      >
        테스트
      </button>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            key="celebration"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* 배경 */}
            <div className="absolute inset-0 z-0">
              <Image src="/stamp-bg.png" alt="" fill priority className="object-cover object-top" />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* 로고 + 파티클 */}
            <div className="relative z-10 flex items-center justify-center" style={{ width: 320, height: 320 }}>
              {/* ripple 링 */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{ border: "1.5px solid rgba(180,210,255,0.5)", width: 140, height: 140 }}
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 1.6, delay: i * 0.28, ease: "easeOut" }}
                />
              ))}

              {/* 빛나는 파티클 도트 */}
              {DOTS.map((d) => (
                <motion.div
                  key={d.id}
                  className="absolute rounded-full"
                  style={{
                    width: d.size,
                    height: d.size,
                    background: "radial-gradient(circle, #e8f0ff 0%, #a8c4ff 60%, transparent 100%)",
                    boxShadow: `0 0 ${d.size * 2.5}px rgba(160,200,255,0.9)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x: d.x, y: d.y, opacity: [0, 1, 0.9, 0], scale: [0, 1.4, 1, 0.2] }}
                  transition={{ duration: 1.8, delay: d.delay, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}

              {/* 로고 */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.25, 1], opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ filter: "drop-shadow(0 0 24px rgba(140,190,255,0.8))" }}
              >
                <Image src={whiteLogo} alt="LUCAUS" width={120} height={120} className="object-contain" />
              </motion.div>
            </div>

            {/* 텍스트 */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-white/80 text-[20px] font-medium tracking-wide text-center">
                응모가 완료되었습니다!
              </p>
              <p className="text-white/45 text-[13px] font-normal">잠시 후 이동합니다</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
