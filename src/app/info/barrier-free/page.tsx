import DetailHeader from "@/components/pages/detail/DetailHeader";
import { FiAlertCircle } from "react-icons/fi";
import { MdAccessible, MdWheelchairPickup, MdElevator } from "react-icons/md";

const SECTIONS = [
  {
    icon: MdAccessible,
    title: "휠체어 접근 가능 구역",
    items: ["내용을 입력해주세요", "내용을 입력해주세요"],
  },
  {
    icon: MdWheelchairPickup,
    title: "휠체어 대여 안내",
    items: ["내용을 입력해주세요", "내용을 입력해주세요"],
  },
  {
    icon: MdElevator,
    title: "엘리베이터 및 편의시설",
    items: ["내용을 입력해주세요", "내용을 입력해주세요"],
  },
];

export default function BarrierFreePage() {
  return (
    <main className="pb-25">
      <DetailHeader title="배리어프리" />

      {/* 공지 배너 */}
      <div className="mx-4 mt-4 flex items-start gap-2.5 p-3.5 rounded-[10px] bg-[#FFFBF0] border border-[#FFD966]/50">
        <FiAlertCircle size={16} className="text-[#A07800] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#7A5C00] leading-5">
          장애인 및 거동이 불편한 분들을 위한 편의 안내입니다. 불편한 점이 있으시면 STAFF에게 문의해주세요.
        </p>
      </div>

      {/* 섹션 카드들 */}
      <div className="px-4 pt-5 flex flex-col gap-3">
        {SECTIONS.map(({ icon: Icon, title, items }) => (
          <div
            key={title}
            className="rounded-[14px] bg-white border border-[#E8EEF8] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#EEF3FB]">
              <Icon size={16} className="text-primary" />
              <span className="text-[13px] font-semibold text-primary">{title}</span>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-[14px] text-[#3B4A5A] leading-5">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
