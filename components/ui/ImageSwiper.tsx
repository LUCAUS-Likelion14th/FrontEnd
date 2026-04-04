"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

type NoticeImage = {
  id: number;
  imageUrl: string;
  alt: string;
  link?: string;
};

const NOTICE_IMAGES: NoticeImage[] = [
  { id: 1, imageUrl: "/notice1.png", alt: "공지 1", link: "https://www.instagram.com" },
  { id: 2, imageUrl: "/notice1.png", alt: "공지 2", link: "https://www.instagram.com" },
  { id: 3, imageUrl: "/notice1.png", alt: "공지 3", link: "https://www.instagram.com" },
  { id: 4, imageUrl: "/notice1.png", alt: "공지 4", link: "https://www.instagram.com" },
  { id: 5, imageUrl: "/notice1.png", alt: "공지 5", link: "https://www.instagram.com" },
];

const AUTO_SLIDE_INTERVAL = 4000;
const GAP = 12;

export default function NoticeSwiper() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [current, setCurrent] = useState(0);

  const handleClick = (link?: string) => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={GAP}
        slidesPerView={1.2} // 모바일 기본
        centeredSlides
        loop
        autoplay={{ delay: AUTO_SLIDE_INTERVAL, disableOnInteraction: false }}
        onSwiper={setSwiperRef}
        onRealIndexChange={(swiper) => setCurrent(swiper.realIndex)}
        breakpoints = {{
          640: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          }
        }}
      >
        {NOTICE_IMAGES.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative aspect-square rounded-[10px] overflow-hidden cursor-pointer"
              onClick={() => handleClick(item.link)}
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-[6px] mt-2">
        {NOTICE_IMAGES.map((_, i) => (
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