"use client";

import { use, useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  BoothTitle,
  DetailAction,
  DetailHeader,
  DetailInfo,
  LoadingScreen,
  ErrorFallback,
} from "@/components";
import { useBoothDetail } from "@/hooks/booth";
import BoothMapWithMarker from "@/components/detail/BoothMapWithMarker";
import Image from "next/image";
import { FiImage, FiFlag } from "react-icons/fi";
// ─── analytics tracking ───
import { useRef } from "react";
import { trackEvent } from "@/lib/api/analytics";
import { getReferralFromPrevPath } from "@/lib/api/referral";
// ─── /analytics tracking ───

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 백엔드 로그 ─── analytics tracking ───
  const _analyticsHasTracked = useRef(false);
  const _analyticsStartTime = useRef(Date.now());
  const _analyticsBoothIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!booth || _analyticsHasTracked.current) return;
    _analyticsBoothIdRef.current = booth.booth_id;
    _analyticsStartTime.current = Date.now();
    _analyticsHasTracked.current = true;
    trackEvent({
      eventType: "booth_detail_view",
      targetType: "BOOTH",
      targetId: booth.booth_id,
      payload: {
        boothId: booth.booth_id,
        referral: getReferralFromPrevPath(),
        mainPosition: Number(searchParams.get("main_position")) || null,
        likeCountAtView: booth.like_count,
        isLikedByUser: booth.is_liked,
      },
    });
  }, [booth]);

  useEffect(() => {
    return () => {
      if (!_analyticsBoothIdRef.current) return;
      const durationSec = Math.floor(
        (Date.now() - _analyticsStartTime.current) / 1000,
      );
      if (durationSec < 3) return;
      trackEvent({
        eventType: "stay_duration_booth_detail",
        targetType: "BOOTH",
        targetId: _analyticsBoothIdRef.current,
        payload: {
          boothId: _analyticsBoothIdRef.current,
          durationSec,
        },
      });
    };
  }, []);
  // 백엔드 로그 ─── /analytics tracking ───

  if (isLoading) return <LoadingScreen />;

  if (isError || !booth) {
    return (
      <main>
        <DetailHeader title="부스 정보" />
        <ErrorFallback title="부스 정보를 불러올 수 없어요" onReset={() => window.location.reload()} />
      </main>
    );
  }

  const selectedDate = searchParams.get("date");
  const filteredSettings = selectedDate
    ? booth.settings.filter((s) => s.date === selectedDate)
    : booth.settings;
  const activeSettings =
    filteredSettings.length > 0 ? filteredSettings : booth.settings;

  const uniqueLocationKeys = [
    ...new Map(
      activeSettings.map((s) => [`${s.location}__${s.locationId}`, s])
    ).values(),
  ];

  const locationGroups = uniqueLocationKeys.map(({ location, locationId }) => {
    return {
      location,
      locationId,
      dates: booth.settings
        .filter((s) => s.location === location && s.locationId === locationId)
        .map((s) => {
          const [, m, d] = s.date.split("-");
          return `${Number(m)}월 ${Number(d)}일(${DAY_KO[s.day] ?? s.day}) ${s.startAt} ~ ${s.endAt}`;
        }),
    };
  });

  return (
    <main className="pb-16">
      <DetailHeader title="부스 정보" />

      <div className="w-full bg-gray-100">
        {boothImgError || !booth.booth_image ? (
          <div className="flex items-center justify-center h-[200px]">
            <FiImage size={40} className="text-gray-300" />
          </div>
        ) : (
          <Image
            src={booth.booth_image}
            alt="부스 사진"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            onError={() => setBoothImgError(true)}
          />
        )}
      </div>

      <div className="flex flex-col px-4 gap-5">
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

        {booth.booth_owner && (
          <div className="bg-[#f8f9fb] rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <FiFlag size={16} className="text-primary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-text-sub">운영 단체</span>
              <span className="text-sm font-medium">{booth.booth_owner}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {locationGroups.map((group) => (
            <div key={`${group.location}__${group.locationId}`} className="flex flex-col gap-4">
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
