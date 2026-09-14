import type { BoothDetail, BoothListItem } from "@/types/booth";

export const BOOTH_LOCATIONS = [
  "서라벌홀 일대",
  "대운동장",
  "후문 일대",
] as const;
export type BoothLocation = (typeof BOOTH_LOCATIONS)[number];

export const BOOTH_LOCATION_LABELS: Record<BoothLocation, string> = {
  "서라벌홀 일대": "서라벌홀 일대",
  "대운동장": "대운동장 일대",
  "후문 일대": "후문 일대",
};

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
] as const;

export function getDefaultDate(): string {
  const today = new Date().toISOString().split("T")[0];
  return BOOTH_DATES.find((d) => d.value === today)?.value ?? BOOTH_DATES[0].value;
}

// 백엔드 연결이 끊겼을 때 화면이 비어 보이지 않도록 쓰는 데모용 부스 데이터.
// locationId는 BoothMapWithMarker의 BOOTH_COORDS 키와 맞춰야 지도 마커가 찍힌다.
export const MOCK_BOOTHS: BoothDetail[] = [
  {
    booth_id: 1,
    booth_image: null,
    booth_name: "타로 점집",
    booth_category: ["체험"],
    booth_info:
      "올해의 운세와 연애운을 봐드려요. 타로 마스터가 상주하고 있으니 편하게 들러주세요!",
    booth_owner: "경영학부 학생회",
    owner_insta: "",
    is_liked: false,
    like_count: 128,
    settings: [
      {
        locationId: "3",
        location: "서라벌홀 일대",
        date: "2026-05-21",
        day: "THURSDAY",
        startAt: "11:00",
        endAt: "18:00",
      },
      {
        locationId: "3",
        location: "서라벌홀 일대",
        date: "2026-05-22",
        day: "FRIDAY",
        startAt: "11:00",
        endAt: "18:00",
      },
    ],
  },
  {
    booth_id: 2,
    booth_image: null,
    booth_name: "미니 게임존",
    booth_category: ["게임"],
    booth_info:
      "다트, 컵쌓기, 룰렛까지! 참여만 해도 간식을 드리고 1등에게는 기프티콘을 드려요.",
    booth_owner: "총학생회",
    owner_insta: "",
    is_liked: false,
    like_count: 96,
    settings: [
      {
        locationId: "20",
        location: "대운동장",
        date: "2026-05-21",
        day: "THURSDAY",
        startAt: "12:00",
        endAt: "20:00",
      },
    ],
  },
  {
    booth_id: 3,
    booth_image: null,
    booth_name: "캠퍼스 소개팅",
    booth_category: ["소개팅"],
    booth_info:
      "설문지를 작성하면 취향이 맞는 상대를 매칭해드려요. 결과는 당일 저녁에 문자로 발송됩니다.",
    booth_owner: "미디어커뮤니케이션학부",
    owner_insta: "",
    is_liked: false,
    like_count: 74,
    settings: [
      {
        locationId: "41",
        location: "후문 일대",
        date: "2026-05-22",
        day: "FRIDAY",
        startAt: "13:00",
        endAt: "19:00",
      },
    ],
  },
];

export const MOCK_BOOTH_LIST: BoothListItem[] = MOCK_BOOTHS.map((booth) => ({
  booth_id: booth.booth_id,
  location_id: booth.settings[0]?.locationId,
  booth_image: booth.booth_image ?? "",
  booth_name: booth.booth_name,
  booth_owner: booth.booth_owner,
  location: booth.settings[0]?.location ?? "",
  is_liked: booth.is_liked,
  like_count: booth.like_count,
}));
