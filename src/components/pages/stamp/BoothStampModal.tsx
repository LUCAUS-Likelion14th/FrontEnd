import { fetcher } from "@/lib/api/fetcher";
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

  const handleStampSubmit = async () => {
    if (!password) {
      alert("코드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await fetcher(`/stamp/${boothId}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          password: password,
        }),
      });

      alert("도장이 성공적으로 찍혔습니다.");
      onClose();

      setTimeout(() => {
        onSuccess();
      }, 100);
    } catch (error: any) {
      console.error("도장 찍기 에러: ", error);
      alert(error.message || "코드 번호가 틀렸거나 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed fixed top-0 left-0 right-0 bottom-0 z-15 flex bg-black/82">
      <button onClick={onClose} className="absolute top-21 right-4 text-white">
        X
      </button>

      <section className="relative w-full flex flex-col justify-center items-center gap-[67px]">
        <p className="text-[24px] font-semibold text-white text-center">
          {boothId}번 부스 &lsquo;{boothName}&rsquo; <br /> 도장을 꾸욱!
        </p>

        <div className="flex flex-col justify-center items-center gap-2 ">
          <span className="text-[16px] font-medium text-white">
            STAFF에게 해당 화면을 보여주세요!
          </span>

          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="코드를 입력해 주세요"
            className="bg-white text-[16px] font-medium text-center px-[77px] py-[13px] rounded-[10px]"
          ></input>
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
      </section>
    </div>
  );
}
