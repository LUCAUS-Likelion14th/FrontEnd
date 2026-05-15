"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import BoothMap from "@/components/pages/booth/BoothMap";
import {
  BoothLocationFilter,
  BoothCategoryFilter,
  BoothSearchBar,
  DateFilter,
  Pagination,
  Card,
} from "@/components";
import { FiSearch } from "react-icons/fi";
import { BoothLocation, BoothCategory } from "@/data/boothData";
import { useBoothList, useBoothStampList } from "@/hooks/queries/booth";

const PAGE_SIZE = 8;

function BoothPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isStampMode, setIsStampMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    () => searchParams.get("date") ?? "all",
  );
  const [selectedLocation, setSelectedLocation] =
    useState<BoothLocation | null>(
      () => (searchParams.get("location") as BoothLocation) ?? null,
    );
  const [selectedCategory, setSelectedCategory] = useState<BoothCategory>(
    () => (searchParams.get("category") as BoothCategory) ?? "전체",
  );
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [currentPage, setCurrentPage] = useState(() =>
    Number(searchParams.get("page") ?? 1),
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate !== "all") params.set("date", selectedDate);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedCategory !== "전체") params.set("category", selectedCategory);
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (currentPage > 1) params.set("page", String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    selectedDate,
    selectedLocation,
    selectedCategory,
    debouncedSearch,
    currentPage,
  ]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const dateParam =
    selectedDate === "all"
      ? undefined
      : selectedDate.replace(/-/g, "").slice(4);

  const { data: normalBoothsData, isLoading: normalLoading } = useBoothList(
    {
      page: currentPage - 1,
      size: PAGE_SIZE,
      date: dateParam,
      location: selectedLocation ?? undefined,
      category: selectedCategory !== "전체" ? selectedCategory : undefined,
      search: debouncedSearch.trim() || undefined,
    },
    { enabled: !isStampMode },
  );

  const { data: stampBoothsData, isLoading: stampLoading } = useBoothStampList({
    enabled: isStampMode,
  });

  const normalBooths = normalBoothsData?.content ?? [];
  const stampBooths = stampBoothsData?.data ?? [];

  const booths = isStampMode ? stampBooths : normalBooths;
  const isLoading = isStampMode ? stampLoading : normalLoading;

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
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };
  const handleStampClick = () => {
    if (isStampMode) return;
    setIsStampMode(true);
    setCurrentPage(1);
  };

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
        <BoothSearchBar value={searchQuery} onChange={handleSearchChange} />
        <div className="pt-2.5 pb-5 overflow-x-auto scrollbar-hide">
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
                  className="w-full h-[137px] rounded-[10px] bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : booths.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {booths.map((booth, i) => (
                <motion.div
                  key={booth.booth_id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                >
                  <Card
                    id={booth.booth_id}
                    type="booth"
                    name={booth.booth_name}
                    subText={booth.booth_owner}
                    location={booth.booth_location}
                    image={booth.booth_image}
                    isLiked={booth.is_liked}
                    likeCount={booth.like_count}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <div className="w-16 h-16 rounded-full bg-[#EEF3FB] flex items-center justify-center">
                <FiSearch size={28} className="text-[#06387D]" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[15px] font-semibold text-[#3B4A5A]">
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
    <Suspense>
      <BoothPageContent />
    </Suspense>
  );
}
