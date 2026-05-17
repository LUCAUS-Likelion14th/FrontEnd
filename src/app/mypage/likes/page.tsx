"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mypageApi } from "@/api";
import { DetailHeader, Card, ErrorFallback } from "@/components";

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

  const currentLoading = tab === "booth" ? boothLoading : truckLoading;
  const currentError = tab === "booth" ? boothError : truckError;



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
      <div className="fixed left-0 right-0 bg-white z-40" style={{ top: "calc(3.5rem + env(safe-area-inset-top))" }}>
        <DetailHeader title="내 좋아요" />
        <TabBar />
      </div>

      <div className="pt-32 px-4 pb-12">
        {currentLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-[195px] rounded-[10px] animate-shimmer" />
            ))}
          </div>
        ) : currentError ? (
          <ErrorFallback
            onReset={() => tab === "booth" ? refetchBooths() : refetchTrucks()}
          />
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
                      isLiked={booth.liked}
                      likeCount={booth.likeCount}
                    />
                  ))
                : trucks?.map((truck) => (
                    <Card
                      key={truck.id}
                      id={truck.id}
                      type="foodtruck"
                      image={truck.image}
                      name={truck.name}
                      location={truck.bestMenu}
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
