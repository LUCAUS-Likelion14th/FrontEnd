"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import likelionLogo from "@/assets/webp/likelion-logo.webp";

const CREDITS = [
  { role: "PM", members: ["조윤빈"] },
  { role: "DESIGN", members: ["서예진"] },
  { role: "FRONTEND", members: ["강지혜", "김유겸", "이은지"] },
  { role: "BACKEND", members: ["김윤형", "이채연", "최서영"] },
  { role: "축기단", members: ["이름", "이름", "이름"] },
  { role: "Special Thanks to", members: ["윤리현 정건 총학인원들누구누구.."] },
];

export default function CreditPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden flex flex-col justify-center">
      <Image
        src="/stamp-bg.png"
        alt=""
        fill
        className="object-cover object-top"
        priority
      />

      <button
        onClick={() => router.back()}
        className="absolute left-4 top-7 z-10"
      >
        <FiChevronLeft size={24} className="text-white" />
      </button>

      <div className="relative z-10 flex flex-col items-center px-8 py-12">
        <Image src={likelionLogo} alt="LIKELION" width={36} height={20} />
        <p className="text-[#273850] text-[13px] font-semibold mt-2 mb-8">멋쟁이사자처럼 중앙대학교 14th</p>

        <div className="w-full flex flex-col divide-y divide-white/10">
          {CREDITS.map(({ role, members }) => (
            <div key={role} className="flex items-center justify-between py-3">
              <span className="text-[#8d97a7] text-[11px] shrink-0 w-28">{role}</span>
              <span className="text-[#273850] text-[13px] font-semibold text-right">
                {members.join("  ")}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[#8d97a7] text-[11px] mt-8">© 2026 LUCAUS. All rights reserved.</p>
      </div>
    </div>
  );
}
