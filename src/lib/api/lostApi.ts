import { fetcher } from "./fetcher";
import { LostItem, LostParams } from "@/types/lost";

export const lostApi = {
  getLostItems: ({ category, date, page = 0 }: LostParams = {}) => {
    const params = new URLSearchParams();

    if (category && category != "전체") params.append("category", category);
    if (date) params.append("date", date);
    params.append("page", page.toString());

    return fetcher<LostItem[]>(`/lost?${params.toString()}`);
  },
};
