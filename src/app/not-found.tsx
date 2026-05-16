import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-4">
      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
        <FiSearch size={28} className="text-primary" />
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-semibold text-title">
          페이지를 찾을 수 없어요
        </p>
        <p className="text-[13px] text-text-sub">
          주소가 잘못되었거나 삭제된 페이지예요
        </p>
      </div>

      <Link
        href="/"
        className="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-semibold active:scale-95 transition-transform"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
