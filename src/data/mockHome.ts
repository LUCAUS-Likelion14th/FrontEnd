import type { TopBooth, Promotion, LiveStage, HotFood, ActiveNotice } from "@/types/home";
import { MOCK_BOOTHS } from "./boothData";
import { MOCK_STAGES } from "./stageEventData";
import { FOODTRUCK_DATA } from "./foodtruckData";
import { MOCK_NOTICES } from "./noticeData";

// 백엔드 서버가 꺼져 있을 때(포트폴리오 열람 등) 홈 화면이 빈 값 대신
// 데모용 콘텐츠를 보여주기 위한 목업 데이터. 실제 API 응답이 정상적으로
// 오면 이 데이터는 전혀 쓰이지 않는다.
// 부스/공연/푸드트럭 목업을 그대로 재사용해야 홈에서 카드를 눌렀을 때
// 상세 페이지도 같은 항목으로 채워진다.

export const mockPromotions: Promotion[] = [
  { id: -1, instagram: "", image: "/banners/schedule.jpg" },
  { id: -2, instagram: "", image: "/banners/bluehour-day1.jpg" },
  { id: -3, instagram: "", image: "/banners/bluehour-day2.jpg" },
  { id: -4, instagram: "", image: "/banners/puang-pass.jpg" },
  { id: -5, instagram: "", image: "/banners/ticket-notice.jpg" },
];

export const mockLiveStages: LiveStage[] = MOCK_STAGES.slice(0, 2).map((stage) => ({
  stage_id: stage.stage_id,
  category: stage.category,
  performer: stage.performer,
  logoImage: stage.logoImage,
  time: stage.startAt.split("T")[1].slice(0, 5),
}));

export const mockTopBooth: TopBooth[] = MOCK_BOOTHS.slice(0, 2).map((booth) => ({
  booth_id: booth.booth_id,
  location_id: Number(booth.settings[0]?.locationId ?? 0),
  booth_image: booth.booth_image ?? "",
  location: booth.settings[0]?.location ?? "",
  booth_name: booth.booth_name,
  owner: booth.booth_owner,
  like_count: booth.like_count,
  is_liked: booth.is_liked,
}));

export const mockHotFood: HotFood[] = FOODTRUCK_DATA.slice(0, 2).map((truck) => ({
  id: truck.id,
  name: truck.name,
  image: truck.image,
  bestMenu: truck.bestMenu,
  likeCount: truck.likeCount,
  liked: truck.liked,
}));

export const mockActiveNotice: ActiveNotice = {
  id: MOCK_NOTICES[0].id,
  title: MOCK_NOTICES[0].title,
};
