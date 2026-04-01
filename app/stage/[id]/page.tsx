"use client";

import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { STAGE_DATA } from "@/data/stageData";
import { use } from "react";

type DetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function StageDetailPage({ params }: DetailProps) {
  const router = useRouter();

  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);

  const stage = STAGE_DATA.find((item) => item.id === id);

  if (!stage) {
    return <div className="p-4">공연 정보를 찾을 수 없습니다.</div>;
  }

  const formatTime = (time: string) => {
    const date = new Date(time);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  return (
    <main className="px-4">
      <div className="flex items-center gap-1 mb-5">
        <FiChevronLeft
          size={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-[24px] font-semibold">공연 정보</h1>
      </div>

      <section className="mb-6.25">
        <Image
          src={stage.stageImage}
          alt={`${stage.artist} 사진`}
          width={315}
          height={420}
          className="object-cover"
        />
      </section>

      <section className="mb-12">
        <div className="flex justify-between pb-[16.5px] mb-6 border-b">
          <h2 className="text-[24px] font-semibold">{stage.artist}</h2>
          <div className="flex gap-2">
            <AiOutlineYoutube size={38} />
            <AiOutlineInstagram size={38} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[20px] font-semibold text-text-sub">
              공연 일정
            </h3>
            <p>
              21일 (목) {formatTime(stage.start)} - {formatTime(stage.end)}
            </p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-[20px] font-semibold text-text-sub">공연 곡</h3>
            <div className="flex flex-col text-right">
              {stage.songs?.map((song) => (
                <p key={song}>{song}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <h3 className="text-[20px] font-semibold text-text-sub">소개글</h3>
            <p className="text-right whitespace-pre-line">{stage.intro}</p>
          </div>
        </div>
      </section>

      <small className="block text-xs font-light text-center">
        *주최 측의 사정에 따라 일정이 변경될 수 있습니다
      </small>
    </main>
  );
}
