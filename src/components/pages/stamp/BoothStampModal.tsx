import { authFetcher } from "@/lib/api/fetcher";
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
    } catch (error: any) {
      console.warn("도장 찍기 에러: ", error);
      alert(error.message || "코드 번호가 틀렸거나 오류가 발생했습니다.");
      setPassword("");
    } finally {
      setIsLoading(false);
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
      <section className="relative w-full max-w-[365px] rounded-[20px] bg-[rgba(6,56,125,0.35)] p-8 pt-12 backdrop-blur-xs flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-4 text-white z-10"
        >
          X
        </button>

        {/* 1. 상단 타이틀 영역 */}
        <p className="text-[20px] font-semibold text-white text-center ">
          {boothId}번 부스<br /> &lsquo;{boothName}&rsquo; <br />
          {isSuccess ? "별빛을 밝혔어요!" : "별빛 밝히기!"}
        </p>

        {/* 2. 중앙 스탬프 연출 영역 (perspective-500 추가로 3D 입체감 확보) */}
        <div className="relative flex justify-center items-center w-40 h-40 perspective-500">
          
          {/* [변경] 꺼진 별 이미지: 성공 시 global.css에 적어둔 coin-out 애니메이션 실행 */}
          <Image
            src="/star-off.png"
            alt="도장 찍기 전"
            width={111}
            height={111}
            className={`absolute object-contain z-10 ${
              isSuccess 
                ? "animate-coin-out pointer-events-none" 
                : "opacity-100"
            }`}
          />

          {/* [변경] 켜진 별 이미지: 성공 시 동전처럼 스르륵 핑그르르 도는 coin-in 애니메이션 실행 */}
          <Image
            src="/star-on.png"
            alt="도장 찍기 성공"
            width={149}
            height={149}
            className={`absolute object-contain z-10 ${
              isSuccess 
                ? "animate-coin-in" 
                : "opacity-0 pointer-events-none"
            }`}
          />
        </div>

        {/* 3. 하단 UI 제어 영역 */}
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