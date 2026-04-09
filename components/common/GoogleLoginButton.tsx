"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function GoogleLoginButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/login")}
      className="w-full flex items-center justify-center border border-gray-200 rounded-[10px] shadow-[0_2px_3px_0_rgba(0,0,0,0.168),0_0_3px_0_rgba(0,0,0,0.084)]"
    >
      <Image src="/icons/google.png" alt="구글" width={24} height={24} />
      <span className="text-xl font-medium text-[#0000008A] p-[15px]">Google로 시작하기</span>
    </button>
  )
}