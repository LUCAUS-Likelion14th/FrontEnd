"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { BoothLikeItem, FoodLikeItem } from "@/types/mylikes";
import Link from "next/link";

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
    food_id: 1,
    location_id: 1,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    food_id: 2,
    location_id: 1,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    food_id: 3,
    location_id: 1,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    food_id: 4,
    location_id: 1,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    food_id: 5,
    location_id: 2,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 6,
  },
  {
    food_id: 6,
    location_id: 1,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 15,
  },
  {
    food_id: 7,
    location_id: 3,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 5,
  },
  {
    food_id: 8,
    location_id: 1,
    image: "/img.png",
    food_name: "푸드트럭 이름",
    best_food: "대표 메뉴",
    location: "해방광장",
    is_liked: true,
    like_count: 35,
  },
];

export default function LikesPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"booth" | "food">("booth");
  return (
    <main>
      {/* 고정 헤더 */}
      <div className="fixed top-19 left-0 right-0 bg-white z-10 px-4">
        <div className="flex items-center gap-1 pb-5">
          <button onClick={() => router.back()} className="p-0">
            <FiChevronLeft size={24} className="block" />
          </button>
          <span className="text-2xl font-semibold">내 좋아요</span>
        </div>

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
                <Link
                  href={`/booth/${booth.booth_id}`}
                  key={booth.booth_id}
                  className="block"
                >
                  <article className="relative w-full h-34.25 rounded-[10px] overflow-hidden">
                    <Image
                      src={booth.booth_image}
                      alt={booth.booth_name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-13.75 bg-linear-to-t from-white to-transparent" />

                    <div className="absolute bottom-2.25 left-1.75 right-1.75 flex items-end justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-semibold leading-tight line-clamp-1">
                          {booth.booth_name}
                        </span>
                        <span className="text-xs leading-tight">
                          {booth.booth_owner}
                        </span>
                        <span className="text-xs leading-tight">
                          {booth.booth_location}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        {booth.is_liked ? (
                          <FaHeart size={24} className="text-primary" />
                        ) : (
                          <FiHeart size={24} className="text-text-sub" />
                        )}
                        <span className="text-sm text-text-sub">
                          {booth.like_count}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            : mockFoodtrucks.map((truck) => (
                <Link
                  href={`/foodtruck/${truck.food_id}`}
                  key={truck.food_id}
                  className="block"
                >
                  <article className="relative w-full h-34.25 rounded-[10px] overflow-hidden bg-[#D9D9D9]">
                    <Image
                      src={truck.image}
                      alt={truck.food_name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-13.75 bg-linear-to-t from-white to-transparent" />

                    <div className="absolute bottom-2.25 left-1.75 right-1.75 flex items-end justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-semibold leading-tight line-clamp-1">
                          {truck.food_name}
                        </span>
                        <span className="text-xs leading-tight">
                          {truck.best_food}
                        </span>
                        <span className="text-xs leading-tight">
                          {truck.location}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        {truck.is_liked ? (
                          <FaHeart size={24} className="text-primary" />
                        ) : (
                          <FiHeart size={24} className="text-text-sub" />
                        )}
                        <span className="text-sm text-text-sub">
                          {truck.like_count}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
        </div>
      </div>
    </main>
  );
}
