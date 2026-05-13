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
    <div>
      <div className="flex flex-col gap-10">
        {menuList.map((menu, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="max-w-[194px]">
                <h3 className="text-xl font-semibold">{menu.name}</h3>
              </div>
              <p className="text-xl font-semibold">
                {menu.price.toLocaleString()}원
              </p>
            </div>

            <MenuImage src={menu.image} alt={menu.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
