"use client";

import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useHotFood } from "@/hooks/queries/home";
import { FiTruck } from "react-icons/fi";

export function FoodSection() {
  const { data: foods = [], isLoading } = useHotFood();

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="HOT FOOD"
        description="303관 지하 1층에서 음식을 무뎌보자~~^^"
        href="/foodtruck"
      />
      <div className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="ml-[30px] h-[97px] rounded-[10px] bg-gray-200 animate-pulse" />
          ))
        ) : foods.length === 0 ? (
          <div className="ml-7.5 flex flex-col items-center justify-center gap-2.5 h-[110px] rounded-[10px] bg-gradient-to-r from-[#f7f9ff] to-[#e8f2ff]">
            <FiTruck size={24} className="text-[#06387d]/40 animate-pulse" />
            <span className="text-[13px] font-medium text-[#8D97A7] flex items-end">
              인기 푸드트럭을 집계 중이에요
              <span className="flex gap-[2px] ml-0.5 mb-[1px]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>.</span>
                ))}
              </span>
            </span>
          </div>
        ) : (
          foods.map((food) => (
            <ListCard
              key={food.id}
              id={food.id}
              type="foodtruck"
              imageUrl={food.image}
              href={`/foodtruck/${food.id}`}
              location={food.bestMenu}
              name={food.name}
              isLiked={food.liked}
              likeCount={food.likeCount}
            />
          ))
        )}
      </div>
    </section>
  );
}
