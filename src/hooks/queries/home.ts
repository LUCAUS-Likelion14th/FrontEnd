"use client";

import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/lib/api/homeApi";

export function useTopBooth() {
  return useQuery({
    queryKey: ["topBooth"],
    queryFn: homeApi.getTopBooth,
    staleTime: 60_000,
  });
}

export function useHotFood() {
  return useQuery({
    queryKey: ["hotFood"],
    queryFn: homeApi.getHotFood,
    staleTime: 60_000,
  });
}
