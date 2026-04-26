"use client";

import StageEventSection from "@/components/stage/StageEventSection";
import ArtistSection from "@/components/stage/ArtistSection";
import StageTimeline from "@/components/stage/StageTimeline";
import { useEffect, useMemo, useState } from "react";
import { STAGE_EVENT_DATA } from "@/data/stageEventData";
import { stageApi } from "@/lib/api/stageApi";
import { Stage, TimeTable } from "@/types/stage";
import StageCategory from "@/components/stage/StageCategory";

type CategoryType = "학생 공연" | "청룡가요제" | "아티스트 공연" | "무대기획전";

const CATEGORY: CategoryType[] = [
  "학생 공연",
  "청룡가요제",
  "아티스트 공연",
  "무대기획전",
];

const CATEGORY_MAP: Record<Exclude<CategoryType, "무대기획전">, string> = {
  "학생 공연": "STUDENT_PERFORMANCE",
  청룡가요제: "CHEONGRYONG_FESTIVAL",
  "아티스트 공연": "ARTIST_PERFORMANCE",
};

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

  const [stage, setStage] = useState<Stage[]>([]);
  const [timeTable, setTimeTable] = useState<TimeTable[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const timeLineData = await stageApi.getTimeTable(selectedDate);
        setTimeTable(timeLineData);

        if (selected !== "무대기획전") {
          const stageData = await stageApi.getStage(
            selectedDate,
            CATEGORY_MAP[selected as keyof typeof CATEGORY_MAP],
          );
          setStage(stageData);
        }
      } catch (error) {
        console.error("데이터 로드 실패", error);
        setStage([]);
        setTimeTable([]);
      }
    }
    fetchData();
  }, [selectedDate, selected]);

  // 타임라인용 필터링 및 정렬
  const timelineData = useMemo(() => {
    return [...timeTable].sort(
      (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
    );
  }, [timeTable]);

  // 무대기획전 카드용 필터링 (날짜)
  const filteredEventData = STAGE_EVENT_DATA.filter((item) => {
    const itemDate = item.start.split("T")[0];
    return itemDate === selectedDate;
  });

  const currentCategory = CATEGORY_INFO[selected];

  const activeId = useMemo(() => {
    const nowTime = currentTime.getHours() * 60 + currentTime.getMinutes();

    return timelineData.find((item) => {
      const start = new Date(item.start_at);
      const end = new Date(item.end_at);
      const startTime = start.getHours() * 60 + start.getMinutes();
      const endTime = end.getHours() * 60 + end.getMinutes();

      return nowTime >= startTime && nowTime < endTime;
    })?.stage_id;
  }, [timelineData, currentTime]);

  // 타임라인 시간 업데이트
  useEffect(() => {
    const now = new Date();
    const times = timelineData.flatMap((item) => [
      new Date(item.start_at),
      new Date(item.end_at),
    ]);

    const futureTimes = times.filter((time) => time > now);
    if (futureTimes.length === 0) return;

    const nextTime = new Date(Math.min(...futureTimes.map((t) => t.getTime())));

    const timeout = setTimeout(() => {
      setCurrentTime(new Date());
    }, nextTime.getTime() - now.getTime());

    return () => clearTimeout(timeout);
  }, [selected, timelineData]);

  return (
    <main className="px-4 pt-5 pb-25">
      {/* 날짜 & 공연 카테고리 설정 */}
      <section className="mb-15">
        <StageCategory
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
            {filteredEventData.map((item) => (
              <StageEventSection key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <ArtistSection data={stage} />
        )}
      </section>

      {/* 타임라인 */}
      <section className="flex flex-col gap-4 mb-3">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-semibold">본무대 타임라인</h2>
          <button className="px-[37.5px] py-2.5 bg-primary text-base leading-4.5 text-white rounded-lg">
            본무대 FAQ
          </button>
        </div>

        <div>
          <StageTimeline data={timelineData} activeId={activeId} />
        </div>
      </section>

      <small className="block text-xs font-light text-[#888888] text-center">
        *주최 측의 사정에 따라 일정이 변경될 수 있습니다
      </small>
    </main>
  );
}
