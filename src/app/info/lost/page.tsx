"use client";

import {
  Pagination,
  LostItemCard,
  LostTypeFilter,
  DetailHeader,
  DateFilter,
  ErrorFallback,
} from "@/components";
import { useState } from "react";
import { useLostItems } from "@/hooks/lost";
import Image from "next/image";
import { FiSearch, FiMessageCircle } from "react-icons/fi";

export default function LostPage() {
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading, isError, refetch } = useLostItems({
    category: selectedType === "all" ? undefined : selectedType,
    date: selectedDate === "all" ? undefined : selectedDate,
    page: currentPage - 1,
  });

  const lostData = response?.content ?? [];
  const totalPages = response?.totalPages ?? 1;

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
        <div className="flex items-center h-12 px-[11.5px] mb-3 bg-primary-light rounded-[10px] gap-2">
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

        <a
          href="http://pf.kakao.com/_xktxcxaxj"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mb-7 px-4 py-3.5 rounded-[14px] bg-white border border-primary/10 shadow-[0_2px_12px_rgba(6,56,125,0.1)] active:opacity-70 transition-opacity"
        >
          <div className="w-9 h-9 rounded-[10px] bg-primary-light flex items-center justify-center flex-shrink-0">
            <FiMessageCircle size={17} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#1A2536] leading-5">
              분실물을 찾지 못하셨나요?
            </p>
            <p className="text-[11px] text-text-sub leading-4">
              카카오톡 채널로 직접 문의하세요
            </p>
          </div>
          <span className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-primary text-white text-[12px] font-medium">
            문의하기
          </span>
        </a>

        <div className="flex gap-4 mb-5">
          <DateFilter
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
            showAll
          />
          <LostTypeFilter
            selectedType={selectedType}
            onSelectType={handleTypeChange}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[195px] rounded-[10px] animate-shimmer"
              />
            ))}
          </div>
        ) : isError ? (
          <ErrorFallback onReset={refetch} />
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {lostData.length > 0 ? (
              lostData.map((item) => (
                <LostItemCard key={item.lost_id} item={item} />
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center gap-3 py-16">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FiSearch size={28} className="text-primary" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[15px] font-semibold text-title">
                    해당 조건의 분실물이 없어요
                  </p>
                  <p className="text-[13px] text-text-sub">
                    조건을 변경해서 다시 검색해보세요
                  </p>
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
