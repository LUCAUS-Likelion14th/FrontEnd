import DetailHeader from "@/components/pages/detail/DetailHeader";
import { FiUsers } from "react-icons/fi";

const CREDITS = [
  { role: "PM", members: ["이름"] },
  { role: "디자이너", members: ["이름", "이름"] },
  { role: "프론트엔드", members: ["이름", "이름"] },
  { role: "백엔드", members: ["이름", "이름"] },
];

export default function CreditPage() {
  return (
    <main className="pb-25 overflow-hidden">
      <DetailHeader title="크레딧" />

      {/* 헤더 */}
      <div className="relative flex flex-col items-center py-12 gap-3 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EEF3FB] to-white" />
  
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(6,56,125,0.12)] z-10">
          <FiUsers size={22} className="text-primary" />
        </div>
        <p className="text-[24px] font-bold text-[#1A1A2E] tracking-tight z-10">LUCAUS 2026</p>
        <p className="text-[13px] text-text-sub z-10">함께 만든 사람들</p>
      </div>

      {/* 크레딧 목록 */}
      <div className="px-5 pt-8 flex flex-col gap-5 pb-10">
        {CREDITS.map(({ role, members }) => (
          <div
            key={role}
            className="rounded-[16px] border border-[#E8EEF8] bg-white shadow-[0_2px_12px_rgba(6,56,125,0.06)] px-5 py-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-[#EEF3FB] text-primary">
                {role}
              </span>
              <div className="flex gap-3 flex-wrap justify-end">
                {members.map((name, i) => (
                  <span key={i} className="text-[15px] font-semibold text-[#1A1A2E]">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 푸터 */}
      <div className="mx-5 rounded-[16px] bg-[#F7F9FF] px-5 py-5 flex flex-col items-center gap-1.5 mb-4">
        <p className="text-[13px] font-semibold text-primary">축기단 X LIKELION</p>
        <p className="text-[11px] text-text-sub text-center leading-5">
          LUCAUS는 중앙대학교 축제 공식 웹사이트로<br />학생들을 위해 제작되었습니다.
        </p>
        <p className="text-[11px] text-text-sub mt-1">© 2026 LUCAUS. All rights reserved.</p>
      </div>
    </main>
  );
}
