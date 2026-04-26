"use client";

import { useState } from "react";
import { BoothLikeItem, FoodLikeItem } from "@/types/mylikes";
import DetailHeader from "@/components/detail/DetailHeader";
import Card from "@/components/common/Card";

const mockBooths: BoothLikeItem[] = [
  {
    booth_id: 1,
    location_id: 1,
    booth_image: "/img.png",
    booth_name: "부스 이름",
    booth_owner: "단체 이름",
    booth_location: "해방광장",
    is_liked: true,
    like_count: 78,
  },
  {
    booth_id: 2,
    location_id: 2,
    booth_image: "/img.png",
    booth_name: "부스 이름",
    booth_owner: "단체 이름",
    booth_location: "해방광장",
    is_liked: true,
    like_count: 52,
  },
  {
    booth_id: 3,
    location_id: 3,
    booth_image: "/img.png",
    booth_name: "부스 이름",
    booth_owner: "단체 이름",
    booth_location: "해방광장",
    is_liked: true,
    like_count: 4,
  },
];

const mockFoodtrucks: FoodLikeItem[] = [
  {
    truck_id: 1,
    location_id: 1,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    truck_id: 2,
    location_id: 1,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    truck_id: 3,
    location_id: 1,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    truck_id: 4,
    location_id: 1,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    truck_id: 5,
    location_id: 2,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 6,
  },
  {
    truck_id: 6,
    location_id: 1,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 15,
  },
  {
    truck_id: 7,
    location_id: 3,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    truck_id: 8,
    location_id: 1,
    truck_image: "/img.png",
    truck_name: "푸드트럭 이름",
    main_menu: "대표 메뉴",
    truck_location: "해방광장",
    is_liked: true,
    like_count: 35,
  },
];

export default function LikesPage() {
  const [tab, setTab] = useState<"booth" | "food">("booth");

  return (
    <main className="pb-25">
      {/* 고정 헤더 */}
      <div className="fixed top-14 left-0 right-0 bg-white z-10">
        <DetailHeader title="내 좋아요" />

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
      </div>

      {/* 스크롤 영역 - 헤더 높이만큼 padding 줘서 안 겹치게 */}
      <div className="pt-32 px-4 pb-12">
        <div className="grid grid-cols-2 gap-4">
          {tab === "booth"
            ? mockBooths.map((booth) => (
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
            : mockFoodtrucks.map((truck) => (
                <Card
                  key={truck.truck_id}
                  id={truck.truck_id}
                  type="foodtruck"
                  image={truck.truck_image}
                  name={truck.truck_name}
                  subText={truck.main_menu}
                  location={truck.truck_location}
                  isLiked={truck.is_liked}
                  likeCount={truck.like_count}
                />
              ))}
        </div>
      </div>
    </main>
  );
}
