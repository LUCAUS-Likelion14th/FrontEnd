"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/login")}
      className="w-full h-13 flex items-center justify-center bg-white/10 rounded-[10px] gap-5 backdrop-blur-[2px] border border-white/30 shadow-lg transition-all active:scale-[0.98]"
    >
      <Image
        src="/icons/login/google-logo.png"
        alt="구글"
        width={24}
        height={24}
      />
      <span className="text-[20px] font-medium text-white">
        Google로 시작하기
      </span>
    </button>
  );
}
