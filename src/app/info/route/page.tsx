import DetailHeader from "@/components/pages/detail/DetailHeader";
import { FiAlertCircle } from "react-icons/fi";
import { MdDirectionsWalk, MdBlock, MdCheckCircle } from "react-icons/md";

const RULES = [
  {
    type: "allowed",
    icon: MdCheckCircle,
    title: "통행 가능",
    items: ["내용을 입력해주세요", "내용을 입력해주세요"],
  },
  {
    type: "blocked",
    icon: MdBlock,
    title: "통행 제한",
    items: ["내용을 입력해주세요", "내용을 입력해주세요"],
  },
  {
    type: "info",
    icon: MdDirectionsWalk,
    title: "통행 안내",
    items: ["내용을 입력해주세요", "내용을 입력해주세요"],
  },
];

const COLOR_MAP = {
  allowed: { bg: "bg-[#EEF3FB]", text: "text-primary", dot: "bg-primary" },
  blocked: { bg: "bg-[#F2F4F6]", text: "text-[#4A5568]", dot: "bg-[#4A5568]" },
  info: { bg: "bg-[#FFFBF0]", text: "text-[#A07800]", dot: "bg-[#A07800]" },
};

export default function RoutePage() {
  return (
    <main className="pb-25">
      <DetailHeader title="통행 정책" />

      {/* 공지 배너 */}
      <div className="mx-4 mt-4 flex items-start gap-2.5 p-3.5 rounded-[10px] bg-[#FFF8E6] border border-[#FFD966]/50">
        <FiAlertCircle size={16} className="text-[#E8A000] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#8B6000] leading-5">
          축제 기간 중 일부 구역의 통행이 제한될 수 있습니다. 아래 내용을 확인해주세요.
        </p>
      </div>

      {/* 규칙 카드들 */}
      <div className="px-4 pt-5 flex flex-col gap-3">
        {RULES.map(({ type, icon: Icon, title, items }) => {
          const color = COLOR_MAP[type as keyof typeof COLOR_MAP];
          return (
            <div key={type} className="rounded-[14px] bg-white border border-[#E8EEF8] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className={`flex items-center gap-2 px-4 py-3 ${color.bg}`}>
                <Icon size={16} className={color.text} />
                <span className={`text-[13px] font-semibold ${color.text}`}>{title}</span>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${color.dot} mt-1.5 shrink-0`} />
                    <p className="text-[14px] text-[#3B4A5A] leading-5">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
