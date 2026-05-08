import { fetcher, authFetcher } from "./fetcher";
import { Promotion } from "@/types/home";

export const adminPromotionApi = {
  getPromotions: () => fetcher<Promotion[]>("/promotion"),

  createPromotion: (formData: FormData) =>
    authFetcher<Promotion>("/admin/promotion", "POST", formData),

  updatePromotion: (id: number, formData: FormData) =>
    authFetcher<Promotion>(`/admin/promotion/${id}`, "PATCH", formData),

  deletePromotion: (id: number) =>
    authFetcher<void>(`/admin/promotion/${id}`, "DELETE"),
};
