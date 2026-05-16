"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import likelionLogo from "@/assets/webp/likelion-logo.webp";

const CREDITS = [
  { role: "PM", members: ["조윤빈"] },
  { role: "DESIGN", members: ["서예진"] },
  { role: "FRONTEND", members: ["강지혜", "김유겸", "이은지"] },
  { role: "BACKEND", members: ["김윤형", "이채연", "최서영"] },
  {
    role: "Special Thanks to",
    members: ["2026 LUCAUS 축제기획단", "멋쟁이사자처럼 중앙대학교 14기 운영진"],
  },
];

export default function CreditPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden">
      <Image
        src="/stamp-bg.png"
        alt=""
        fill
        className="object-cover object-top"
        priority
      />

      <div className="relative z-10 flex flex-col items-center pt-12 pb-12">
        <div className="flex flex-col items-center gap-2 mb-12">
          <Image src={likelionLogo} alt="LIKELION" width={49} height={27} />
          <p className="text-[#273850] text-[16px] font-semibold mt-1">
            멋쟁이사자처럼 중앙대학교 14th
          </p>
        </div>

        <div className="w-[330px] h-px bg-[#273850]/20 mb-10" />

        <div className="flex flex-col items-center gap-10">
          {CREDITS.map(({ role, members }) => (
            <div key={role} className="flex flex-col items-center gap-2.5">
              <span className="text-text-sub text-[16px]">{role}</span>
              {role === "Special Thanks to" ? (
                <div className="flex flex-col items-center gap-1">
                  {members.map((member) => (
                    <span key={member} className="text-[#273850] text-[16px] font-semibold text-center">
                      {member}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-[#273850] text-[16px] font-semibold text-center">
                  {members.join("  ")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
