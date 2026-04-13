"use client";

import BackButton from "@/components/common/BackButton";
import Pagination from "@/components/common/Pagination";
import LostItemCard from "@/components/info/LostItemCard";
import LostTypeFilter from "@/components/info/LostTypeFilter";
import { useEffect, useState } from "react";
import DateFilter from "@/components/common/DateFilter";
import { lostApi } from "@/lib/api/lostApi";
import { LostItem } from "@/types/lost";

const ITEMS_PER_PAGE = 6;

export default function LostPage() {
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [lostData, setLostData] = useState<LostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchLostItems() {
      setIsLoading(true);
      try {
        const response = await lostApi.getLostItems({
          category: selectedType === "all" ? undefined : selectedType,
          date: selectedDate === "all" ? undefined : selectedDate,
          page: currentPage - 1,
        });

        setLostData(response);
      } catch (error) {
        console.error("분실물 목록 로드 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLostItems();
  }, [selectedDate, selectedType, currentPage]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  return (
    <main className="px-4 pt-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">분실물 찾기</h1>
      </div>

      <div className="flex justify-center border border-[#A1ABBC] rounded-[10px] py-3.75 mb-4">
        <p className="text-[14px] line-height-[18px] text-[#A1ABBC]">
          🔔 매일 축제 STAFF를 통해 접수된 분실물이 업데이트 됩니다.
        </p>
      </div>

      <div className="flex gap-4 mb-7">
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
        <div className="py-20 text-center">로딩 중...</div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {lostData.length > 0 ? (
            lostData.map((item) => (
              <LostItemCard key={item.lost_id} item={item} />
            ))
          ) : (
            <div className="col-span-2 py-20 text-center text-text-sub">
              해당 조건의 분실물이 없습니다.
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
    </main>
  );
}
