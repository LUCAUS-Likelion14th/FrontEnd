"use client";

import { useQuery } from "@tanstack/react-query";
import { lostApi } from "@/lib/api/lostApi";
import { LostListResponse, LostParams } from "@/types/lost";

export function useLostItems(params: LostParams) {
  return useQuery<LostListResponse>({
    queryKey: ["lost", params],
    queryFn: () => lostApi.getLostItems(params),
    staleTime: 30_000,
  });
}
