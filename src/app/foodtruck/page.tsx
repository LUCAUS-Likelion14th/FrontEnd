"use client";

import { useState, useEffect } from "react";
import { FoodTruckDetail } from "@/types/foodtruck";
import { foodTruckApi } from "@/lib/api/foodTruckApi";
import { Card, Pagination, DateFilter } from "@/components";

const PAGE_SIZE = 8;

export default function FoodTruckPage() {
  const [trucks, setTrucks] = useState<FoodTruckDetail[]>([]);
  const [selectedDate, setSelectedDate] = useState("2026-05-21");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    foodTruckApi.getList()
      .then(setTrucks)
      .catch(console.error);
  }, []);

  const filteredTrucks = trucks.filter((truck) => {
    if (selectedDate !== "all" && truck.date && !truck.date.includes(selectedDate))
      return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTrucks.length / PAGE_SIZE));
  const pagedTrucks = filteredTrucks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  return (
    <main className="px-4 pt-5 pb-25">
      <section className="flex flex-col gap-5 pb-10 border-b border-b-text-sub2 mb-5">
        <div className="flex flex-col gap-2.5">
          <div className="w-fit">
            <DateFilter
              selectedDate={selectedDate}
              onSelectDate={handleDateChange}
            />
          </div>
        </div>

        <div className="relative w-full h-[240px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
          <span className="text-text-sub text-base">지도</span>
        </div>
      </section>

      <section className="flex flex-col">
        {pagedTrucks.length > 0 ? (
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
