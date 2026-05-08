import { fetcher, authFetcher } from "./fetcher";
import { LostItem } from "@/types/lost";

export const adminLostApi = {
  getLostItems: (page = 0, size = 10) =>
    fetcher<LostItem[]>(`/lost?page=${page}&size=${size}`),

  createLostItem: (formData: FormData) =>
    authFetcher<LostItem>("/admin/lost", "POST", formData),

  updateLostItem: (id: number, formData: FormData) =>
    authFetcher<LostItem>(`/admin/lost/${id}`, "PATCH", formData),

  deleteLostItem: (id: number) =>
    authFetcher<void>(`/admin/lost/${id}`, "DELETE"),
};
