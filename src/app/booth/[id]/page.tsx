"use client";

import { use, useState } from "react";
import { BoothTitle, DetailAction, DetailHeader, DetailInfo } from "@/components";
import { useBoothDetail } from "@/hooks/queries/booth";
import Image from "next/image";
import { FiImage } from "react-icons/fi";

const DAY_KO: Record<string, string> = {
  MONDAY: "월", TUESDAY: "화", WEDNESDAY: "수",
  THURSDAY: "목", FRIDAY: "금", SATURDAY: "토", SUNDAY: "일",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function BoothDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: booth, isLoading, isError } = useBoothDetail(id);
  const [boothImgError, setBoothImgError] = useState(false);

  if (isLoading) return null;

  if (isError || !booth) {
    return (
      <main>
        <DetailHeader title="부스 정보" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          부스 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </main>
    );
  }

  return (
    <main className="pb-16">
      <DetailHeader title="부스 정보" />

      <div className="relative w-full aspect-390/264 bg-gray-100">
        {boothImgError || !booth.booth_image ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiImage size={40} className="text-gray-300" />
          </div>
        ) : (
          <Image
            src={booth.booth_image}
            alt="부스 사진"
            fill
            className="object-cover"
            onError={() => setBoothImgError(true)}
          />
        )}
      </div>

      <div className="flex flex-col px-4 gap-6">
        <BoothTitle
          name={booth.booth_name}
          categories={booth.booth_category}
          info={booth.booth_info}
        />

        <DetailAction
          id={booth.booth_id}
          type="booth"
          isLiked={booth.is_liked}
          ownerInsta={booth.owner_insta}
          likeCount={booth.like_count}
        />

        <DetailInfo
          location={[...new Set(booth.settings.map((s) => s.location))].join(" · ")}
          date={booth.settings.map((s) => {
            const [, m, d] = s.date.split("-");
            return `${Number(m)}월 ${Number(d)}일(${DAY_KO[s.day] ?? s.day}) ${s.startAt} ~ ${s.endAt}`;
          })}
          hasBorder={false}
        />
      </div>
    </main>
  );
}
