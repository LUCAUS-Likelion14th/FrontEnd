export interface Notice {
  id: number;
  title: string;
  content: string;
  important: boolean;
  active: boolean;
  createdAt: string;
}

export interface NoticeResponse {
  content: Notice[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface NoticeParams {
  page?: number;
  size?: number;
  sort?: string[];
}
