"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { Promotion } from "@/types/home";
import "swiper/css";

interface Props {
  promotions: Promotion[];
}

const AUTO_SLIDE_INTERVAL = 4000;
const GAP = 12;

export default function NoticeSwiper({ promotions }: Props) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [current, setCurrent] = useState(0);

  const handleClick = (instagram?: string) => {
    if (!instagram) return;
    window.open(instagram, "_blank", "noopener,noreferrer");
  };

  if (promotions.length === 0) return null;

  const multiple = promotions.length > 1;
  const n = promotions.length;

  // 슬라이드를 3배 복제해 양옆이 항상 채워지도록 함
  const slides = multiple
    ? [...promotions, ...promotions, ...promotions]
    : promotions;

  // 중간 세트에서 시작
  const initialSlide = multiple ? n : 0;

  // 트랜지션 끝에 가장자리 도달 시 중간으로 조용히 점프
  const handleTransitionEnd = (swiper: SwiperType) => {
    if (!multiple) return;
    const idx = swiper.activeIndex;
    if (idx < n) {
      setTimeout(() => swiper.slideTo(idx + n, 0, false), 0);
    } else if (idx >= n * 2) {
      setTimeout(() => swiper.slideTo(idx - n, 0, false), 0);
    }
  };

  // 자동 슬라이드
  useEffect(() => {
    if (!multiple || !swiperRef) return;
    const swiper = swiperRef;
    const id = window.setInterval(() => {
      if (swiper.destroyed) return;
      swiper.slideNext();
    }, AUTO_SLIDE_INTERVAL);
    return () => window.clearInterval(id);
  }, [multiple, swiperRef]);

  return (
    <div className="w-full min-w-0">
      <Swiper
        spaceBetween={GAP}
        slidesPerView={1.2}
        centeredSlides
        initialSlide={initialSlide}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setCurrent(swiper.activeIndex % n)}
        onSlideChangeTransitionEnd={handleTransitionEnd}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {slides.map((item, i) => (
          <SwiperSlide key={`${item.id}-${i}`}>
            <div
              className="relative aspect-square rounded-[10px] overflow-hidden cursor-pointer"
              onClick={() => handleClick(item.instagram)}
            >
              <Image
                src={item.image}
                alt={`프로모션 ${item.id}`}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center items-center gap-1.5 mt-2">
        {promotions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => swiperRef?.slideTo(n + i)}
            aria-label={`${i + 1}번 공지로 이동`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-primary/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
