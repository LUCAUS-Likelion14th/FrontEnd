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
  totalPages: number;
}
