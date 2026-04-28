import { fetcher } from "./fetcher";
import type { FoodTruckDetail } from "@/types/foodtruck";

export const foodTruckApi = {
  getDetail: (id: string) => fetcher<FoodTruckDetail>(`/foodtruck/${id}`),
};
