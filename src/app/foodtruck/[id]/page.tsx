"use client";

import { use } from "react";
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

type Props = {
  params: Promise<{ id: string }>;
};

export default function FoodTruckDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: foodTruck, isLoading, isError } = useFoodTruckDetail(id);

  if (isLoading) return <LoadingScreen />;

  if (isError || !foodTruck) {
    return (
      <main>
        <DetailHeader title="푸드트럭 정보" />
        <ErrorFallback title="푸드트럭 정보를 불러올 수 없어요" onReset={() => window.location.reload()} />
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
        />
        <MenuDetail menuList={foodTruck.menu} />
      </div>
    </main>
  );
}
