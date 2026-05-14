"use client";

import { use } from "react";
import { BoothTitle, DetailAction, DetailHeader, DetailInfo, LoadingSpinner } from "@/components";
import { useBoothDetail } from "@/hooks/queries/booth";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default function BoothDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: booth, isLoading, isError } = useBoothDetail(id);

  if (isLoading) {
    return (
      <main>
        <DetailHeader title="부스 정보" />
        <LoadingSpinner />
      </main>
    );
  }

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

      <div className="relative w-full aspect-390/264">
        <Image
          src={booth.booth_image}
          alt={"부스 사진"}
          fill
          className="object-cover"
        />
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
          location={booth.location}
          date={booth.date}
          hasBorder={false}
        />

        <div className="flex flex-col gap-3">
          <div className="relative w-full h-60 rounded-[10px]">
            <Image
              src={booth.location_image}
              alt={booth.location}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
