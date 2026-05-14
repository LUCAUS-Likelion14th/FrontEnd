import { fetcher, authFetcher } from "./fetcher";
import type { BoothDetail, BoothListItem, BoothListResponse } from "@/types/booth";

type BoothListParams = {
  date?: string;
  location?: string;
  category?: string;
  search?: string;
};

export const BoothApi = {
  getList: (params?: BoothListParams) => {
    const query = new URLSearchParams();
    if (params?.date) query.set("date", params.date);
    if (params?.location) query.set("location", params.location);
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);
    const qs = query.toString().replace(/\+/g, "%20");
    return fetcher<BoothListResponse>(`/booth${qs ? `?${qs}` : ""}`);
  },
  getStampList: () => fetcher<BoothListResponse>(`/booth/stamp`),
  getDetail: (boothId: string) => fetcher<BoothDetail>(`/booth/${boothId}`),
  likeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "POST"),
  unlikeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "DELETE"),
};
