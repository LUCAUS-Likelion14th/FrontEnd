"use client";

import { useQuery } from "@tanstack/react-query";
import { noticeApi } from "@/lib/api/noticeApi";
import { NoticeParams } from "@/types/notice";

export function useNotices(params?: NoticeParams) {
  return useQuery({
    queryKey: ["notice", params],
    queryFn: () => noticeApi.getNotices(params),
    staleTime: 60_000,
  });
}
