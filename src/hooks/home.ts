"use client";

import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/homeApi";
import { mockTopBooth, mockHotFood } from "@/data/mockHome";

export function useTopBooth() {
  return useQuery({
    queryKey: ["topBooth"],
    queryFn: () => homeApi.getTopBooth().catch(() => mockTopBooth),
    staleTime: 0,
  });
}

export function useHotFood() {
  return useQuery({
    queryKey: ["hotFood"],
    queryFn: () => homeApi.getHotFood().catch(() => mockHotFood),
    staleTime: 0,
  });
}
