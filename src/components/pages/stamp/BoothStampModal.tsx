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

  const handleStampSubmit = async () => {
    if (!password) {
      alert("코드를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      await authFetcher(`/stamp/${boothId}`, "POST", { password });

      setIsSuccess(true);
    } catch (error: any) {
      console.error("도장 찍기 에러: ", error);
      alert(error.message || "코드 번호가 틀렸거나 오류가 발생했습니다.");
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
    <div className="fixed fixed top-0 left-0 right-0 bottom-0 z-15 flex bg-black/82">
      <button
        onClick={onClose}
        className="absolute top-21 right-4 text-white z-10"
      >
        X
      </button>

      <section className="relative w-full flex flex-col justify-center items-center">
        {isSuccess ? (
          <>
            <p className="text-[24px] font-semibold text-white text-center mb-9.5">
              {boothId}번 부스 &lsquo;{boothName}&rsquo; <br /> 도장을 찍었어요!
            </p>

            <div className="relative mb-[57px] flex justify-center items-center w-30 h-30">
              <div className="stamp-burst">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`stamp-line line-${i}`} />
                ))}
              </div>

              <Image
                src="/stamp-success.png"
                alt="도장 찍기 성공"
                width={111}
                height={111}
                className="object-contain animate-stamp z-10"
              />
            </div>

            <button
              onClick={handleFinalClose}
              className="px-[58px] py-3 text-[16px] font-semibold text-white rounded-[30px] transition-all active:scale-[0.98]"
              style={{
                background: "rgba(6, 56, 125, 0.50)",
                boxShadow: "0 0 10px 0 rgba(135, 185, 255, 0.40)",
              }}
            >
              완료
            </button>
          </>
        ) : (
          <>
            <p className="text-[24px] font-semibold text-white text-center mb-[67px]">
              {boothId}번 부스 &lsquo;{boothName}&rsquo; <br /> 도장을 꾸욱!
            </p>

            <div className="flex flex-col justify-center items-center gap-2 mb-[67px]">
              <span className="text-[16px] font-medium text-white">
                STAFF에게 해당 화면을 보여주세요!
              </span>

              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStampSubmit()}
                placeholder="코드를 입력해 주세요"
                className="bg-white text-[16px] font-medium text-center px-[77px] py-[13px] rounded-[10px] outline-none focus:border-primary"
              />
            </div>

            <button
              onClick={handleStampSubmit}
              className="px-10.5 py-3 text-[16px] font-semibold text-white rounded-[30px] transition-all active:scale-[0.98]"
              style={{
                background: "rgba(6, 56, 125, 0.50)",
                boxShadow: "0 0 10px 0 rgba(135, 185, 255, 0.40)",
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
