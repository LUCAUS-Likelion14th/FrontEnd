"use client";

import Image from "next/image";

interface StampModalLayoutProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function StampModalLayout({
  onClose,
  children,
}: StampModalLayoutProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <section className="relative w-full max-w-[340px] min-h-[445px] rounded-[20px] bg-[rgba(6,56,125,0.35)] p-6 pt-[50px] backdrop-blur-md flex flex-col items-center justify-between shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 z-10 flex items-center justify-center w-6 h-6"
          aria-label="닫기"
        >
          <Image
            src="/icons/hamburger-close.svg"
            alt="닫기"
            width={24}
            height={24}
            style={{ filter: "brightness(0) invert(1)" }}
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              if (t.parentElement) t.parentElement.textContent = "✕";
            }}
          />
        </button>

        <div className="w-full flex flex-col items-center flex-1 justify-between">
          {children}
        </div>
      </section>
    </div>
  );
}
