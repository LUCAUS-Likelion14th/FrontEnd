import { fetcher } from "./fetcher";
import type {
  MyPageData,
  MyBoothLikes,
  MyFoodTruckLikes,
} from "@/types/mypage";

export const mypageApi = {
  getLikedBooths: async (): Promise<MyBoothLikes[]> => {
    return fetcher<MyBoothLikes[]>("/mypage/booth");
  },

  getLikedFoodTrucks: async (): Promise<MyFoodTruckLikes[]> => {
    return fetcher<MyFoodTruckLikes[]>("/mypage/foodtruck");
  },

  getMyPage: async (): Promise<MyPageData> => {
    const [boothResult, truckResult] = await Promise.allSettled([
      fetcher<MyBoothLikes[]>("/mypage/booth"),
      fetcher<MyFoodTruckLikes[]>("/mypage/foodtruck"),
    ]);

    const booths = boothResult.status === "fulfilled" ? boothResult.value : [];
    const trucks = truckResult.status === "fulfilled" ? truckResult.value : [];

    return {
      name: "사용자",
      like_count: booths.length + trucks.length,

      booth_like_list: booths.map((b) => ({
        booth_id: b.booth_id,
        booth_image: b.booth_image,
        booth_name: b.booth_name,
      })),

      food_truck_like_list: trucks.map((t) => ({
        id: t.id,
        name: t.name,
        image: t.image,
      })),

      stamp_count: 0,
    };
  },
};