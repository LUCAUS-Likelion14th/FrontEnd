"use client";

import ArtistButton from "@/components/stage/ArtistButton";
import Category from "@/components/stage/Category";
import StageTimeline from "@/components/stage/StageTimeline";
import { useState } from "react";

const CATEGORY = ["학생 공연", "청룡가요제", "아티스트 공연", "무대기획전"];

const STAGE_DATA = [
  {
    id: 1,
    description: "공연1",
    artist: "NCT",
    category: "학생 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
  },
  {
    id: 2,
    description: "공연2",
    artist: "DAY6",
    category: "청룡가요제",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
  },
  {
    id: 3,
    description: "공연3",
    artist: "NewJeans",
    category: "아티스트 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
  },
  {
    id: 4,
    description: "공연4",
    artist: "BlackPink",
    category: "무대기획전",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
  },
];

export default function StagePage() {
  const [selected, setSelected] = useState("학생 공연");

  const filteredData = STAGE_DATA.filter((item) => item.category === selected);

  return (
    <main className="px-4">
      <h1 className="text-[24px] font-semibold mb-3">공연 정보</h1>
      <section className="mb-12">
        <Category
          categories={CATEGORY}
          selected={selected}
          onSelect={setSelected}
        />
      </section>

      <section className="mb-17">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[24px] font-semibold">공연 라인업</h2>
          <p className="text-base font-normal">
            학생들이 직접 만드는 공연 어쩌구 저쩌구
          </p>
        </div>
        <div>
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
          <StageTimeline
            data={filteredData.map((item) => ({
              id: item.id,
              image: item.stageImage,
              description: item.description,
              artist: item.artist,
            }))}
          />
        </div>
      </section>

      <small className="block text-xs font-light text-center">
        *주최 측의 사정에 따라 일정이 변경될 수 있습니다
      </small>
    </main>
  );
}
