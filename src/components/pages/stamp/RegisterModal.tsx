import { BsExclamationCircle } from "react-icons/bs";

interface RegistrationModalProps {
  name: string;
  studentId: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function RegisterModal({
  name,
  studentId,
  onClose,
  onConfirm,
  isLoading,
}: RegistrationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col bg-white justify-center items-center px-3 py-5 gap-5 rounded-[10px]">
        <BsExclamationCircle size={65} className="text-primary" />

        <div className="flex flex-col text-center gap-1">
          <p className="text-[20px] font-semibold">
            이름과 학번을 다시 확인해 주세요!
          </p>
          <div className="text-[14px] font-normal text-text-sub">
            <span>
              해당 정보는 경품 추첨에 사용됩니다.
              <br />
              잘못 입력한 경우, 상품 수령에 불이익이 있을 수 있습니다.
            </span>
          </div>
        </div>

        <div>
          <p>이름: {name}</p>
          <p>학번: {studentId}</p>
        </div>

        <div className="flex justify-center items-center gap-5">
          <button
            onClick={onClose}
            className="bg-text-sub2 px-13 py-2.5 text-[16px] font-normal rounded-[10px]"
          >
            수정
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-primary text-white text-[16px] font-normal px-13 py-2.5 rounded-[10px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
