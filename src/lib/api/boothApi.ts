import { fetcher, authFetcher } from "./fetcher";
import type {
  BoothDetail,
  BoothListParams,
  BoothListResponse,
  StampListResponse,
} from "@/types/booth";

export const BoothApi = {
  getList: (params?: BoothListParams) => {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set("page", String(params.page));
    if (params?.size !== undefined) query.set("size", String(params.size));

    if (params?.date) query.set("date", params.date);
    if (params?.location) query.set("location", params.location);
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);

    const qs = query.toString().replace(/\+/g, "%20");
    return fetcher<BoothListResponse>(`/booth${qs ? `?${qs}` : ""}`);
  },
  getStampList: () => fetcher<StampListResponse>(`/booth/stamp`),
  getDetail: (boothId: string) => fetcher<BoothDetail>(`/booth/${boothId}`),
  likeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "POST"),
  unlikeBooth: (boothId: number | string) =>
    authFetcher<null>(`/booth/${boothId}/like`, "DELETE"),
};
