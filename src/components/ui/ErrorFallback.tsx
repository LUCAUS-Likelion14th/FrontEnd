"use client";

import { FiAlertCircle } from "react-icons/fi";

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  onReset: () => void;
}

export default function ErrorFallback({
  title = "데이터를 불러올 수 없어요",
  description = "잠시 후 다시 시도해주세요",
  onReset,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-5 px-4">
      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
        <FiAlertCircle size={28} className="text-primary" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-semibold text-title">{title}</p>
        <p className="text-[13px] text-text-sub">{description}</p>
      </div>
      <button
        onClick={onReset}
        className="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-semibold active:scale-95 transition-transform"
      >
        다시 시도
      </button>
    </div>
  );
}
