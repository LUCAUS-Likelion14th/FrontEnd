"use client";

import { Pagination, LostItemCard, LostTypeFilter, DetailHeader, DateFilter } from "@/components";
import { useState } from "react";
import { useLostItems } from "@/hooks/queries/lost";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const ITEMS_PER_PAGE = 6;

export default function LostPage() {
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: lostData = [], isLoading } = useLostItems({
    category: selectedType === "all" ? undefined : selectedType,
    date: selectedDate === "all" ? undefined : selectedDate,
    page: currentPage - 1,
  });

  const totalPages = lostData.length < ITEMS_PER_PAGE ? currentPage : currentPage + 1;

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  return (
    <main className="pb-25">
      <DetailHeader title="분실물 찾기" />

      <div className="px-4">
        <div className="flex items-center h-12 px-[11.5px] mb-7 bg-[#EEF3FB] rounded-[10px] gap-2">
          <Image
            src={"/icons/highlight.png"}
            alt={"하이라이트 아이콘"}
            width={32}
            height={32}
          />
          <span className="text-[14px] text-primary leading-4.5">
            매일 축제 STAFF를 통해 접수된 분실물이 업데이트 됩니다.
          </span>
        </div>

        <div className="flex gap-4 mb-5">
          <DateFilter
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
          />
          <LostTypeFilter
            selectedType={selectedType}
            onSelectType={handleTypeChange}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-[137px] rounded-[10px] bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {lostData.length > 0 ? (
              lostData.map((item) => (
                <LostItemCard key={item.lost_id} item={item} />
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center gap-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#EEF3FB] flex items-center justify-center">
                  <FiSearch size={28} className="text-[#06387D]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[15px] font-semibold text-[#3B4A5A]">해당 조건의 분실물이 없어요</p>
                  <p className="text-[13px] text-text-sub">조건을 변경해서 다시 검색해보세요</p>
                </div>
              </div>
            )}
          </div>
        )}

        {lostData.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}
