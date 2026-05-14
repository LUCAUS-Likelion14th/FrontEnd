"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import creditBg from "@/assets/webp/credit-bg.webp";
import likelionLogo from "@/assets/webp/likelion-logo.webp";

const CREDITS = [
  { role: "PM", members: ["조윤빈"] },
  { role: "DESIGN", members: ["서예진"] },
  { role: "FRONTEND", members: ["강지혜", "김유겸", "이은지"] },
  { role: "BACKEND", members: ["김윤형", "이채연", "최서영"] },
  { role: "Special Thanks to", members: ["윤리현 정건 총학인원들누구누구.."] },
];

export default function CreditPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden pb-20">
      <Image
        src={creditBg}
        alt=""
        fill
        className="object-cover"
        priority
      />

      <button
        onClick={() => router.back()}
        className="absolute left-4 top-7 z-10"
      >
        <FiChevronLeft size={24} className="text-white" />
      </button>

      <div className="relative z-10 flex flex-col items-center pt-[54px]">
        <Image
          src={likelionLogo}
          alt="LIKELION"
          width={49}
          height={27}
        />

        <p className="text-white text-[16px] font-semibold mt-3">
          멋쟁이사자처럼 중앙대학교 14th
        </p>

        <div className="w-[330px] h-px bg-white/20 mt-6 mb-12" />

        <div className="flex flex-col items-center gap-[40px] w-full">
          {CREDITS.map(({ role, members }) => (
            <div key={role} className="flex flex-col items-center gap-5 text-center">
              <p className="text-[#8d97a7] text-[16px] leading-normal">{role}</p>
              <p className="text-white text-[16px] font-semibold leading-normal">
                {members.join(" ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
