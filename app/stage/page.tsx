"use client";

import ArtistButton from "@/components/stage/ArtistButton";
import Category from "@/components/stage/Category";
import StageTimeline from "@/components/stage/StageTimeline";
import { useEffect, useState } from "react";

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

const STAGE_DATA = [
  {
    id: 1,
    description: "공연1",
    artist: "NCT",
    category: "학생 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-21T13:30:00",
    end: "2026-05-21T15:00:00",
  },
  {
    id: 2,
    description: "공연2",
    artist: "DAY6",
    category: "청룡가요제",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-21T15:00:00",
    end: "2026-05-21T16:00:00",
  },
  {
    id: 3,
    description: "공연3",
    artist: "NewJeans",
    category: "아티스트 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-22T16:00:00",
    end: "2026-05-22T18:00:00",
  },
  {
    id: 4,
    description: "공연4",
    artist: "BlackPink",
    category: "아티스트 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-22T18:00:00",
    end: "2026-05-22T20:00:00",
  },
];

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
    return currentTime >= start && currentTime < end;
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
  }, [filteredData]);

  return (
    <main className="px-4">
      <h1 className="text-[24px] font-semibold mb-3">공연 정보</h1>
      <section className="mb-12">
        <Category
          categories={CATEGORY}
          selected={selected}
          onSelect={setSelected}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </section>

      <section className="mb-17">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[24px] font-semibold">{currentCategory.title}</h2>
          <p className="text-base font-normal text-text-sub">
            {currentCategory.description}
          </p>
        </div>
        <div className="flex gap-4 overflow-x whitespace-nowrap">
          {filteredData.map((item) => (
            <ArtistButton
              key={item.id}
              image={item.artistLogo}
              artist={item.artist}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 mb-3">
        <div className="flex justify-between">
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
