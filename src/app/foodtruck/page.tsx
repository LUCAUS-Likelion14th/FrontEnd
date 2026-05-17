"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useFoodTruckList } from "@/hooks/foodtruck";
import { Card, LoadingScreen, Pagination, ErrorFallback } from "@/components";
import FoodTruckMap from "@/components/foodtruck/FoodTruckMap";
import { FiSearch } from "react-icons/fi";
import { trackEvent } from "@/lib/api/analytics";

const PAGE_SIZE = 8;

function FoodTruckPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() =>
    Number(searchParams.get("page") ?? 1),
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage]);

  const { data: trucks = [], isLoading, isError, refetch } = useFoodTruckList({});

  const pagedTrucks = trucks.slice(
           (currentPage - 1) * PAGE_SIZE,
           currentPage * PAGE_SIZE,
  );

  const totalPages = Math.max(1, Math.ceil(trucks.length / PAGE_SIZE));

  // 백 로그
  const startTime = useRef(Date.now());
  useEffect(() => {
    trackEvent({
      eventType: "foodtruck_list_view",
      payload: {
        page: currentPage,
        visibleFoodtruckIds: pagedTrucks.map((truck) => truck.id),
      },
    });
  }, [currentPage,pagedTrucks]);

  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      const durationSec = Math.floor(
        (Date.now() - startTime.current) / 1000
      );

      if (durationSec < 3) return;

      trackEvent({
        eventType: "foodtruck_list_duration",
        payload: {
          durationSec,
          page: currentPage,
        },
      });
    };
  }, [currentPage]);




  return (
    <main className="px-4 pt-5 pb-25">
      <section className="flex flex-col pb-10 border-b border-b-text-sub2 mb-5">
        <FoodTruckMap />
      </section>

      <section className="flex flex-col">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[195px] rounded-[10px] animate-shimmer"
              />
            ))}
          </div>
        ) : isError ? (
          <ErrorFallback onReset={refetch} />
        ) : pagedTrucks.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {pagedTrucks.map((truck, i) => (
              <motion.div
                key={truck.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              >
                <Card
                  id={truck.id}
                  type="foodtruck"
                  from="all_list"
                  name={truck.name}
                  location={truck.bestMenu}
                  image={truck.image}
                  isLiked={truck.liked}
                  likeCount={truck.likeCount}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
              <FiSearch size={28} className="text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[15px] font-semibold text-title">
                푸드트럭을 찾을 수 없어요
              </p>
              <p className="text-[13px] text-text-sub">
                조건을 변경해서 다시 검색해보세요
              </p>
            </div>
          </div>
        )}

        {trucks.length > 0 && (
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

export default function FoodTruckPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <FoodTruckPageContent />
    </Suspense>
  );
}
