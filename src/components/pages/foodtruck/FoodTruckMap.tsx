"use client";

import foodtruckMap from "@/assets/webp/map/foodtruck-map.webp";

export default function FoodTruckMap() {
  return (
    <div className="w-full rounded-[10px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foodtruckMap.src}
        alt="푸드트럭 지도"
        className="w-full h-auto block"
        draggable={false}
      />
    </div>
  );
}
