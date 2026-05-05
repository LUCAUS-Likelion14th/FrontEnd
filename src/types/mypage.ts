export type BoothLike = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
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

export type MyFoodTruckResponse = {
  success: boolean;
  data: MyFoodTruckLikes[];
  message: string;
};

export type MyFoodTruckLikes = {
  id: number;
  name: string;
  locationId: number;
  location: string;
  image: string;
  bestMenu: string;
  likeCount: number;
  liked: boolean;
};

export type MyBoothResponse = {
  success: boolean;
  data: MyBoothLikes[];
  message: string;
};

export type MyBoothLikes = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
  booth_owner: string;
  booth_location: string;
  like_count: number;
  is_liked: boolean;
};