export type MenuItem = {
  menu_name: string;
  menu_price: string;
  menu_image: string;
  menu_info: string;
};

export type FoodTruckDetail = {
  truck_id: number;
  location_id: number;
  truck_name: string;
  main_menu?: string;
  truck_image: string;
  truck_info: string;
  location: string;
  is_liked: boolean;
  like_count: number;
  date: string[];
  truck_menu: MenuItem[];
};
