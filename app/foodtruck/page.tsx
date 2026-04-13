"use client";

import { useMemo, useState } from "react";
import FoodTruckCard from "@/components/foodtruck/FoodTruckCard";
import BoothPagination from "@/components/booth/BoothPagination"; // 부스 페이지네이션 재사용
import { FOODTRUCK_DATA } from "@/data/foodtruckData";
import DateFilter from "@/components/common/DateFilter";

const PAGE_SIZE = 8;

export default function FoodTruckPage() {
  const [selectedDate, setSelectedDate] = useState("2026-05-21");
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링 로직: 날짜 필터만 적용 (Figma 디자인 기반)
  const filteredTrucks = useMemo(() => {
    return FOODTRUCK_DATA.filter((truck) => {
      // "all"이 선택된 경우 모든 날짜 표시, 특정 날짜 선택 시 해당 날짜 포함 여부 확인
      if (selectedDate !== "all" && !truck.date.includes(selectedDate))
        return false;
      return true;
    });
  }, [selectedDate]);

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredTrucks.length / PAGE_SIZE));
  const pagedTrucks = filteredTrucks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // 필터 변경 핸들러
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
  };

  return (
    <main className="px-4 pt-5 pb-25">
      {/* 필터 영역 */}
      <section className="flex flex-col gap-5 pb-10 border-b border-b-text-sub2 mb-5">
        {/* 날짜 필터 */}
        <div className="flex flex-col gap-2.5">
          <div className="w-fit">
            <DateFilter
              selectedDate={selectedDate}
              onSelectDate={handleDateChange}
            />
          </div>
        </div>

        {/* 지도 플레이스홀더 */}
        <div className="relative w-full h-[240px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
          <span className="text-text-sub text-base">지도</span>
        </div>
      </section>

      {/* 카드 목록 */}
      <section className="flex flex-col">
        {/* 푸드트럭 카드 그리드 */}
        {pagedTrucks.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {pagedTrucks.map((truck) => (
              <FoodTruckCard key={truck.food_id} truck={truck} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 text-text-sub text-base">
            해당 조건에 맞는 푸드트럭이 없습니다.
          </div>
        )}

        {/* 페이지네이션 (BoothPagination 재사용) */}
        <BoothPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}
