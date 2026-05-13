"use client";

import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useHotFood } from "@/hooks/queries/home";
import { FiTruck } from "react-icons/fi";
import { motion } from "framer-motion";

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
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiTruck size={24} className="text-[#06387d]" />
            </motion.div>
            <span className="text-[13px] font-medium text-[#8D97A7]">
              운영 시간에 만나요!
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
