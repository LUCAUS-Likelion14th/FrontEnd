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
    <div className="fixed inset-0 z-[100] flex bg-black/82">
      <button onClick={onClose} className="text-white">
        X
      </button>

      <section className="relative w-full flex flex-col justify-center items-center">
        <p className="text-[24px] font-semibold text-white text-center">
          {boothId}번 부스 &lsquo;{boothName}&rsquo; <br /> 도장을 꾸욱!
        </p>

        <span className="text-[16px] font-medium text-white">
          STAFF에게 해당 화면을 보여주세요!
        </span>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="코드를 입력해 주세요"
          className="bg-white text-[16px] font-medium text-text-sub text-center px-[77px] py-[13px] rounded-[10px]"
        ></input>

        <button
          onClick={handleStampSubmit}
          className="bg-primary px-10.5 py-3 text-[16px] font-semibold text-white rounded-[30px]"
        >
          도장 찍기
        </button>
      </section>
    </div>
  );
}
