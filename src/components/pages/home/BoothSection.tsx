"use client";

import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTopBooth } from "@/hooks/queries/home";
import { BsShop } from "react-icons/bs";

export function BoothSection() {
  const { data: booths = [], isLoading } = useTopBooth();

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="TOP BOOTH"
        description="현 시간 가장 핫한 부스!"
        href="/booth"
      />
      <div className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="ml-[30px] h-[97px] rounded-[10px] bg-gray-200 animate-pulse" />
          ))
        ) : booths.length === 0 ? (
          <div className="ml-[30px] flex flex-col items-center justify-center gap-2.5 h-[110px] rounded-[14px] bg-gradient-to-b from-[#EEF2FF] to-[#F8F9FB]">
            <BsShop size={24} className="text-[#06387d]/40 animate-pulse" />
            <span className="text-[13px] font-medium text-[#8D97A7] flex items-end">
              인기 부스를 집계 중이에요
              <span className="flex gap-[2px] ml-0.5 mb-[1px]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>.</span>
                ))}
              </span>
            </span>
          </div>
        ) : (
          booths.map((booth) => (
            <ListCard
              key={booth.booth_id}
              id={booth.booth_id}
              type="booth"
              imageUrl={booth.booth_image}
              href={`/booth/${booth.booth_id}`}
              location={booth.location}
              name={booth.booth_name}
              isLiked={booth.is_liked}
              likeCount={booth.like_count}
              department={booth.owner}
            />
          ))
        )}
      </div>
    </section>
  );
}
