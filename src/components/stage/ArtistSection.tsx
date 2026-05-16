"use client";

import { useRef, useState, useEffect } from "react";
import { Stage } from "@/types/stage";
import ArtistButton from "./ArtistButton";

type ArtistSectionProps = {
  data: Stage[];
};

export default function ArtistSection({ data }: ArtistSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [thumbWidthRatio, setThumbWidthRatio] = useState(1);
  const [thumbLeftRatio, setThumbLeftRatio] = useState(0);

  const updateScrollbar = () => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    const ratio = scrollWidth > 0 ? Math.min(1, clientWidth / scrollWidth) : 1;
    setThumbWidthRatio(ratio);

    const maxScrollLeft = scrollWidth - clientWidth;
    const leftRatio =
      maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (1 - ratio) * 100 : 0;
    setThumbLeftRatio(leftRatio);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollbar();
    el.addEventListener("scroll", updateScrollbar);

    const ro = new ResizeObserver(updateScrollbar);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollbar);
      ro.disconnect();
    };
  }, [data]);

  const showScrollbar = thumbWidthRatio < 1;

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto whitespace-nowrap pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {data.map((item) => (
          <ArtistButton
            key={item.stage_id}
            id={item.stage_id}
            image={item.logoImage}
            artist={item.performer}
          />
        ))}
      </div>

      {showScrollbar && (
        <div
          style={{
            position: "absolute",
            bottom: 5,
            left: 3,
            right: 3,
            height: 4,
            borderRadius: 9999,
            backgroundColor: "rgba(0,0,0,0.08)", // BoothMap의 트랙 배경색 적용
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${Math.max(0, Math.min(thumbLeftRatio, 100 - thumbWidthRatio * 100))}%`,
              width: `${thumbWidthRatio * 100}%`,
              height: "100%",
              borderRadius: 9999,
              backgroundColor: "rgba(0,0,0,0.2)", // BoothMap의 핸들 색상 적용
              transition: "left 0.05s linear", // BoothMap의 transition 시간 적용
            }}
          />
        </div>
      )}
    </div>
  );
}
