"use client";

import { StageEventSection, StageCategory, ArtistSection, StageTimeline } from '@/components';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { STAGE_EVENT_DATA } from "@/data/stageEventData";
import { useStageData } from "@/hooks/queries/stage";
import Link from 'next/link';

type CategoryType = "학생 공연" | "청룡가요제" | "아티스트 공연" | "무대기획전";

const CATEGORIES_BY_DATE: Record<string, CategoryType[]> = {
  "2026-05-21": ["청룡가요제", "무대기획전", "아티스트 공연"],
  "2026-05-22": ["학생 공연", "아티스트 공연"],
};

const TYPE_MAP: Record<string, CategoryType> = {
  student: "학생 공연",
  festival: "청룡가요제",
  artist: "아티스트 공연",
  special: "무대기획전",
};

const CATEGORY_INFO: Record<
  CategoryType,
  { title: string; description: string }
> = {
  "학생 공연": {
    title: "학생 공연",
    description: "중앙대 학생들이 직접 만드는 무대",
  },
  청룡가요제: {
    title: "청룡가요제",
    description: "중앙대 최고의 보컬은 누구?",
  },
  "아티스트 공연": {
    title: "아티스트 공연",
    description: "중앙대를 찾은 아티스트들을 만나보세요",
  },
  무대기획전: {
    title: "무대기획전",
    description: "관객 참여형 추리 무대 콘텐츠",
  },
};

export default function StagePage() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("2026-05-21");
  const [selected, setSelected] = useState<CategoryType>("청룡가요제");

  const availableCategories = CATEGORIES_BY_DATE[selectedDate] ?? [];

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && TYPE_MAP[type]) {
      setSelected(TYPE_MAP[type]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!availableCategories.includes(selected)) {
      setSelected(availableCategories[0]);
    }
  }, [selectedDate]);

  const { stage, timelineData, activeId } = useStageData(selectedDate, selected);

  const filteredEventData = STAGE_EVENT_DATA.filter(
    (item) => item.start.split("T")[0] === selectedDate,
  );

  const currentCategory = CATEGORY_INFO[selected];

  return (
    <main className="px-4 pt-5 pb-25">
      <section className="mb-10">
        <StageCategory
          categories={availableCategories}
          selected={selected}
          onSelect={setSelected}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </section>

      <section className="mb-13">
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
          <a
            href="https://festival.cau.ac.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-2.5 bg-primary text-base leading-4.5 text-white rounded-lg">
            입장 QR코드
          </a>
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
