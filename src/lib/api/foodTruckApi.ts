import { fetcher, authFetcher } from "./fetcher";
import type { FoodTruck, FoodTruckDetail, FoodTruckParams } from "@/types/foodtruck";

export const foodTruckApi = {
  getFoodTrucks: ({ locate, date }: FoodTruckParams = {}) => {
    const params = new URLSearchParams();
    if (locate) params.append("locate", locate);
    if (date) params.append("date", date);

    const query = params.toString();
    return fetcher<FoodTruck[]>(`/foodtruck${query ? `?${query}` : ""}`);
  },

  getDetail: (id: string) => fetcher<FoodTruckDetail>(`/food/${id}`),

  like: (id: number) => authFetcher<null>(`/food/${id}/like`, "POST"),
  unlike: (id: number) => authFetcher<null>(`/food/${id}/like`, "DELETE"),
};
