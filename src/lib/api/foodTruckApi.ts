import { fetcher, authFetcher } from "./fetcher";
import type { FoodTruckDetail } from "@/types/foodtruck";
import { FOODTRUCK_DATA } from "@/data/foodtruckData";

export const foodTruckApi = {
  getList: async () => {
    try {
      return await fetcher<FoodTruckDetail[]>("/foodtruck");
    } catch (error) {
      console.warn("푸드트럭 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return FOODTRUCK_DATA;
    }
  },
  getDetail: async (id: string) => {
    try {
      return await fetcher<FoodTruckDetail>(`/foodtruck/${id}`);
    } catch (error) {
      console.warn("푸드트럭 상세 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return FOODTRUCK_DATA.find((t) => t.id === Number(id)) as FoodTruckDetail;
    }
  },
  likeFoodTruck: (id: number | string) =>
    authFetcher<null>(`/foodtruck/${id}/like`, "POST"),
  unlikeFoodTruck: (id: number | string) =>
    authFetcher<null>(`/foodtruck/${id}/like`, "DELETE"),
};
