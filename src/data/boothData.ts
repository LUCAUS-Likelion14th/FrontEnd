export const BOOTH_LOCATIONS = [
  "서라벌홀 일대",
  "대운동장",
  "후문 일대",
] as const;
export type BoothLocation = (typeof BOOTH_LOCATIONS)[number];

export const BOOTH_CATEGORIES = [
  "전체",
  "게임",
  "소개팅",
  "음식",
  "체험",
  "기타",
] as const;

export type BoothCategory = (typeof BOOTH_CATEGORIES)[number];

export const BOOTH_DATES = [
  { value: "2026-05-18", label: "18일 월" },
  { value: "2026-05-19", label: "19일 화" },
  { value: "2026-05-20", label: "20일 수" },
  { value: "2026-05-21", label: "21일 목" },
  { value: "2026-05-22", label: "22일 금" },
  { value: "all", label: "전체날짜" },
] as const;
