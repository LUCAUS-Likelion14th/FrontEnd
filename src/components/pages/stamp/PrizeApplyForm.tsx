import { BackButton } from "@/components/common";
import { authFetcher } from "@/lib/api/fetcher";
import Image from "next/image";
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

  const progressPercentage = (stampCount / stampAll) * 100;

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
    <>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/stamp-bg.png"
          alt="도장판 인적사항 입력 배경 이미지"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="min-h-screen px-4 pt-5 pb-24">
        <div className="flex items-center justify-between mb-[53px]">
          <BackButton />

          <div className="bg-white border border-text-sub px-[14.5px] py-2.5 text-base text-primary font-medium rounded-lg">
            {name}
            <span className="text-[16px] font-medium text-text-sub2"> | </span>
            {studentId}
          </div>
        </div>

        <section className="flex-1 flex flex-col items-center justify-center">
          <div className="w-[245px] h-[175px] bg-gray-200 flex items-center justify-center text-center mb-[66px] rounded-lg text-sm text-gray-600">
            축기단 경품 안내 카드뉴스
            <br />
            이미지가 들어갈 자리입니다.
          </div>

          <div className="w-full relative mb-[91px]">
            <div className="w-full h-5 bg-text-sub2 rounded-[10px] overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-700"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div
              className="absolute top-0 -translate-x-1/2 -translate-y-1/4 flex flex-col items-center gap-[3px]"
              style={{ left: `${progressPercentage}%` }}
            >
              <Image src="/prize.png" alt="선물상자" width={62} height={62} />

              <div className="relative w-[62px] h-[42px] flex items-center justify-center">
                <Image src="/count-bubble.png" alt="도장 개수 말풍선" fill />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[16px] font-semibold">
                  {stampCount}개
                </span>
              </div>
            </div>
            <span className="absolute right-0 -bottom-8 text-text-sub text-[16px] font-medium">
              {stampAll}개
            </span>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-2 mb-10">
            <span className="text-[16px] font-[500]">
              STAFF에게 해당 화면을 보여 주세요!
            </span>

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
            className="bg-primary px-[33px] py-[15px] text-[20px] font-semibold text-white rounded-[30px]"
          >
            경품 응모하기
          </button>
        </section>
      </div>
    </>
  );
}
