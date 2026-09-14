import { fetcher, authFetcher } from "./fetcher";
import type {
  BoothDetail,
  BoothListItem,
  BoothListParams,
  BoothListResponse,
  BoothSearchResponse,
} from "@/types/booth";
import { MOCK_BOOTHS, MOCK_BOOTH_LIST } from "@/data/boothData";

function mockListResponse(items: BoothListItem[]): BoothListResponse {
  return {
    content: items,
    totalPages: 1,
    totalElements: items.length,
    size: items.length,
    number: 0,
  };
}

export const BoothApi = {
  getList: async (params?: BoothListParams) => {
    const query = new URLSearchParams();
    if (params?.page !== undefined && Number.isFinite(params.page)) query.set("page", String(Math.floor(params.page)));
    if (params?.size !== undefined && Number.isFinite(params.size)) query.set("size", String(Math.floor(params.size)));

    if (params?.date) query.set("date", params.date);
    if (params?.location) query.set("location", params.location);
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);

    const qs = query.toString().replace(/\+/g, "%20");
    try {
      return await fetcher<BoothListResponse>(`/booth${qs ? `?${qs}` : ""}`);
    } catch (error) {
      console.warn("부스 목록 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return mockListResponse(MOCK_BOOTH_LIST);
    }
  },
  search: async (params: { search: string; page?: number; size?: number }) => {
    const query = new URLSearchParams();
    query.set("search", params.search);
    if (params.page !== undefined) query.set("page", String(params.page));
    if (params.size !== undefined) query.set("size", String(params.size));
    try {
      return await fetcher<BoothSearchResponse>(`/booth/search?${query.toString().replace(/\+/g, "%20")}`);
    } catch (error) {
      console.warn("부스 검색 API 연결 실패, 모의 데이터를 반환합니다:", error);
      const keyword = params.search.trim().toLowerCase();
      const matched = MOCK_BOOTHS.filter((b) =>
        b.booth_name.toLowerCase().includes(keyword),
      ).map((b) => ({
        booth_id: b.booth_id,
        booth_image: b.booth_image ?? "",
        booth_name: b.booth_name,
        likeCount: b.like_count,
        liked: b.is_liked,
      }));
      return {
        content: matched,
        totalPages: 1,
        totalElements: matched.length,
        size: matched.length,
        number: 0,
      };
    }
  },
  getStampList: async (page?: number) => {
    try {
      return await fetcher<BoothListItem[]>(`/booth/stamp${page !== undefined ? `?page=${page}` : ""}`);
    } catch (error) {
      console.warn("스탬프 부스 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return MOCK_BOOTH_LIST;
    }
  },
  getDetail: async (boothId: string) => {
    try {
      return await fetcher<BoothDetail>(`/booth/${boothId}`);
    } catch (error) {
      console.warn("부스 상세 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return MOCK_BOOTHS.find((b) => b.booth_id === Number(boothId)) as BoothDetail;
    }
  },
  likeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "POST"),
  unlikeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "DELETE"),
};
