"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/login")}
      className="w-full flex items-center justify-center bg-white/20 rounded-[10px] gap-5"
    >
      <Image
        src="/icons/login/google-logo.png"
        alt="구글"
        width={24}
        height={24}
      />
      <span className="text-[20px] font-medium text-white py-3.5">
        Google로 시작하기
      </span>
    </button>
  );
}
