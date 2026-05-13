"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BoothLocationFilter, BoothCategoryFilter, BoothSearchBar, DateFilter, Pagination, Card } from "@/components";
import { BoothLocation, BoothCategory } from "@/data/boothData";
import { useBoothList, useBoothStampList } from "@/hooks/queries/booth";

const PAGE_SIZE = 8;

function BoothPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isStampMode, setIsStampMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    () => searchParams.get("date") ?? "all"
  );
  const [selectedLocation, setSelectedLocation] = useState<BoothLocation | null>(
    () => (searchParams.get("location") as BoothLocation) ?? null
  );
  const [selectedCategory, setSelectedCategory] = useState<BoothCategory>(
    () => (searchParams.get("category") as BoothCategory) ?? "전체"
  );
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(() => searchParams.get("q") ?? "");
  const [currentPage, setCurrentPage] = useState(() => Number(searchParams.get("page") ?? 1));

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate !== "all") params.set("date", selectedDate);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedCategory !== "전체") params.set("category", selectedCategory);
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (currentPage > 1) params.set("page", String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedDate, selectedLocation, selectedCategory, debouncedSearch, currentPage]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const dateParam = selectedDate === "all" ? undefined : selectedDate.replace(/-/g, "").slice(4);

  const { data: normalBooths = [], isLoading: normalLoading } = useBoothList(
    { date: dateParam, category: selectedCategory !== "전체" ? selectedCategory : undefined, search: debouncedSearch.trim() || undefined },
    { enabled: !isStampMode }
  );

  const { data: stampBooths = [], isLoading: stampLoading } = useBoothStampList(
    { enabled: isStampMode }
  );

  const booths = isStampMode ? stampBooths : normalBooths;
  const isLoading = isStampMode ? stampLoading : normalLoading;
  const totalPages = Math.max(1, Math.ceil(booths.length / PAGE_SIZE));

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

        <div className="relative w-full h-[240px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center">
          <span className="text-text-sub text-base">지도</span>
          <div className="absolute right-4 bottom-5 flex flex-col gap-2">
            <button className="w-7 h-7 bg-white rounded-full shadow-[0px_3px_1.5px_rgba(0,0,0,0.25)] flex items-center justify-center text-lg leading-none">
              +
            </button>
            <button className="w-7 h-7 bg-white rounded-full shadow-[0px_3px_1.5px_rgba(0,0,0,0.25)] flex items-center justify-center text-lg leading-none">
              −
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col">
        <BoothSearchBar value={searchQuery} onChange={handleSearchChange} />
        <div className="pt-2.5 pb-5 overflow-x-auto scrollbar-hide">
          <BoothCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            showStamp={["2026-05-18", "2026-05-19", "2026-05-20"].includes(selectedDate)}
            onStampClick={handleStampClick}
            isStampActive={isStampMode}
          />
        </div>

        <div className="min-h-[596px]">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-[137px] rounded-[10px] bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : booths.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {booths.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((booth) => (
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
            <div className="flex items-center justify-center h-full text-text-sub text-base">
              해당 조건에 맞는 부스가 없습니다.
            </div>
          )}
        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
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
