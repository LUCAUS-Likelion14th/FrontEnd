"use client";

import { use, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  BoothTitle,
  DetailAction,
  DetailHeader,
  DetailInfo,
  LoadingScreen,
} from "@/components";
import { useBoothDetail } from "@/hooks/queries/booth";
import BoothMapWithMarker from "@/components/pages/detail/BoothMapWithMarker";
import Image from "next/image";
import { FiImage } from "react-icons/fi";

const DAY_KO: Record<string, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

type Props = {
  params: Promise<{ id: string }>;
};

function BoothDetailContent({ params }: Props) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const { data: booth, isLoading, isError } = useBoothDetail(id);
  const [boothImgError, setBoothImgError] = useState(false);

  if (isLoading) return <LoadingScreen />;

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

  const selectedDate = searchParams.get("date");
  const filteredSettings = selectedDate
    ? booth.settings.filter((s) => s.date === selectedDate)
    : booth.settings;
  const activeSettings =
    filteredSettings.length > 0 ? filteredSettings : booth.settings;

  const uniqueLocations = [...new Set(activeSettings.map((s) => s.location))];

  const locationGroups = uniqueLocations.map((loc) => {
    const locSettings = activeSettings.filter((s) => s.location === loc);
    return {
      location: loc,
      locationId: locSettings[0]?.locationId ?? "",
      dates: booth.settings
        .filter((s) => s.location === loc)
        .map((s) => {
          const [, m, d] = s.date.split("-");
          return `${Number(m)}월 ${Number(d)}일(${DAY_KO[s.day] ?? s.day}) ${s.startAt} ~ ${s.endAt}`;
        }),
    };
  });

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

        <div className="flex flex-col gap-4">
          {locationGroups.map((group) => (
            <div key={group.location} className="flex flex-col gap-4">
              <DetailInfo locationGroups={[group]} hasBorder={false} />
              <BoothMapWithMarker
                location={group.location}
                locationId={group.locationId}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function BoothDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BoothDetailContent params={params} />
    </Suspense>
  );
}
