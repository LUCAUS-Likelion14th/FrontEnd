"use client";

import { useState } from "react";
import DetailHeader from "@/components/pages/detail/DetailHeader";
import { FiChevronDown, FiAlertTriangle } from "react-icons/fi";
import { MdQrCode2, MdAccessTime, MdBadge, MdPeople, MdBlock, MdWarning, MdDoorFront, MdExitToApp, MdHelpOutline } from "react-icons/md";
import { IconType } from "react-icons";

const TICKETS = [
  { id: "A", time: "14:00 - 14:30" },
  { id: "B", time: "14:30 - 15:00" },
  { id: "C", time: "15:00 - 15:30" },
  { id: "D", time: "15:30 - 16:00" },
  { id: "E", time: "16:00 - 16:30" },
  { id: "F", time: "16:30 - 17:00" },
  { id: "G", time: "17:00 - 17:30" },
  { id: "H", time: "17:30 - 입장 마감" },
];

const TIMELINE = [
  { time: "13:00 이전", desc: "티켓 배부 세팅\n(리더기, 도장, 팔찌, 듀라테이블, 캐노피, 노트북 등)" },
  { time: "13:30", desc: "1대기구역 → A티켓 대기\n2대기구역 → B티켓 대기\n*티켓별 입장시간 30분 전부터 대기" },
  { time: "14:00", desc: "A티켓 대기 마감\n잔디광장 입장 시작" },
  { time: "14:30", desc: "A입장 완료 → B티켓 인원 1대기구역 이동\n입장번호 순서대로 잔디광장 입장\n2대기구역 C티켓 대기 시작" },
  { time: "15:00 ~", desc: "동일 방식 반복 (B→C→D→E→F→G→H)\nH티켓 17:30까지" },
];

const PROHIBITED = [
  { label: "우산" },
  { label: "유리병 등 위협 물품" },
  { label: "주류" },
  { label: "식음료", sub: "뚜껑 개폐 가능한 페트음료는 가능, 테이크아웃 잔 불가" },
  { label: "대포카메라·사다리·의자·셀카봉", sub: "타인의 진로·시야를 방해하는 물품", red: true },
];

const ENTRY_NOTES = [
  { text: "QR코드 / 신분증 / 학생증(e-ID) 3가지 모두 확인 후 도장 배부" },
  { text: "일자별로 도장 색과 일자가 다르니 확인 후 배부" },
  { text: "대리수령 불가" },
  { text: "훼손된 팔찌·도장은 재수령 불가" },
  { text: "미처 수거 못한 반입금지물품은 입장 시 수거" },
  { text: "입장 시작 이후 도착한 인원은 해당 줄 맨 마지막에서 입장" },
];

const AFTER_ENTRY = [
  { text: "일행과 같이 관람 시 무대 뒤쪽으로만 이동 가능 (앞쪽 이동 불가)" },
  { text: "화장실은 101관(영신관) 사용" },
  { text: "자리를 비울 경우 주변 분들께 양해 구하고 이동 (자리 보장 X)" },
  { text: "도장·팔찌 확인된 인원만 빼광 쪽 재입장ZONE으로 퇴장·재입장 가능" },
  { text: "스탠딩 전환 시 입장통제 (퇴장만 가능)" },
];

const EXIT_NOTES = [
  { text: "퇴장 진행 시 잔디광장 폐쇄", red: true },
  { text: "정문·R&D 및 빼광 인원 우선 퇴장 후 잔디광장 인원 퇴장" },
];

