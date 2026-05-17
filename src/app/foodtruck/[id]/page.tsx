"use client";

import { use, useEffect, useRef } from "react";
import {
  DetailHeader,
  FoodTruckTitle,
  DetailInfo,
  MenuDetail,
  LoadingScreen,
  ErrorFallback,
} from "@/components";
import { useFoodTruckDetail } from "@/hooks/foodtruck";
import DetailHeroImage from "@/components/detail/DetailHeroImage";
import { trackEvent } from "@/lib/api/analytics";

type Props = {
  params: Promise<{ id: string }>;
};

export default function FoodTruckDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: foodTruck, isLoading, isError } = useFoodTruckDetail(id);

  // 백엔드
  const hasTracked = useRef(false);
  const startTime = useRef(Date.now());
  const foodtruckIdRef = useRef<number | null>(null);
    //foodtruck_detail_view
  useEffect(() => {
    if (!foodTruck || hasTracked.current) return;
    foodtruckIdRef.current = foodTruck.id;
    hasTracked.current = true;
    trackEvent({
      eventType: "foodtruck_detail_view",
      targetType: "FOODTRUCK",
      targetId: foodTruck.id,
      payload: {
        referral: "home_top3",
        mainPosition: 1,
        likeCountAtView: foodTruck.likeCount,
        isLikedByUser: foodTruck.liked,
      },
    });
  }, [foodTruck]);
    //foodtruck_detail_duration
  useEffect(() => {
    return () => {
      if (!foodtruckIdRef.current) return;
      const durationSec = Math.floor(
        (Date.now() - startTime.current) / 1000
      );
      if (durationSec < 3) return;
      trackEvent({
        eventType: "foodtruck_detail_duration",
        targetType: "FOODTRUCK",
        targetId: foodtruckIdRef.current,
        payload: {
          durationSec,
        },
      });
    };
  }, []);
  // 백엔드


  if (isLoading) return <LoadingScreen />;

  if (isError || !foodTruck) {
    return (
      <main>
        <DetailHeader title="푸드트럭 정보" />
        <ErrorFallback
          title="푸드트럭 정보를 불러올 수 없어요"
          onReset={() => window.location.reload()}
        />
      </main>
    );
  }

  return (
    <main className="pb-12">
      <DetailHeader title="푸드트럭 정보" />
      <DetailHeroImage src={foodTruck.image} alt="푸드트럭 사진" />

      <div className="flex flex-col px-4 gap-6">
        <FoodTruckTitle
          id={foodTruck.id}
          type="foodtruck"
          name={foodTruck.name}
          isLiked={foodTruck.liked}
          likeCount={foodTruck.likeCount}
          info={foodTruck.foodTruckInfo}
        />
        <DetailInfo
          location={foodTruck.location}
          date={foodTruck.date}
          hasBorder={false}
          hideLocation
        />
        <MenuDetail menuList={foodTruck.menu} />
      </div>
    </main>
  );
}
