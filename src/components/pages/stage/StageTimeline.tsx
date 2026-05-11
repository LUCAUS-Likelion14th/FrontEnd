"use client";

import { useEffect, useRef } from "react";
import { TimeTable } from "@/types/stage";
import TimelineCard from "./TimelineCard";
import { formatDate } from "@/lib/utils/date";

type StageTimelineProps = {
  data: TimeTable[];
  activeId?: number;
};

export default function StageTimeline({ data, activeId }: StageTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !activeRef.current) return;
    const container = containerRef.current;
    const activeEl = activeRef.current;
    const offset = activeEl.offsetTop - container.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;
    container.scrollTo({ top: offset, behavior: "smooth" });
  }, [activeId, data]);

  return (
    <div ref={containerRef} className="flex flex-col max-h-101 border border-text-sub2 rounded-[10px] px-3 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {data.map((item, index) => {
        const isActive = item.stage_id === activeId;
        const isFirst = index === 0;
        const isLast = index === data.length - 1;

        return (
          <div
            key={item.stage_id}
            ref={isActive ? activeRef : null}
            className="grid w-full min-h-30"
            style={{ gridTemplateColumns: "6.5rem 2rem 1fr" }}
          >
            {/* [1] 시간 영역 */}
            <div
              className={`mt-5.25 text-[14px] leading-none whitespace-nowrap ${
                isActive ? "text-primary font-semibold" : "text-text-sub"
              }`}
            >
              {formatDate(item.start_at, "time")} -{" "}
              {formatDate(item.end_at, "time")}
            </div>

            {/* [2] 타임라인 축 (원 + 선) — grid 아이템이라 h-full이 definite */}
            <div className="relative flex flex-col items-center h-full">
              {/* 위쪽 선: top-0 → 원 상단 6px 전 (원과 닿지 않게) */}
              {!isFirst && (
                <div
                  className="absolute top-0 w-px bg-text-sub"
                  style={{ height: "14px" }}
                />
              )}

              {/* 아래쪽 선: 원 하단 6px 아래부터 → bottom-0 */}
              {!isLast && (
                <div
                  className="absolute bottom-0 w-px bg-text-sub"
                  style={{ top: isActive ? "46px" : "34px" }}
                />
              )}

              {/* 원: mt-5(20px) + 반지름(4px/10px) = 중심이 24px/30px */}
              <div className="mt-5 relative z-10">
                {isActive ? (
                  <div className="relative flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-primary bg-white" />
                    <div className="absolute w-3 h-3 rounded-full bg-primary" />
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white border border-text-sub" />
                )}
              </div>
            </div>

            {/* [3] 카드 영역 */}
            <div className="py-3.5 pl-1">
              <TimelineCard
                id={item.stage_id}
                image={item.logo_image}
                category={item.category}
                artist={item.performer}
                isActive={isActive}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
