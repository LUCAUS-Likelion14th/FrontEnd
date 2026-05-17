"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Card,
  Pagination,
  LoadingScreen,
  ErrorFallback,
  DetailHeader,
  BoothCategoryFilter,
} from "@/components";
import { FiSearch, FiX } from "react-icons/fi";
import { BoothCategory } from "@/data/boothData";
import { useBoothList } from "@/hooks/booth";

const PAGE_SIZE = 10;

function BoothSearchContent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BoothCategory>("전체");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const hasQuery = debouncedSearch.trim().length > 0;

  const { data, isLoading, isError, refetch } = useBoothList(
    {
      page: currentPage - 1,
      size: PAGE_SIZE,
      category: selectedCategory !== "전체" ? selectedCategory : undefined,
      search: debouncedSearch.trim() || undefined,
    },
    { enabled: hasQuery },
  );

  const booths = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleCategoryChange = (cat: BoothCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <main className="pb-25">
      <DetailHeader title="부스 검색" />

      <div
        className="sticky z-20 bg-white px-4 pt-3 pb-0"
        style={{ top: "calc(3.5rem + env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-2 w-full px-4 py-2 border border-primary/40 rounded-[18px] focus-within:border-primary transition-colors mb-2">
          <FiSearch size={17} className="text-text-sub shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="부스 이름으로 검색해보세요"
            className="flex-1 text-[15px] outline-none bg-transparent placeholder:text-text-sub"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="shrink-0">
              <FiX size={17} className="text-text-sub" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pt-5">
        {!hasQuery ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
              <FiSearch size={28} className="text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[15px] font-semibold text-title">부스를 검색해보세요</p>
              <p className="text-[13px] text-text-sub">부스 이름으로 검색할 수 있어요</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="w-full h-[195px] rounded-[10px] animate-shimmer" />
            ))}
          </div>
        ) : isError ? (
          <ErrorFallback onReset={refetch} />
        ) : booths.length > 0 ? (
          <>
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
                    location={booth.location}
                    locationId={booth.location_id}
                    image={booth.booth_image}
                    isLiked={booth.is_liked}
                    likeCount={booth.like_count}
                  />
                </motion.div>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
              <FiSearch size={28} className="text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[15px] font-semibold text-title">부스를 찾을 수 없어요</p>
              <p className="text-[13px] text-text-sub">다른 검색어를 시도해보세요</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BoothSearchPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BoothSearchContent />
    </Suspense>
  );
}
