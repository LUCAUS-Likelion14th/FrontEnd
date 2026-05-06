"use client";

import { useState, useEffect } from "react";
import {
  BoothLocationFilter,
  BoothCategoryFilter,
  BoothSearchBar,
  DateFilter,
  Pagination,
  Card,
} from "@/components";
import { BoothLocation, BoothCategory } from "@/data/boothData";
import { BoothApi } from "@/lib/api/boothApi";
import type { Booth } from "@/types/booth";

const LOCATION_MAP: Record<BoothLocation, string> = {
  "해방광장 일대": "해방광장",
  "후문 일대": "후문",
  대운동장: "대운동장",
};

const PAGE_SIZE = 8;

export default function BoothPage() {
  const [selectedDate, setSelectedDate] = useState("2026-05-21");
  const [selectedLocation, setSelectedLocation] =
    useState<BoothLocation | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<BoothCategory>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [booths, setBooths] = useState<Booth[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooths = async () => {
      setLoading(true);
      try {
        const data = await BoothApi.getBooths({
          date: selectedDate !== "all" ? selectedDate : undefined,
          page: currentPage - 1,
          location: selectedLocation ? LOCATION_MAP[selectedLocation] : undefined,
          category: selectedCategory !== "전체" ? selectedCategory : undefined,
          search: searchQuery.trim() || undefined,
        });
        setBooths(data);
        setTotalPages(data.length < PAGE_SIZE ? currentPage : currentPage + 1);
      } catch {
        setBooths([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, [selectedDate, selectedLocation, selectedCategory, searchQuery, currentPage]);

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
    <main className="px-4 pt-5 pb-25">
      {/* 필터 영역 */}
      <section className="flex flex-col gap-[17px] mb-5">
        <div className="flex flex-col gap-2.5">
          <DateFilter
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
          <div className="flex flex-col gap-14">
            <div className="relative w-full h-[240px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
              <span className="text-text-sub text-base">지도</span>
            </div>
            <button className="w-full py-3 bg-primary text-white text-base font-semibold rounded-[10px]">
              도장판 바로 가기
            </button>
          </div>
        ) : (
          <div className="relative w-full h-[240px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
            <span className="text-text-sub text-base">지도</span>
            <div className="absolute right-4 bottom-5 flex flex-col gap-2">
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
      <section className="flex flex-col">
        {selectedLocation !== "대운동장" && (
          <>
            <BoothSearchBar value={searchQuery} onChange={handleSearchChange} />
            <div className="pt-2.5 pb-5 overflow-x-auto">
              <BoothCategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
              />
            </div>
          </>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-text-sub text-base">
            불러오는 중...
          </div>
        ) : booths.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {booths.map((booth) => (
              <Card
                key={booth.booth_id}
                id={booth.booth_id}
                type="booth"
                name={booth.booth_name}
                subText={booth.booth_owner}
                location={booth.booth_location}
                image={booth.booth_image}
                isLiked={booth.is_liked}
                likeCount={booth.like_count}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 text-text-sub text-base">
            해당 조건에 맞는 부스가 없습니다.
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
