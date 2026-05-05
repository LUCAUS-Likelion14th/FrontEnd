import { fetcher } from "./fetcher";
import type {
  MyPageData,
  MyBoothLikes,
  MyFoodTruckLikes,
} from "@/types/mypage";

export const mypageApi = {
  getMyPage: async (): Promise<MyPageData> => {
    const [booths, trucks] = await Promise.all([
      fetcher<MyBoothLikes[]>("/mypage/booth"),
      fetcher<MyFoodTruckLikes[]>("/mypage/foodtruck"),
    ]);

    return {
      name: "사용자", 
      like_count: booths.length + trucks.length,

      booth_like_list: booths.map((b) => ({
        booth_id: b.booth_id,
        location_id: b.location_id,
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