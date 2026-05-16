"use client";

import { useQuery } from "@tanstack/react-query";
import { foodTruckApi } from "@/lib/api/foodtruckApi";

type FoodTruckListParams = {
  date?: string;
  locate?: string;
};

export function useFoodTruckList(params?: FoodTruckListParams) {
  return useQuery({
    queryKey: ["foodtruck", "list", params],
    queryFn: () => foodTruckApi.getList(params),
    staleTime: 5 * 60_000,
  });
}

export function useFoodTruckDetail(id: string) {
  return useQuery({
    queryKey: ["foodtruck", "detail", id],
    queryFn: () => foodTruckApi.getDetail(id),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}
