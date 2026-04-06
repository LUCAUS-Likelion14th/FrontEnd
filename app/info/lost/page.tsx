"use client";

import BoothDateFilter from "@/components/booth/BoothDateFilter";
import BackButton from "@/components/common/BackButton";
import Pagination from "@/components/common/Pagination";
import LostItemCard, { lostItems } from "@/components/info/LostItemCard";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function LostPage() {
  const [selectedDate, setSelectedDate] = useState("all");

  const filteredItems =
    selectedDate === "all"
      ? lostItems
      : lostItems.filter((item) => item.date.startsWith(selectedDate));

  const { page, setPage, totalPages, currentData } = usePagination(
    filteredItems,
    ITEMS_PER_PAGE,
  );

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

      <div className="mb-7">
        <BoothDateFilter
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {currentData.map((item) => (
          <LostItemCard key={item.id} item={item} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  );
}
