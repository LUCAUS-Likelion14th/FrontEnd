"use client";

import Image from "next/image";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import type { MenuItem } from "@/types/foodtruck";

function MenuImage({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="w-[106px] h-[106px] flex-shrink-0 rounded-[10px] bg-gray-100 flex items-center justify-center">
        <FiImage size={28} className="text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative w-[106px] h-[106px] flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-[10px]"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function MenuDetail({ menuList }: { menuList: MenuItem[] }) {
  return (
    <div className="flex flex-col">
      {menuList.map((menu, index) => (
        <div key={index}>
          <div className="w-full h-px bg-text-sub2" />
          <div className="flex justify-between items-center px-3 py-3">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-semibold">{menu.name}</h3>
              <span className="text-[16px] font-medium text-primary">
                {menu.price.toLocaleString()}원
              </span>
            </div>
            <MenuImage src={menu.image} alt={menu.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
