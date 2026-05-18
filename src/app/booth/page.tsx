"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import BoothMap from "@/components/booth/BoothMap";
import {
  BoothLocationFilter,
  BoothCategoryFilter,
  DateFilter,
  Pagination,
  Card,
  LoadingScreen,
  ErrorFallback,
} from "@/components";
import { FiSearch } from "react-icons/fi";
import { BoothLocation, BoothCategory, getDefaultDate } from "@/data/boothData";
import { useBoothList, useBoothStampList } from "@/hooks/booth";
// ─── analytics tracking ───
import { useRef } from "react";
import { trackEvent } from "@/lib/api/analytics";
// ─── /analytics tracking ───

const PAGE_SIZE = 8;

function BoothPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isStampMode, setIsStampMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    () => searchParams.get("date") ?? getDefaultDate(),
  );
  const [selectedLocation, setSelectedLocation] =
    useState<BoothLocation | null>(
      () => (searchParams.get("location") as BoothLocation) ?? "서라벌홀 일대",
    );
  const [selectedCategory, setSelectedCategory] = useState<BoothCategory>(
    () => (searchParams.get("category") as BoothCategory) ?? "전체",
  );
  const [currentPage, setCurrentPage] = useState(() => {
    const raw = Number(searchParams.get("page") ?? 1);
    return Number.isInteger(raw) && raw >= 1 ? raw : 1;
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("date", selectedDate);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedCategory !== "전체") params.set("category", selectedCategory);
    if (currentPage > 1) params.set("page", String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    selectedDate,
    selectedLocation,
    selectedCategory,
    currentPage,
  ]);

  const dateParam = selectedDate.replace(/-/g, "").slice(4);

  const {
    data: normalBoothsData,
    isLoading: normalLoading,
    isError: normalError,
    refetch: refetchNormal,
  } = useBoothList(
    {
      page: currentPage - 1,
      size: PAGE_SIZE,
      date: dateParam,
      location: selectedLocation ?? undefined,
      category: selectedCategory !== "전체" ? selectedCategory : undefined,
    },
    { enabled: !isStampMode },
  );

  const {
    data: stampBoothsData,
    isLoading: stampLoading,
    isError: stampError,
    refetch: refetchStamp,
  } = useBoothStampList({
    enabled: isStampMode,
  });

  const normalBooths = normalBoothsData?.content ?? [];
  const stampBooths = stampBoothsData ?? [];

  const booths = isStampMode ? stampBooths : normalBooths;
  const isLoading = isStampMode ? stampLoading : normalLoading;
  const isError = isStampMode ? stampError : normalError;
  const refetch = isStampMode ? refetchStamp : refetchNormal;

  const totalPages = isStampMode ? 1 : (normalBoothsData?.totalPages ?? 1);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsStampMode(false);
    setCurrentPage(1);
  };
  const handleLocationChange = (loc: BoothLocation | null) => {
    setSelectedLocation(loc);
    setCurrentPage(1);
  };
  const handleCategoryChange = (cat: BoothCategory) => {
    setIsStampMode(false);
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleStampClick = () => {
    if (isStampMode) return;
    setIsStampMode(true);
    setCurrentPage(1);
  };

  // 백엔드 로그 ─── analytics tracking ───
  const _analyticsStartTime = useRef<number | null>(null);

  useEffect(() => {
    trackEvent({
      eventType: "booth_list_view",
      payload: {
        date: dateParam,
        location: selectedLocation,
        category: isStampMode ? "STAMP" : selectedCategory,
      },
    });
  }, [dateParam, selectedLocation, selectedCategory, isStampMode]);

  useEffect(() => {
    _analyticsStartTime.current = Date.now();
    return () => {
      if (!_analyticsStartTime.current) return;
      const durationSec = Math.floor(
        (Date.now() - _analyticsStartTime.current) / 1000,
      );
      if (durationSec < 3) return;
      trackEvent({
        eventType: "stay_duration_booth_list",
        payload: { durationSec },
      });
    };
  }, []);
  // 백엔드 로그 ─── /analytics tracking ───

  return (
    <main className="px-4 pt-5 pb-25">
      <section className="flex flex-col gap-[17px] mb-5">
        <div className="flex flex-col gap-2.5">
          <DateFilter
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
          />
          <div className="w-full">
            <BoothLocationFilter
              selectedLocation={selectedLocation}
              onSelectLocation={handleLocationChange}
            />
          </div>
        </div>

        <BoothMap selectedLocation={selectedLocation} />
      </section>

      <section className="flex flex-col">
      <a
        href="/booth/search"
        className="flex items-center gap-3 mb-5 mt-3 px-4 py-3.5 rounded-[14px] bg-white border border-primary/10 shadow-[0_2px_12px_rgba(6,56,125,0.1)] active:opacity-70 transition-opacity"
      >
        <div className="w-9 h-9 rounded-[10px] bg-primary-light flex items-center justify-center flex-shrink-0">
          <FiSearch size={17} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#1A2536] leading-5">
            부스를 찾고 계신가요?
          </p>
          <p className="text-[11px] text-text-sub leading-4">
            원하는 부스를 빠르게 찾아보세요
          </p>
        </div>
        <span className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-primary text-white text-[12px] font-medium">
          부스 검색하기
        </span>
      </a>
        <div className="pt-2 pb-5 overflow-x-auto scrollbar-hide -mx-4">
          <BoothCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            showStamp={["2026-05-18", "2026-05-19", "2026-05-20"].includes(
              selectedDate,
            )}
            onStampClick={handleStampClick}
            isStampActive={isStampMode}
          />
        </div>

        <div className={booths.length > 0 ? "min-h-[596px]" : ""}>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-[195px] rounded-[10px] animate-shimmer"
                />
              ))}
            </div>
          ) : isError ? (
            <ErrorFallback onReset={refetch} />
          ) : booths.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {booths.map((booth, i) => (
                <motion.div
                  key={booth.booth_id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Card
                    id={booth.booth_id}
                    type="booth"
                    name={booth.booth_name}
                    subText={booth.booth_owner}
                    location={booth.location}
                    locationId={booth.location_id}
                    image={booth.booth_image}
                    isLiked={booth.is_liked}
                    likeCount={booth.like_count}
                    date={selectedDate}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                <FiSearch size={28} className="text-primary" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[15px] font-semibold text-title">
                  부스를 찾을 수 없어요
                </p>
                <p className="text-[13px] text-text-sub">
                  조건을 변경해서 다시 검색해보세요
                </p>
              </div>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}
      </section>
    </main>
  );
}

export default function BoothPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BoothPageContent />
    </Suspense>
  );
}
