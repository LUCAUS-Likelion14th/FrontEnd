// 부스 리스트 아이템 (공통)
export type BoothListItem = {
  booth_id: number;
  location_id?: string;
  booth_image: string;
  booth_name: string;
  booth_owner: string;
  location: string;
  is_liked: boolean;
  like_count: number;
};

// 일반 부스 응답 타입 (페이지네이션 포함)
export type BoothListResponse = {
  content: BoothListItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
};

// 스탬프 부스 응답 타입 (페이지네이션 미포함)
export type StampListResponse = {
  success: boolean;
  data: BoothListItem[];
  message: string | null;
};

// API 요청 파라미터 타입
export type BoothListParams = {
  page?: number;
  size?: number;
  date?: string;
  location?: string;
  category?: string;
  search?: string;
};

export type BoothDetail = {
  booth_id: number;
  location_id: number;
  booth_image: string;
  booth_name: string;
  booth_owner: string;
  booth_category: string[];
  booth_info: string;
  owner_insta: string;
  is_liked: boolean;
  like_count: number;
  location: string;
  date: string[];
  location_image: string;
};
