export interface LostItem {
  lost_id: number;
  name: string;
  image: string;
  date: string;
  find_location: string;
}

export interface LostListResponse {
  content: LostItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface LostParams {
  category?: string;
  date?: string;
  page?: number;
  size?: number;
}
