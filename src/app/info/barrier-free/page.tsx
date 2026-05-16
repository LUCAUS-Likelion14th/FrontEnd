"use client";

import { useState } from "react";
import Image from "next/image";
import barrierFreeMap from "@/assets/webp/map/barrier-free-map.webp";
import DetailHeader from "@/components/detail/DetailHeader";
import { FiAlertCircle, FiChevronDown } from "react-icons/fi";
import {
  MdAccessTime,
  MdPeople,
  MdAssignment,
  MdEventSeat,
  MdBlock,
  MdGavel,
  MdLocationOn,
} from "react-icons/md";
import { IconType } from "react-icons";

const ELIGIBILITY = [
  {
    label: "복지카드(장애인등록증) 또는 장애인증명서 제출이 가능한 자",
  },
  {
    label: "진단서 또는 소견서 제출이 가능한 자",
    sub: "아래 항목이 모두 명시되어야 합니다",
    details: [
      "병명 또는 증상 포함",
      "의료기관 직인 포함",
      "치료기간에 2026년 5월 21일, 5월 22일 포함",
      "치료 내용 또는 향후 치료 계획에 대한 소견 포함",
      "2026년 3월 1일 이후 발급 일자 포함",
    ],
  },
];

const ON_SITE_NOTES = [
  { text: "배리어프리존은 한정된 좌석으로 운영되며 사전 신청자 중 조건에 부합하는 증빙 서류를 제출한 분들에 한해 선착순으로 배정됩니다." },
  { text: "선착순 배정은 유효한 증빙 서류의 최종 제출 시점을 기준으로 합니다. 서류가 조건에 부합하지 않을 경우 보완 후 재제출을 요청드릴 수 있습니다." },
  { text: "사전 신청 이후 잔여 좌석이 있을 경우에만 현장 접수가 진행되며 현장 접수 여부는 본무대 당일(21일, 22일) 총학생회 인스타그램 스토리를 통해 안내됩니다." },
];

const COMPANION_NOTES = [
  { text: "현장에는 배리어프리존 담당 스태프가 상시 대기하고 있으나, 동반자 없이 혼자 입장하시거나 이용자 부주의로 인해 발생하는 모든 문제는 이용자 본인에게 책임이 있습니다." },
  { text: "안전을 위해 동반 1인의 입장을 권장하며, 동반 1인의 티켓도 함께 제공됩니다." },
  { text: "동반자는 본교 재학생이 아니어도 입장 가능합니다." },
];

const SEAT_NOTES = [
  { text: "배리어프리존은 한정된 좌석으로 운영되며 사전 신청자 중 조건에 부합하는 증빙 서류를 제출한 분들에 한해 선착순으로 배정됩니다." },
  { text: "선착순 배정은 유효한 증빙 서류의 최종 제출 시점을 기준으로 하며 제출된 서류가 조건에 부합하지 않을 경우, 보완 후 재제출을 요청드릴 수 있습니다." },
  { text: "남은 좌석이 있는 경우에 한해 현장 접수가 진행됩니다." },
  { text: "증빙서류 미제출 시 좌석 배정이 불가합니다.", red: true },
];

const ENTRY_RULES = [
  { text: "입장 마감 시간(17:30) 이후에는 중도 입장 및 퇴장이 불가하오니, 정해진 시간 내에 반드시 입장해 주세요.", red: true },
  { text: "화장실 이용 등 일시적 이동 시에는 안전상의 이유로 스태프가 동행할 수 있습니다." },
  { text: "배리어프리존 입장 후 일반 관람존으로의 이동은 불가하며, 적발 시 퇴장 조치될 수 있습니다.", red: true },
];

const VIEWING_RULES = [
  { text: "모두의 안전과 시야 확보를 위해 일어서는 행위는 금지되며, 반드시 자리에 앉아 관람해 주세요.", red: true },
  { text: "부당한 목적으로 이용하는 것으로 판단될 경우, 제재 또는 퇴장 등의 조치가 취해질 수 있습니다." },
  { text: "현장 상황에 따라 운영 내용은 일부 변경될 수 있습니다." },
];

