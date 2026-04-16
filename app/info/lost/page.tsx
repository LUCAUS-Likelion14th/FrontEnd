"use client";

import BackButton from "@/components/common/BackButton";
import Pagination from "@/components/common/Pagination";
import LostItemCard from "@/components/info/LostItemCard";
import LostTypeFilter from "@/components/info/LostTypeFilter";
import { useEffect, useState } from "react";
import DateFilter from "@/components/common/DateFilter";
import { lostApi } from "@/lib/api/lostApi";
import { LostItem } from "@/types/lost";
import Image from "next/image";
import DetailHeader from "@/components/detail/DetailHeader";

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
    <main className="pb-25">
      <DetailHeader title="분실물 찾기" />

      <div className="px-4">
        <div className="flex items-center h-12 px-[11.5px] mb-7 border border-primary rounded-[10px] gap-2">
          <Image
            src={"/icons/highlight.png"}
            alt={"하이라이트 아이콘"}
            width={16}
            height={16}
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
      </div>
    </main>
  );
}
