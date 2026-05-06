export type Booth = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
  booth_owner: string;
  booth_location: string;
  is_liked: boolean;
  like_count: number;
};

export type BoothParams = {
  date?: string;
  page?: number;
  location?: string;
  category?: string;
  search?: string;
};

export type BoothDetail = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
  booth_category: string[];
  booth_info: string;
  owner_insta: string;
  is_liked: boolean;
  like_count: number;
  location: string;
  date: (string | null)[];
  location_image: string;
};
