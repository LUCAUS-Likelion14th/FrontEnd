"use client";

import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useHotFood } from "@/hooks/queries/home";

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
          <div className="ml-[30px] flex items-center justify-center h-[97px] rounded-[10px] bg-white border border-text-sub2 text-text-sub text-base">
            등록된 푸드트럭이 없어요
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
