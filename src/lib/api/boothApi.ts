import { fetcher, authFetcher } from "./fetcher";
import type { BoothDetail, BoothListItem, BoothListResponse } from "@/types/booth";

type BoothListParams = {
  date?: string;
  location?: string;
  category?: string;
  search?: string;
  page?: number;
  size?: number;
};

export const BoothApi = {
  getList: (params?: BoothListParams) => {
    const query = new URLSearchParams();
    if (params?.date) query.set("date", params.date);
    if (params?.location) query.set("location", params.location);
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);
    if (params?.page !== undefined) query.set("page", String(params.page));
    if (params?.size) query.set("size", String(params.size));
    const qs = query.toString();
    return fetcher<BoothListResponse>(`/booth${qs ? `?${qs}` : ""}`);
  },
  getDetail: (boothId: string) => fetcher<BoothDetail>(`/booth/${boothId}`),
  likeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "POST"),
  unlikeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "DELETE"),
};
