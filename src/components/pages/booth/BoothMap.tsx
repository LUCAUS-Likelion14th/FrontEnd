"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import map1 from "@/assets/webp/map1_4x.webp";
import map2 from "@/assets/webp/map2_4x.webp";
import map3 from "@/assets/webp/map3_4x.webp";
import { BoothLocation } from "@/data/boothData";

const MAP_IMAGE = {
  "서라벌홀 일대": map1,
  "대운동장": map2,
  "후문 일대": map3,
} as const;

const DEFAULT_MAP = map1;
const MIN_SCALE = 1;
const MAX_SCALE = 4;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

type Props = { selectedLocation?: BoothLocation | null };

export default function BoothMap({ selectedLocation }: Props) {
  const mapImage =
    (selectedLocation && MAP_IMAGE[selectedLocation as keyof typeof MAP_IMAGE]) ??
    DEFAULT_MAP;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [coverSize, setCoverSize] = useState({ w: 0, h: 0 });

  const scaleRef = useRef(1);
  const posRef = useRef({ x: 0, y: 0 });
  const coverSizeRef = useRef({ w: 0, h: 0 });

  const sync = useCallback((s: number, p: { x: number; y: number }) => {
    scaleRef.current = s;
    posRef.current = p;
    setScale(s);
    setPos(p);
  }, []);

  // Compute "cover" dimensions so the image always fills the container
  // regardless of device width, while preserving aspect ratio
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const cW = el.clientWidth;
      const cH = el.clientHeight;
      const aspect = mapImage.width / mapImage.height;

      let w: number, h: number;
      if (aspect * cH >= cW) {
        h = cH;
        w = aspect * cH;
      } else {
        w = cW;
        h = cW / aspect;
      }

      coverSizeRef.current = { w, h };
      setCoverSize({ w, h });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mapImage]);

  // transformOrigin: left center
  // At scale=1, y=0: image is centered vertically (auto-overflow if taller than container)
  // X clamp: left edge ≤ 0, right edge ≥ containerW
  // Y clamp: top edge ≤ 0, bottom edge ≥ containerH
  const clampPos = useCallback(
    (x: number, y: number, s: number) => {
      const el = containerRef.current;
      if (!el) return { x, y };
      const cW = el.clientWidth;
      const cH = el.clientHeight;
      const { w: rW, h: rH } = coverSizeRef.current;
      if (rW === 0) return { x, y };

      const minX = Math.min(0, cW - rW * s);
      const maxX = 0;

      // transformOrigin Y = cH/2; image top at ty + cH/2 - rH*s/2
      const maxY = (rH * s - cH) / 2;
      const minY = -maxY;

      return { x: clamp(x, minX, maxX), y: clamp(y, minY, maxY) };
    },
    []
  );

  // Reset position when map changes
  useEffect(() => {
    sync(1, { x: 0, y: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapImage]);

  /* ── Touch ── */
  const touchRef = useRef<{ x: number; y: number; dist: number | null } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dist: null };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchRef.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        dist: Math.hypot(dx, dy),
      };
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (!touchRef.current) return;
      const s = scaleRef.current;
      const p = posRef.current;

      if (e.touches.length === 1 && touchRef.current.dist === null) {
        const dx = e.touches[0].clientX - touchRef.current.x;
        const dy = e.touches[0].clientY - touchRef.current.y;
        touchRef.current.x = e.touches[0].clientX;
        touchRef.current.y = e.touches[0].clientY;
        sync(s, clampPos(p.x + dx, p.y + dy, s));
      } else if (e.touches.length === 2 && touchRef.current.dist !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDist = Math.hypot(dx, dy);
        const newScale = clamp(s * (newDist / touchRef.current.dist), MIN_SCALE, MAX_SCALE);
        touchRef.current.dist = newDist;

        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const pdx = midX - touchRef.current.x;
        const pdy = midY - touchRef.current.y;
        touchRef.current.x = midX;
        touchRef.current.y = midY;

        sync(newScale, clampPos(p.x + pdx, p.y + pdy, newScale));
      }
    },
    [clampPos, sync]
  );

  const handleTouchEnd = useCallback(() => {
    touchRef.current = null;
  }, []);

  /* ── Mouse ── */
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!mouseRef.current) return;
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      mouseRef.current = { x: e.clientX, y: e.clientY };
      sync(scaleRef.current, clampPos(posRef.current.x + dx, posRef.current.y + dy, scaleRef.current));
    },
    [clampPos, sync]
  );

  const handleMouseUp = useCallback(() => {
    mouseRef.current = null;
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const newScale = clamp(scaleRef.current * (e.deltaY > 0 ? 0.9 : 1.1), MIN_SCALE, MAX_SCALE);
      sync(newScale, clampPos(posRef.current.x, posRef.current.y, newScale));
    },
    [clampPos, sync]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[240px] rounded-[10px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          transformOrigin: "left center",
          willChange: "transform",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mapImage.src}
          alt="부스 지도"
          style={{
            width: coverSize.w > 0 ? `${coverSize.w}px` : "auto",
            height: coverSize.h > 0 ? `${coverSize.h}px` : "100%",
            maxWidth: "none",
            display: "block",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
