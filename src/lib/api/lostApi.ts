import { fetcher } from "./fetcher";
import { LostItem, LostParams } from "@/types/lost";

export const lostApi = {
  getLostItems: ({ category, date, page = 0 }: LostParams = {}) => {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (date) {
      // "2026-05-18" → "0518"
      params.append("date", date.replace(/-/g, "").slice(4));
    }
    params.append("page", page.toString());

    return fetcher<LostItem[]>(`/lost?${params.toString()}`);
  },
};
