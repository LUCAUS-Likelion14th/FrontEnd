"use client";

import { useQuery } from "@tanstack/react-query";
import { BoothApi } from "@/api/boothApi";
import { BoothListParams } from "@/types/booth";

export function useBoothSearch(
  params: { search: string; page?: number; size?: number },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["booth", "search", params],
    queryFn: () => BoothApi.search(params),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
  });
}

export function useBoothList(
  params?: BoothListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["booth", "list", params],
    queryFn: () => BoothApi.getList(params),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
  });
}

export function useBoothStampList(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["booth", "stamp"],
    queryFn: () => BoothApi.getStampList(),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
  });
}

export function useBoothDetail(id: string) {
  return useQuery({
    queryKey: ["booth", "detail", id],
    queryFn: () => BoothApi.getDetail(id),
    enabled: !!id,
    staleTime: 0,
  });
}
