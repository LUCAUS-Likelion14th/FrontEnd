"use client";

import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/homeApi";

export function useTopBooth() {
  return useQuery({
    queryKey: ["topBooth"],
    queryFn: homeApi.getTopBooth,
    staleTime: 0,
  });
}

export function useHotFood() {
  return useQuery({
    queryKey: ["hotFood"],
    queryFn: homeApi.getHotFood,
    staleTime: 0,
  });
}
