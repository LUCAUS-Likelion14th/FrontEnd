"use client";

import { MdInfoOutline } from "react-icons/md";
import { isEventEnded } from "@/utils/eventPeriod";

export default function OperationEndedBanner() {
  if (!isEventEnded()) return null;

  return (
    <div className="flex items-center gap-2 w-full px-4 py-2.5 bg-primary-light text-primary text-[13px] font-medium">
      <MdInfoOutline size={18} className="shrink-0" />
      <span>2026 LUCAUS 운영기간이 종료되었습니다. 지금 보이는 정보는 실제 운영 데이터가 아닌 예시 데이터예요.</span>
    </div>
  );
}
