"use client";

import Image from "next/image";

export type LostItem = {
  id: number;
  name: string;
  image: string;
  location: string;
  date: string;
};

export const lostItems: LostItem[] = [
  {
    id: 1,
    name: "검은색 지갑",
    image: "/img.png",
    location: "중앙 무대",
    date: "2026-05-18 13:20",
  },
  {
    id: 2,
    name: "에어팟 프로",
    image: "/img.png",
    location: "푸드트럭 존",
    date: "2026-05-18 15:10",
  },
  {
    id: 3,
    name: "아이폰 13",
    image: "/img.png",
    location: "학생회관 앞",
    date: "2026-05-19 11:45",
  },
  {
    id: 4,
    name: "파란색 파우치",
    image: "/img.png",
    location: "부스 A구역",
    date: "2026-05-20 16:30",
  },
  {
    id: 5,
    name: "신분증 (학생증)",
    image: "/img.png",
    location: "도서관 입구",
    date: "2026-05-21 10:05",
  },
];

type Props = {
  item: LostItem;
};

export default function LostItemCard({ item }: Props) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  };

  return (
    <article className="relative w-full h-[137px] rounded-[10px] overflow-hidden bg-[#D9D9D9]">
      {/* 이미지 */}
      <Image src={item.image} alt={item.name} fill className="object-cover" />

      {/* 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-white/100 to-transparent" />

      {/* 정보 */}
      <div className="absolute bottom-[8px] left-[11px] right-[11px]">
        <div className="flex flex-col">
          <span className="text-base font-semibold">{item.name}</span>

          <div className="flex justify-between text-[14px] text-[#8F99AA]">
            <span>{formatDate(item.date)}</span>
            <span>{item.location}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
