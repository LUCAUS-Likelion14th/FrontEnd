"use client";

import { useState, useMemo } from "react";
import BoothDateFilter from "@/components/booth/BoothDateFilter";
import BoothLocationFilter from "@/components/booth/BoothLocationFilter";
import BoothCategoryFilter from "@/components/booth/BoothCategoryFilter";
import BoothSearchBar from "@/components/booth/BoothSearchBar";
import BoothCard from "@/components/booth/BoothCard";
import BoothPagination from "@/components/booth/BoothPagination";
import {
  BOOTH_DATA,
  BoothLocation,
  BoothCategory,
} from "@/data/boothData";

const PAGE_SIZE = 8;

export default function BoothPage() {
  const [selectedDate, setSelectedDate] = useState("2026-05-21");
  const [selectedLocation, setSelectedLocation] = useState<BoothLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BoothCategory>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링 로직
  const filteredBooths = useMemo(() => {
    return BOOTH_DATA.filter((booth) => {
      // 날짜 필터
      if (selectedDate !== "all" && !booth.date.includes(selectedDate)) return false;

      // 장소 필터
      if (selectedLocation) {
        const locationMap: Record<BoothLocation, string> = {
          "해방광장 일대": "해방광장",
          "후문 일대": "후문",
          대운동장: "대운동장",
        };
        if (!booth.location.includes(locationMap[selectedLocation])) return false;
      }

      // 카테고리 필터
      if (selectedCategory !== "전체") {
        if (!booth.booth_category.includes(selectedCategory)) return false;
      }

      // 검색어 필터
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        if (
          !booth.booth_name.toLowerCase().includes(q) &&
          !booth.booth_category.some((c) => c.toLowerCase().includes(q))
        ) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDate, selectedLocation, selectedCategory, searchQuery]);

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredBooths.length / PAGE_SIZE));
  const pagedBooths = filteredBooths.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 필터 변경 시 페이지 리셋
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };
  const handleLocationChange = (loc: BoothLocation | null) => {
    setSelectedLocation(loc);
    setCurrentPage(1);
  };
  const handleCategoryChange = (cat: BoothCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  return (
    <main className="px-4 pt-2.5 pb-25">
      {/* 제목 */}
      <h1 className="text-[24px] font-semibold mb-4">부스 정보</h1>

      {/* 필터 영역 */}
      <section className="flex flex-col gap-[17px] mb-12">
        {/* 날짜 + 장소 필터 */}
        <div className="flex flex-col gap-2.5">
          <BoothDateFilter
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
          />
          <div className="overflow-x-auto">
            <BoothLocationFilter
              selectedLocation={selectedLocation}
              onSelectLocation={handleLocationChange}
            />
          </div>
        </div>

        {selectedLocation === "대운동장" ? (
          <>
            {/* 대운동장: 지도 플레이스홀더 + 도장판 바로 가기 */}
            <div className="relative w-full h-[200px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
              <span className="text-text-sub text-base">지도</span>
            </div>
            <button className="w-full py-3 bg-primary text-white text-base font-semibold rounded-[10px]">
              도장판 바로 가기
            </button>
          </>
        ) : (
          /* 기본: 지도 플레이스홀더 */
          <div className="relative w-full h-[200px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
            <span className="text-text-sub text-base">지도</span>
            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <button className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-lg leading-none">
                +
              </button>
              <button className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-lg leading-none">
                −
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 검색 + 카테고리 + 카드 목록 */}
      <section className="flex flex-col gap-5">
        {/* 대운동장이 아닐 때만 검색바 / 카테고리 표시 */}
        {selectedLocation !== "대운동장" && (
          <>
            <BoothSearchBar value={searchQuery} onChange={handleSearchChange} />
            <div className="overflow-x-auto">
              <BoothCategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
              />
            </div>
          </>
        )}

        {/* 부스 카드 그리드 */}
        {pagedBooths.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {pagedBooths.map((booth) => (
              <BoothCard key={booth.booth_id} booth={booth} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 text-text-sub text-base">
            해당 조건에 맞는 부스가 없습니다.
          </div>
        )}

        {/* 페이지네이션 */}
        <BoothPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}
