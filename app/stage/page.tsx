"use client";

import Category from "@/components/stage/Category";
import StageEventSection from "@/components/stage/StageEventSection";
import ArtistSection from "@/components/stage/ArtistSection";
import StageTimeline from "@/components/stage/StageTimeline";
import { STAGE_DATA } from "@/data/stageData";
import { useEffect, useState } from "react";
import { STAGE_EVENT_DATA } from "@/data/stageEventData";

type CategoryType = "학생 공연" | "청룡가요제" | "아티스트 공연" | "무대기획전";

const CATEGORY: CategoryType[] = [
  "학생 공연",
  "청룡가요제",
  "아티스트 공연",
  "무대기획전",
];

const CATEGORY_INFO: Record<
  CategoryType,
  { title: string; description: string }
> = {
  "학생 공연": {
    title: "학생 공연 라인업",
    description: "학생들이 직접 만드는 공연 어쩌구 저쩌구",
  },
  청룡가요제: {
    title: "청룡가요제",
    description: "숨겨진 노래 고수들을 만나요~!",
  },
  "아티스트 공연": {
    title: "아티스트 공연",
    description: "아티스트 공연 어쩌구 저쩌구",
  },
  무대기획전: {
    title: "무대기획전",
    description: "무대기획전 어쩌구 저쩌구",
  },
};

export default function StagePage() {
  const [selectedDate, setSelectedDate] = useState("2026-05-21");
  const [selected, setSelected] = useState<CategoryType>("학생 공연");
  const [currentTime, setCurrentTime] = useState(new Date());

  const filteredData = STAGE_DATA.filter((item) => {
    const itemDate = item.start.split("T")[0];
    return item.category === selected && itemDate === selectedDate;
  });

  const currentCategory = CATEGORY_INFO[selected];

  const activeId = filteredData.find((item) => {
    const start = new Date(item.start);
    const end = new Date(item.end);

    // 타임라인 활성화 테스트용
    const nowTime = currentTime.getHours() * 60 + currentTime.getMinutes();
    const startTime = start.getHours() * 60 + start.getMinutes();
    const endTime = end.getHours() * 60 + end.getMinutes();

    return nowTime >= startTime && nowTime < endTime;
    // return currentTime >= start && currentTime < end;
  })?.id;

  useEffect(() => {
    const now = new Date();
    const times = filteredData.flatMap((item) => [
      new Date(item.start),
      new Date(item.end),
    ]);

    const futureTimes = times.filter((time) => time > now);
    if (futureTimes.length === 0) return;

    const nextTime = new Date(Math.min(...futureTimes.map((t) => t.getTime())));

    const timeout = setTimeout(() => {
      setCurrentTime(new Date());
    }, nextTime.getTime() - now.getTime());

    return () => clearTimeout(timeout);
  }, [selected, filteredData]);

  return (
    <main className="px-4">
      <h1 className="text-[24px] font-semibold mb-3">공연 정보</h1>

      {/* 날짜 & 공연 카테고리 설정 */}
      <section className="mb-12">
        <Category
          categories={CATEGORY}
          selected={selected}
          onSelect={setSelected}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </section>

      {/* 아티스트 버튼 or 무대기획전 */}
      <section className="mb-17">
        <div className="flex flex-col gap-0.5 mb-4">
          <h2 className="text-[24px] font-semibold">{currentCategory.title}</h2>
          <p className="text-base font-normal text-text-sub">
            {currentCategory.description}
          </p>
        </div>

        {selected === "무대기획전" ? (
          <div>
            {STAGE_EVENT_DATA.map((item) => (
              <StageEventSection key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <ArtistSection data={filteredData} />
        )}
      </section>

      {/* 타임라인 */}
      <section className="flex flex-col gap-4 mb-3">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-semibold">본무대 타임라인</h2>
          <button className="px-[37.5px] py-2.5 bg-[#05F] text-base leading-4.5 text-white rounded-lg">
            본무대 FAQ
          </button>
        </div>

        <div>
          <StageTimeline data={filteredData} activeId={activeId} />
        </div>
      </section>

      <small className="block text-xs font-light text-center">
        *주최 측의 사정에 따라 일정이 변경될 수 있습니다
      </small>
    </main>
  );
}
