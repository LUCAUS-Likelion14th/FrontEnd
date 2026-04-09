"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { Promotion } from "@/types/home";
import "swiper/css";

interface Props {
  promotions: Promotion[]
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

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={GAP}
        slidesPerView={1.2}
        centeredSlides
        loop
        autoplay={{ delay: AUTO_SLIDE_INTERVAL, disableOnInteraction: false }}
        onSwiper={setSwiperRef}
        onRealIndexChange={(swiper) => setCurrent(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {promotions.map((item) => (
          <SwiperSlide key={item.id}>
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

      <div className="flex justify-center items-center gap-[6px] mt-2">
        {promotions.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef?.slideToLoop(i)}
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