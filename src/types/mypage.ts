export type BoothLike = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
  booth_owner?: string;
  booth_location?: string;
  is_liked?: boolean;
  like_count?: number;
};

export type FoodTruckLike = {
  id: number;
  name: string;
  image: string;
};

export type MyPageData = {
  name: string;
  like_count: number;
  booth_like_list: BoothLike[];
  food_truck_like_list: FoodTruckLike[];
  stamp_count?: number;
};