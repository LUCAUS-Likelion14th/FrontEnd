"use client";

import { BackButton } from "@/components/ui";
import { authFetcher } from "@/api/fetcher";
import Image from "next/image";
import { lucausText } from "@/assets/webp";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();

  const progressPercentage = stampAll > 0 ? (stampCount / stampAll) * 100 : 0;

  const handlePrizeApply = async () => {
    if (!password) {
      alert("코드를 입력해 주세요.");
      return;
    }
    setIsLoading(true);
    try {
      await authFetcher("/stamp/prize", "PATCH", { password });
      alert("경품 응모가 완료되었습니다!");
      router.push("/stamp");
    } catch (error: any) {
      if (error.message.includes("409")) {
        alert("이미 응모하셨습니다! 결과 발표를 기다려주세요.");
      } else {
        alert(error.message || "응모 코드가 틀렸거나 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="코드를 입력해 주세요"
              className="w-full bg-white border border-text-sub2 rounded-[10px] py-[13px] text-[16px] font-normal text-center outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handlePrizeApply}
            disabled={isLoading}
            className="bg-primary px-[33px] py-[15px] text-[18px] font-semibold text-white rounded-[30px] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            푸앙패스 응모하기
          </button>
        </section>
      </div>{" "}
    </div>
  );
}
