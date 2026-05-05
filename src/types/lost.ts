export interface LostItem {
  lost_id: number;
  name: string;
  image: string;
  date: string;
  find_location: string;
}

export interface LostParams {
  category?: string;
  date?: string;
  page?: number;
}
