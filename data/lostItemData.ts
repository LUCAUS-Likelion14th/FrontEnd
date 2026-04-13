type LostItemType = "electronics" | "wallet" | "cosmetic" | "umbrella" | "etc";

export type LostItem = {
  id: number;
  name: string;
  image: string;
  location: string;
  date: string;
  type: LostItemType;
};

export const LOST_ITEM_TYPES = [
  { label: "종류", value: "all" },
  { label: "전자기기", value: "electronics" },
  { label: "지갑/카드", value: "wallet" },
  { label: "화장품", value: "cosmetic" },
  { label: "우산", value: "umbrella" },
  { label: "기타", value: "etc" },
];

export const lostItems: LostItem[] = [
  {
    id: 1,
    name: "검은색 지갑",
    image: "/img.png",
    location: "중앙 무대",
    date: "2026-05-18 13:20",
    type: "wallet",
  },
  {
    id: 2,
    name: "에어팟 프로",
    image: "/img.png",
    location: "푸드트럭 존",
    date: "2026-05-18 15:10",
    type: "electronics",
  },
  {
    id: 3,
    name: "아이폰 13",
    image: "/img.png",
    location: "학생회관 앞",
    date: "2026-05-19 11:45",
    type: "electronics",
  },
  {
    id: 4,
    name: "파란색 파우치",
    image: "/img.png",
    location: "부스 A구역",
    date: "2026-05-20 16:30",
    type: "cosmetic",
  },
  {
    id: 5,
    name: "신분증 (학생증)",
    image: "/img.png",
    location: "도서관 입구",
    date: "2026-05-21 10:05",
    type: "etc",
  },
  {
    id: 6,
    name: "우산",
    image: "/img.png",
    location: "빼빼로 광장",
    date: "2026-05-22 10:05",
    type: "umbrella",
  },
  {
    id: 7,
    name: "귀걸이",
    image: "/img.png",
    location: "102관 앞",
    date: "2026-05-21 10:05",
    type: "etc",
  },
  {
    id: 8,
    name: "가방",
    image: "/img.png",
    location: "도서관 입구",
    date: "2026-05-21 10:05",
    type: "etc",
  },
];
