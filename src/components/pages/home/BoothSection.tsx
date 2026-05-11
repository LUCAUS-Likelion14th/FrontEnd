"use client";

import { useState, useEffect } from "react";
import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { homeApi } from "@/lib/api/homeApi";
import type { TopBooth } from "@/types/home";

export function BoothSection() {
  const [booths, setBooths] = useState<TopBooth[]>([]);

  useEffect(() => {
    homeApi.getTopBooth().then(setBooths).catch(() => setBooths([]));
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="TOP BOOTH"
        description="현 시간 가장 핫한 부스!"
        href="/booth"
      />
      <div className="flex flex-col gap-2">
        {booths.length === 0 ? (
          <div className="ml-[30px] flex items-center justify-center h-[97px] rounded-[10px] bg-white border border-text-sub2 text-text-sub text-base">
            등록된 부스가 없어요
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
