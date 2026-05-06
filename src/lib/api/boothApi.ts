import { fetcher, authFetcher } from "./fetcher";
import type { Booth, BoothDetail, BoothParams } from "@/types/booth";

export const BoothApi = {
  getBooths: ({ date, page, location, category, search }: BoothParams = {}) => {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (page !== undefined) params.append("page", page.toString());
    if (location) params.append("location", location);
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const query = params.toString();
    return fetcher<Booth[]>(`/booth${query ? `?${query}` : ""}`);
  },

  getDetail: (boothId: string) => fetcher<BoothDetail>(`/booth/${boothId}`),

  like: (boothId: number) => authFetcher<null>(`/booth/${boothId}/like`, "POST"),
  unlike: (boothId: number) => authFetcher<null>(`/booth/${boothId}/like`, "DELETE"),
};
