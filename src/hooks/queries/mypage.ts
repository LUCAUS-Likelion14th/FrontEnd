"use client";

import { useQuery } from "@tanstack/react-query";
import { mypageApi } from "@/lib/api/mypageApi";

export function useMyPage(enabled: boolean) {
  return useQuery({
    queryKey: ["mypage"],
    queryFn: mypageApi.getMyPage,
    enabled,
    select: (data) => ({
      ...data,
      name: (typeof window !== "undefined" && localStorage.getItem("nickname")) || data.name,
    }),
    staleTime: 0,
  });
}
