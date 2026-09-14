import type { Notice } from "@/types/notice";

// 백엔드 연결이 끊겼을 때 공지 목록/상세가 비어 보이지 않도록 쓰는 데모용 공지 데이터.
export const MOCK_NOTICES: Notice[] = [
  {
    id: 1,
    title: "우천 시 운영 일정이 변경될 수 있으니 공지를 확인해주세요",
    content:
      "축제 기간 중 우천이 예보되어 있어, 야외 무대 및 부스 운영 일정이 변경될 수 있습니다.\n변경 사항은 확정되는 대로 다시 공지드리겠습니다.",
    important: true,
    active: true,
    createdAt: "2026-05-17T10:00:00",
  },
  {
    id: 2,
    title: "청룡가요제 참가팀 최종 라인업 안내",
    content:
      "5월 21일(목) 진행되는 청룡가요제 참가팀 최종 라인업을 안내드립니다.\n자세한 시간표는 무대 페이지에서 확인하실 수 있습니다.",
    important: true,
    active: true,
    createdAt: "2026-05-18T09:00:00",
  },
  {
    id: 3,
    title: "분실물 보관 및 문의 안내",
    content:
      "축제 기간 중 습득된 분실물은 안내에서 확인 가능합니다.\n찾으시는 물품이 있다면 카카오톡 채널로 문의해주세요.",
    important: false,
    active: true,
    createdAt: "2026-05-18T14:00:00",
  },
  {
    id: 4,
    title: "주차 및 교통 통제 안내",
    content:
      "축제 기간 중 교내 주차 공간이 제한되며, 일부 구역은 차량 통제가 진행됩니다.\n대중교통 이용을 권장드립니다.",
    important: false,
    active: true,
    createdAt: "2026-05-19T11:00:00",
  },
  {
    id: 5,
    title: "부스 운영 시간 변경 안내",
    content:
      "일부 부스의 운영 시간이 변경되었습니다.\n부스 페이지에서 최신 운영 시간을 확인해주세요.",
    important: false,
    active: true,
    createdAt: "2026-05-20T13:30:00",
  },
];
