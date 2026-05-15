"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { BoothLocation } from "@/data/boothData";

type MapConfig = { src: string; width: number; height: number };

const MAP_CONFIG: Record<string, MapConfig> = {
  "서라벌홀 일대": { src: "/maps/Seorabeol.svg", width: 389, height: 259 },
  "대운동장":      { src: "/maps/playground.svg", width: 389, height: 259 },
  "후문 일대":     { src: "/maps/backdoor.svg", width: 776, height: 259 },
};

const DEFAULT_MAP = MAP_CONFIG["서라벌홀 일대"];
const NO_PAN_KEYS = new Set(["서라벌홀 일대", "대운동장"]);

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

type Props = { selectedLocation?: BoothLocation | null };

export default function BoothMap({ selectedLocation }: Props) {
  const mapConfig: MapConfig =
    (selectedLocation && MAP_CONFIG[selectedLocation as keyof typeof MAP_CONFIG]) ??
    DEFAULT_MAP;

  const noPan = NO_PAN_KEYS.has(selectedLocation ?? "서라벌홀 일대");

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  const scaleRef = useRef(1);
  const posRef = useRef({ x: 0, y: 0 });
  const imgSizeRef = useRef({ w: 0, h: 0 });

  const sync = useCallback((s: number, p: { x: number; y: number }) => {
    scaleRef.current = s;
    posRef.current = p;
    setScale(s);
    setPos(p);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const cW = el.clientWidth;
      const cH = el.clientHeight;
      const aspect = mapConfig.width / mapConfig.height;
      const containerAspect = cW / cH;

      let w: number, h: number;
      if (noPan) {
        // contain: entire image visible, no clipping
        if (containerAspect > aspect) {
          h = cH; w = aspect * cH;
        } else {
          w = cW; h = cW / aspect;
        }
      } else {
        // cover: fill container, allow panning
        if (aspect * cH >= cW) {
          h = cH; w = aspect * cH;
        } else {
          w = cW; h = cW / aspect;
        }
      }

      imgSizeRef.current = { w, h };
      setImgSize({ w, h });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mapConfig, noPan]);

  const clampPos = useCallback(
    (x: number, y: number, s: number) => {
      const el = containerRef.current;
      if (!el) return { x, y };
      const cW = el.clientWidth;
      const cH = el.clientHeight;
      const { w: rW, h: rH } = imgSizeRef.current;
      if (rW === 0) return { x, y };

      const minX = Math.min(0, cW - rW * s);
      const maxX = 0;
      const maxY = (rH * s - cH) / 2;
      const minY = -maxY;

      return { x: clamp(x, minX, maxX), y: clamp(y, minY, maxY) };
    },
    []
  );

  useEffect(() => {
    sync(1, { x: 0, y: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapConfig]);

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
        if (!noPan) {
          sync(s, clampPos(p.x + dx, p.y + dy, s));
        }
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

        if (noPan) {
          sync(newScale, { x: 0, y: 0 });
        } else {
          sync(newScale, clampPos(p.x + pdx, p.y + pdy, newScale));
        }
      }
    },
    [clampPos, noPan, sync]
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
      if (!mouseRef.current || noPan) return;
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      mouseRef.current = { x: e.clientX, y: e.clientY };
      sync(scaleRef.current, clampPos(posRef.current.x + dx, posRef.current.y + dy, scaleRef.current));
    },
    [clampPos, noPan, sync]
  );

  const handleMouseUp = useCallback(() => {
    mouseRef.current = null;
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const newScale = clamp(scaleRef.current * (e.deltaY > 0 ? 0.9 : 1.1), MIN_SCALE, MAX_SCALE);
      sync(newScale, noPan ? { x: 0, y: 0 } : clampPos(posRef.current.x, posRef.current.y, newScale));
    },
    [clampPos, noPan, sync]
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

  const containerWidth = containerRef.current?.clientWidth ?? 0;
  const thumbRatio = imgSize.w > 0 ? Math.min(1, containerWidth / (imgSize.w * scale)) : 1;
  const thumbLeft = imgSize.w > 0
    ? (-pos.x / (imgSize.w * scale - containerWidth + 0.001)) * (1 - thumbRatio) * 100
    : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-[10px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{
        touchAction: "none",
        ...(noPan
          ? { aspectRatio: `${mapConfig.width} / ${mapConfig.height}` }
          : { height: "240px" }),
      }}
    >
      {noPan ? (
        /* contain: full map visible, zoom from center */
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapConfig.src}
            alt="부스 지도"
            style={{
              width: imgSize.w > 0 ? `${imgSize.w}px` : "auto",
              height: imgSize.h > 0 ? `${imgSize.h}px` : "auto",
              maxWidth: "none",
              display: "block",
            }}
            draggable={false}
          />
        </div>
      ) : (
        /* cover: fills container, pan + zoom */
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
            src={mapConfig.src}
            alt="부스 지도"
            style={{
              width: imgSize.w > 0 ? `${imgSize.w}px` : "auto",
              height: imgSize.h > 0 ? `${imgSize.h}px` : "100%",
              maxWidth: "none",
              display: "block",
            }}
            draggable={false}
          />
        </div>
      )}

      {!noPan && thumbRatio < 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 13,
            left: 12,
            right: 12,
            height: 4,
            borderRadius: 9999,
            backgroundColor: "rgba(0,0,0,0.08)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${Math.max(0, Math.min(thumbLeft, 100 - thumbRatio * 100))}%`,
              width: `${thumbRatio * 100}%`,
              height: "100%",
              borderRadius: 9999,
              backgroundColor: "rgba(0,0,0,0.2)",
              transition: "left 0.05s linear",
            }}
          />
        </div>
      )}
    </div>
  );
}
