import { fetcher, authFetcher } from "./fetcher";
import type {
  BoothDetail,
  BoothListItem,
  BoothListParams,
  BoothListResponse,
} from "@/types/booth";

export const BoothApi = {
  getList: (params?: BoothListParams) => {
    const query = new URLSearchParams();
    if (params?.page !== undefined && Number.isFinite(params.page)) query.set("page", String(Math.floor(params.page)));
    if (params?.size !== undefined && Number.isFinite(params.size)) query.set("size", String(Math.floor(params.size)));

    if (params?.date) query.set("date", params.date);
    if (params?.location) query.set("location", params.location);
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);

    const qs = query.toString().replace(/\+/g, "%20");
    return fetcher<BoothListResponse>(`/booth${qs ? `?${qs}` : ""}`);
  },
  getStampList: (page?: number) =>
    fetcher<BoothListItem[]>(`/booth/stamp${page !== undefined ? `?page=${page}` : ""}`),
  getDetail: (boothId: string) => fetcher<BoothDetail>(`/booth/${boothId}`),
  likeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "POST"),
  unlikeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "DELETE"),
};
