export type BoothLikeItem = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
  booth_owner: string;
  booth_location: string;
  is_liked: boolean;
  like_count: number;
};

export type FoodLikeItem = {
  truck_id: number;
  location_id: number;
  truck_image: string;
  truck_name: string;
  main_menu: string;
  truck_location: string;
  is_liked: boolean;
  like_count: number;
};
