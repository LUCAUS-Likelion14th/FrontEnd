export type FoodTruck = {
  id: number;
  name: string;
  locationId: number;
  location: string;
  image: string;
  bestMenu: string;
  likeCount: number;
  liked: boolean;
};

export type FoodTruckParams = {
  locate?: string;
  date?: string;
};

export type MenuItem = {
  name: string;
  price: number;
  image: string;
};

export type FoodTruckDetail = {
  id: number;
  name: string;
  locationId: number;
  location: string;
  image: string;
  bestMenu: string;
  likeCount: number;
  liked: boolean;
  foodTruckInfo: string;
  date: string[];
  menu: MenuItem[];
};