const PROHIBITED: { label: string; sub?: string; red?: boolean }[] = [
  { label: "뚜껑이 없는 음료, 일반 식음료", sub: "뚜껑이 있는 음료나 텀블러는 허용" },
  { label: "모든 종류의 주류" },
  { label: "삼각대, 대포카메라 등 전문 촬영 장비" },
  { label: "유리병 등 위험 물품" },
  { label: "타인의 시야 또는 진로를 방해할 수 있는 물품" },
  { label: "기타 안전상의 문제가 발생할 수 있는 물품" },
];

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: IconType;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(6,56,125,0.08)] overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="w-8 h-8 rounded-[10px] bg-primary/8 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-primary" />
        </span>
        <span className="flex-1 text-left text-[15px] font-semibold text-[#1a2840]">{title}</span>
        <FiChevronDown
          size={17}
          className={`text-[#c0c8d4] transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[#F4F6FA]">
          {children}
        </div>
      )}
    </div>
  );
}

function NoteList({ items }: { items: { text: string; red?: boolean }[] }) {
  return (
    <ul className="flex flex-col gap-2.5 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className={`text-[11px] mt-0.5 shrink-0 ${item.red ? "text-[#C0392B]" : "text-primary"}`}>●</span>
          <span className={`text-[13px] leading-5 ${item.red ? "text-[#C0392B] font-medium" : "text-title"}`}>
            {item.text.includes('\n') ? (() => {
              const lines = item.text.split('\n');
              const colonIdx = lines[0].indexOf(': ');
              const prefix = colonIdx >= 0 ? lines[0].slice(0, colonIdx + 2) : '';
              return (
                <>
                  <span className="block">{lines[0]}</span>
                  {lines.slice(1).map((line, j) => (
                    <span key={j} className="block">
                      <span className="invisible">{prefix}</span>{line}
                    </span>
                  ))}
                </>
              );
            })() : item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function BarrierFreePage() {
  return (
    <main className="pb-25">
      <DetailHeader title="배리어프리" />

      {/* 상단 안내 배너 */}
      <div className="mx-4 mt-4 flex items-start gap-2.5 p-3.5 rounded-[12px] bg-[#FFFBF0] border border-[#FFD966]/50">
        <FiAlertCircle size={16} className="text-[#A07800] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#7A5C00] leading-5">
          장애인 및 거동이 불편한 분들을 위한 배리어프리존을 운영합니다. 불편한 점이 있으시면 담당 스태프에게 문의해 주세요.
        </p>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">

        {/* 1. 운영 안내 */}
        <Section title="위치 및 운영 안내" icon={MdAccessTime}>
          <div className="relative w-full rounded-[12px] overflow-hidden mt-3">
            <Image
              src={barrierFreeMap}
              alt="배리어프리존 위치 지도"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[13px] text-title leading-5 mt-3 mb-6">
            배리어프리존은 <span className="font-semibold text-primary">잔디광장 내 학생회관 측</span>에 위치합니다.
          </p>
          <div className="flex flex-col gap-2 mt-3">
            <div className="rounded-[10px] bg-[#F5F8FF] px-4 py-3 flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="text-[12px] font-bold text-primary shrink-0 mt-0.5">운영</span>
                <span className="text-[13px] text-title leading-5">5월 21일(목), 22일(금) 매일 16:30 ~ 본무대 종료시까지</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[12px] font-bold text-primary shrink-0 mt-0.5">입장</span>
                <span className="text-[13px] text-title leading-5">5월 21일(목), 22일(금) 매일 16:30 ~ 17:30</span>
              </div>
            </div>
            <div className="rounded-[10px] bg-red-50 border border-red-100 px-3 py-2.5">
              <p className="text-[12px] text-[#C0392B] leading-5 font-medium">* 입장 시간(17:30) 이후에는 입장이 불가합니다.</p>
              <p className="text-[12px] text-[#C0392B] leading-5 font-medium">* 현장 접수 일정: 5월 21일(목), 22일(금) / 매일 16:30 ~ 17:30</p>
            </div>
          </div>
        </Section>

        {/* 2. 신청 가능 대상 */}
        <Section title="신청 가능 대상" icon={MdAssignment}>
          <div className="mt-3">
            <p className="text-[13px] text-title leading-5 mb-3">
              다음 두 가지 유형 중 하나에 해당하는 <span className="font-semibold text-primary">중앙대학교 재학생 또는 휴학생</span>
            </p>
            <div className="flex flex-col gap-3">
              {ELIGIBILITY.map((item, i) => (
                <div key={i} className="rounded-[10px] bg-[#F5F8FF] px-3 py-3">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-[11px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-[13px] font-medium text-[#1a2840] leading-5">{item.label}</p>
                  </div>
                  {item.sub && (
                    <p className="text-[12px] text-text-sub mt-1.5 ml-7">{item.sub}</p>
                  )}
                  {item.details && (
                    <ul className="mt-2 ml-7 flex flex-col gap-1">
                      {item.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <span className="text-[10px] text-primary mt-1 shrink-0">▸</span>
                          <span className="text-[12px] text-title leading-5">{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 5. 좌석 배정 기준 */}
        <Section title="좌석 배정 기준" icon={MdEventSeat}>
          <NoteList items={SEAT_NOTES} />
        </Section>

        {/* 3. 현장 접수 안내 */}
        <Section title="현장 접수 안내" icon={MdPeople}>
          <NoteList items={ON_SITE_NOTES} />
        </Section>

        {/* 4. 동반자 포함 입장 안내 */}
        <Section title="동반자 포함 입장 안내" icon={MdPeople}>
          <NoteList items={COMPANION_NOTES} />
        </Section>

        {/* 7. 반입 금지 물품 */}
        <Section title="반입 금지 물품" icon={MdBlock}>
          <div className="flex flex-col gap-2.5 mt-3">
            {PROHIBITED.map((item, i) => (
              <div key={i} className={`flex items-start gap-2 rounded-[8px] px-3 py-2 ${item.red ? "bg-red-50" : "bg-[#F5F8FF]"}`}>
                <span className={`text-[12px] font-bold shrink-0 mt-0.5 ${item.red ? "text-[#C0392B]" : "text-primary"}`}>
                  {i + 1}
                </span>
                <div>
                  <p className={`text-[13px] font-medium ${item.red ? "text-[#C0392B]" : "text-[#1a2840]"}`}>{item.label}</p>
                  {item.sub && <p className="text-[12px] text-text-sub leading-5 mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-text-sub mt-3 leading-5">* 위반 시 입장이 제한될 수 있습니다.</p>
        </Section>

        {/* 6. 현장 이용 수칙 */}
        <Section title="현장 이용 수칙" icon={MdGavel}>
          <p className="text-[12px] font-semibold text-text-sub mt-3 mb-1">입장 및 이동</p>
          <NoteList items={ENTRY_RULES} />
          <p className="text-[12px] font-semibold text-text-sub mt-4 mb-1">관람 방식</p>
          <NoteList items={VIEWING_RULES} />
        </Section>

      </div>
    </main>
  );
}
