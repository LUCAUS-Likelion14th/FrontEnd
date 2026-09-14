import { fetcher } from "./fetcher";
import { LostListResponse, LostParams } from "@/types/lost";
import { mockLostListResponse } from "@/data/lostItemData";

export const lostApi = {
  getLostItems: async ({ category, date, page = 0, size = 8 }: LostParams = {}) => {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (date) {
      // "2026-05-18" → "0518"
      params.append("date", date.replace(/-/g, "").slice(4));
    }
    params.append("page", page.toString());

    try {
      return await fetcher<LostListResponse>(`/lost?${params.toString()}`);
    } catch (error) {
      console.warn("분실물 목록 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return mockLostListResponse(page, size);
    }
  },
};
