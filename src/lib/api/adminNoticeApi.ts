import { fetcher, authFetcher } from "./fetcher";
import { Notice, NoticeResponse } from "@/types/notice";

export const adminNoticeApi = {
  getNotices: () =>
    fetcher<NoticeResponse>(`/notice`),

  createNotice: (data: { title: string; content: string }) =>
    authFetcher<Notice>("/admin/notice", "POST", data),

  updateNotice: (id: number, data: { title: string; content: string; important: boolean; active?: boolean }) =>
    authFetcher<Notice>(`/admin/notice/${id}`, "PATCH", data),

  deleteNotice: (id: number) =>
    authFetcher<void>(`/admin/notice/${id}`, "DELETE"),

  setImportant: (id: number) =>
    authFetcher<Notice>(`/admin/notice/${id}/important`, "PATCH"),

  setActive: (id: number) =>
    authFetcher<Notice>(`/admin/notice/${id}/active`, "PATCH"),

  setInactive: (id: number) =>
    authFetcher<Notice>(`/admin/notice/${id}/inactive`, "PATCH"),
};
