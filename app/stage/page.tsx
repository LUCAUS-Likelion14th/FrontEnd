"use client";

import StageEventSection from "@/components/stage/StageEventSection";
import ArtistSection from "@/components/stage/ArtistSection";
import StageTimeline from "@/components/stage/StageTimeline";
import { useState } from "react";
import { STAGE_EVENT_DATA } from "@/data/stageEventData";
import { useStageData } from "@/hooks/useStageData";
import StageCategory from "@/components/stage/StageCategory";

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

  const { stage, timelineData, activeId } = useStageData(selectedDate, selected);

  const filteredEventData = STAGE_EVENT_DATA.filter(
    (item) => item.start.split("T")[0] === selectedDate,
  );

  const currentCategory = CATEGORY_INFO[selected];

  return (
    <main className="px-4 pt-5 pb-25">
      <section className="mb-15">
        <StageCategory
          categories={CATEGORY}
          selected={selected}
          onSelect={setSelected}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </section>

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