const FAQS = [
  { q: "대리 수령 가능한가요?", a: "불가능합니다." },
  { q: "도장·팔찌가 훼손/분실 됐는데 재수령 가능한가요?", a: "원칙적으로 불가능하나, 재입장을 진행하지 않았을 경우 가능합니다." },
  { q: "입장 시간이 지났는데 입장이 가능할까요?", a: "현재 입장하고 있는 줄 마지막에 서서 입장 가능합니다." },
  { q: "친구가 앞쪽에 있는데 앞쪽으로 가도 되나요?", a: "입장 번호대로 입장한 것이기에 앞으로 이동하는 것은 불가능합니다." },
  { q: "방금 들어온 사람이 저희보다 앞쪽으로 들어갔어요", a: "주변분들 티켓 확인 후 맨 뒤로 유도해주세요." },
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

function MapPlaceholder() {
  return (
    <div className="w-full h-40 rounded-[12px] bg-[#F2F4F6] flex items-center justify-center mb-4">
      <p className="text-[13px] text-[#8d97a7]">지도 이미지 추가 예정</p>
    </div>
  );
}

function NoteList({ items }: { items: { text: string; red?: boolean }[] }) {
  return (
    <ul className="flex flex-col gap-2.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className={`text-[11px] mt-0.5 shrink-0 ${item.red ? "text-[#C0392B]" : "text-primary"}`}>●</span>
          <span className={`text-[13px] leading-5 ${item.red ? "text-[#C0392B] font-medium" : "text-[#3B4A5A]"}`}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#F0F4FA] last:border-0">
      <button
        className="w-full flex items-center justify-between gap-2 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[13px] font-medium text-[#1a2840] leading-5">Q. {q}</span>
        <FiChevronDown
          size={15}
          className={`text-[#8d97a7] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-[13px] text-primary leading-5 pb-3 pl-1">A. {a}</p>
      )}
    </div>
  );
}

export default function RoutePage() {
  return (
    <main className="pb-25">
      <DetailHeader title="입장 정책" />

      {/* 상단 주의 배너 */}
      <div className="mx-4 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-[12px] bg-red-50 border border-red-200">
        <FiAlertTriangle size={15} className="text-[#C0392B] shrink-0" />
        <p className="text-[13px] text-[#C0392B] leading-5 font-medium">
          QR코드 · 신분증 · 학생증(e-ID) 미리 준비해주세요
        </p>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">

        {/* 1. 온라인 티켓팅 */}
        <Section title="온라인 티켓팅" icon={MdQrCode2}>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {TICKETS.map((t) => (
              <div key={t.id} className="flex items-center gap-2.5 bg-[#F5F8FF] rounded-[10px] px-3 py-2.5">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-[11px] font-bold shrink-0">
                  {t.id}
                </span>
                <span className="text-[12px] text-[#3B4A5A] font-medium">{t.time}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[#8d97a7] leading-5">
            * 8개 티켓 중 하나 선택 · 선착순 번호 부여 (ex. A-001~A-500)
          </p>
        </Section>

        {/* 2. 입장 대기 */}
        <Section title="입장 대기" icon={MdAccessTime}>
          <MapPlaceholder />
          <div className="flex flex-col">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center pt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {i !== TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-[#D1DDF0] my-1.5" />
                  )}
                </div>
                <div className="pb-4">
                  <span className="inline-block text-[12px] font-bold text-primary bg-primary/8 rounded-full px-2.5 py-0.5 mb-1">
                    {item.time}
                  </span>
                  {item.desc.split("\n").map((line, j) => (
                    <p key={j} className="text-[13px] text-[#3B4A5A] leading-5">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. 푸앙패스 */}
        <Section title="푸앙패스" icon={MdBadge}>
          <NoteList items={[
            { text: "대기열: 영신관 옆" },
            { text: "양일 약 50여명 · 신분증·학생증·e-ID 확인 후 배부" },
          ]} />
          <div className="mt-3 rounded-[10px] bg-red-50 border border-red-100 px-3 py-2.5 flex flex-col gap-1">
            <p className="text-[12px] text-[#C0392B] leading-5">* 별도의 QR코드가 없는 티켓</p>
            <p className="text-[12px] text-[#C0392B] leading-5">* 재입장 시 학적 확인 및 팔찌 훼손 여부 확인</p>
          </div>
        </Section>

        {/* 4. 줄관리 */}
        <Section title="줄관리" icon={MdPeople}>
          <MapPlaceholder />
          <NoteList items={[
            { text: "그림에 적힌 번호가 입장번호" },
            { text: "양쪽 펜스 번호에 맞춰 서서 대기" },
            { text: "입장번호대로 줄 설 수 있도록 안내" },
          ]} />
        </Section>

        {/* 5. 반입금지물품 */}
        <Section title="반입금지물품" icon={MdBlock}>
          <div className="flex flex-col gap-2.5 mt-2">
            {PROHIBITED.map((item, i) => (
              <div key={i} className={`flex items-start gap-2 rounded-[8px] px-3 py-2 ${item.red ? "bg-red-50" : "bg-[#F5F8FF]"}`}>
                <span className={`text-[12px] font-bold shrink-0 mt-0.5 ${item.red ? "text-[#C0392B]" : "text-primary"}`}>
                  {i + 1}
                </span>
                <div>
                  <p className={`text-[13px] font-medium ${item.red ? "text-[#C0392B]" : "text-[#1a2840]"}`}>{item.label}</p>
                  {item.sub && <p className="text-[12px] text-[#8d97a7] leading-5 mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. 입장 시 주의 */}
        <Section title="입장 시 주의사항" icon={MdWarning}>
          <NoteList items={ENTRY_NOTES} />
        </Section>

        {/* 7. 입장 이후 */}
        <Section title="입장 이후" icon={MdDoorFront}>
          <NoteList items={AFTER_ENTRY} />
        </Section>

        {/* 8. 퇴장 */}
        <Section title="퇴장" icon={MdExitToApp}>
          <MapPlaceholder />
          <NoteList items={EXIT_NOTES} />
        </Section>

        {/* 9. FAQ */}
        <Section title="FAQ" icon={MdHelpOutline}>
          <div className="pt-1">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </Section>

      </div>
    </main>
  );
}
