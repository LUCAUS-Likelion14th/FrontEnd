"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFoodTruckList } from "@/hooks/queries/foodtruck";
import { Card, Pagination } from "@/components";

const PAGE_SIZE = 8;

function FoodTruckPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page") ?? 1)
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage]);

  const { data: trucks = [], isLoading } = useFoodTruckList({});

  const totalPages = Math.max(1, Math.ceil(trucks.length / PAGE_SIZE));
  const pagedTrucks = trucks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="px-4 pt-5 pb-25">
      <section className="flex flex-col gap-5 pb-10 border-b border-b-text-sub2 mb-5">
        <div className="relative w-full h-[240px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
          <span className="text-text-sub text-base">지도</span>
        </div>
      </section>

      <section className="flex flex-col">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-[137px] rounded-[10px] bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : pagedTrucks.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {pagedTrucks.map((truck) => (
              <Card
                key={truck.id}
                id={truck.id}
                type="foodtruck"
                name={truck.name}
                subText={truck.bestMenu}
                location={truck.location}
                image={truck.image}
                isLiked={truck.liked}
                likeCount={truck.likeCount}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 text-text-sub text-base">
            해당 조건에 맞는 푸드트럭이 없습니다.
          </div>
        )}

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      </section>
    </main>
  );
}

export default function FoodTruckPage() {
  return (
    <Suspense>
      <FoodTruckPageContent />
    </Suspense>
  );
}
