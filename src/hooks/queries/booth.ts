"use client";

import { useQuery } from "@tanstack/react-query";
import { BoothApi } from "@/lib/api/boothApi";

type BoothListParams = {
  date?: string;
  location?: string;
  category?: string;
  search?: string;
};

export function useBoothList(params?: BoothListParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["booth", "list", params],
    queryFn: () => BoothApi.getList(params),
    enabled: options?.enabled ?? true,
    staleTime: 30_000,
  });
}

export function useBoothStampList(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["booth", "stamp"],
    queryFn: BoothApi.getStampList,
    enabled: options?.enabled ?? true,
    staleTime: 30_000,
  });
}

export function useBoothDetail(id: string) {
  return useQuery({
    queryKey: ["booth", "detail", id],
    queryFn: () => BoothApi.getDetail(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}
