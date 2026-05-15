"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mypageApi } from "@/lib";
import { DetailHeader, Card, LoadingScreen } from "@/components";

export default function LikesPage() {
  const [tab, setTab] = useState<"booth" | "food">("booth");

  const {
    data: booths,
    isLoading: boothLoading,
    isError: boothError,
    refetch: refetchBooths,
  } = useQuery({
    queryKey: ["mypage", "booth"],
    queryFn: mypageApi.getLikedBooths,
  });

  const {
    data: trucks,
    isLoading: truckLoading,
    isError: truckError,
    refetch: refetchTrucks,
  } = useQuery({
    queryKey: ["mypage", "foodtruck"],
    queryFn: mypageApi.getLikedFoodTrucks,
  });

  const isLoading = boothLoading || truckLoading;
  const isError = boothError || truckError;

  if (isLoading) return <LoadingScreen />;

  const TabBar = () => (
    <div className="relative">
      <div className="flex">
        <button
          onClick={() => setTab("booth")}
          className={`flex-1 text-center pb-2 text-base ${
            tab === "booth" ? "text-black font-semibold" : "text-text-sub"
          }`}
        >
          부스
        </button>
        <button
          onClick={() => setTab("food")}
          className={`flex-1 text-center pb-2 text-base ${
            tab === "food" ? "text-black font-semibold" : "text-text-sub"
          }`}
        >
          푸드트럭
        </button>
      </div>
      <div className="absolute bottom-0 w-full h-0.5 bg-text-sub2" />
      <div
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
        style={{ width: "50%", left: tab === "booth" ? "0%" : "50%" }}
      />
    </div>
  );

  return (
    <main className="pb-25">
      <div className="fixed top-14 left-0 right-0 bg-white z-10">
        <DetailHeader title="내 좋아요" />
        <TabBar />
      </div>

      <div className="pt-32 px-4 pb-12">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-[137px] rounded-[10px] bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-text-sub text-base">불러오는 중 오류가 발생했습니다.</p>
            <button
              onClick={() => { refetchBooths(); refetchTrucks(); }}
              className="px-6 py-2 rounded-[28px] border border-primary text-primary text-base font-semibold active:scale-95 transition-transform"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {tab === "booth"
                ? booths?.map((booth) => (
                    <Card
                      key={booth.booth_id}
                      id={booth.booth_id}
                      type="booth"
                      image={booth.booth_image}
                      name={booth.booth_name}
                      subText={booth.booth_owner}
                      location={booth.booth_location}
                      isLiked={booth.is_liked}
                      likeCount={booth.like_count}
                    />
                  ))
                : trucks?.map((truck) => (
                    <Card
                      key={truck.id}
                      id={truck.id}
                      type="foodtruck"
                      image={truck.image}
                      name={truck.name}
                      subText={truck.bestMenu}
                      location={truck.location}
                      isLiked={truck.liked}
                      likeCount={truck.likeCount}
                    />
                  ))}
            </div>

            {tab === "booth" && booths?.length === 0 && (
              <div className="text-center py-20 text-text-sub text-base">좋아요한 부스가 없어요.</div>
            )}
            {tab === "food" && trucks?.length === 0 && (
              <div className="text-center py-20 text-text-sub text-base">좋아요한 푸드트럭이 없어요.</div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
